import { chatRules, ChatRule } from "@/app/data/chatbotData";

/** Mots de liaison et de grammaire en français à ignorer si la phrase contient d'autres mots clés */
const STOP_WORDS = new Set([
  "le", "la", "les", "l", "de", "du", "des", "d", "un", "une", "et", "en",
  "est", "es", "a", "ai", "as", "suis", "dans", "par", "pour", "avec", "sur",
  "qui", "que", "quoi", "qu", "ce", "c", "ca", "ma", "ta", "sa", "mon", "ton",
  "son", "mes", "tes", "ses", "tu", "il", "elle", "nous", "vous", "ils", "pas",
  "plus", "ou", "au", "aux", "votre", "vos", "notre", "nos", "qu'a", "qu'as"
]);

/**
 * Normalise un texte pour le matching :
 * - Minuscules
 * - Supprime les accents
 * - Supprime la ponctuation
 * - Trim
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .replace(/['']/g, " ")           // remplace apostrophes par espace
    .replace(/[^\w\s]/g, " ")        // supprime ponctuation
    .replace(/\s+/g, " ")            // normalise les espaces
    .trim();
}

/**
 * Extrait les mots d'une chaîne
 */
function tokenize(text: string): string[] {
  const norm = normalize(text);
  if (!norm) return [];
  return norm.split(" ").filter((w) => w.length > 0);
}

/**
 * Vérifie la correspondance d'un mot-clé pattern avec un mot utilisateur.
 * - Match exact : 10 points
 * - Match préfixe/racine pour les mots de 3+ lettres : 8 points
 */
function matchWord(userWord: string, keyword: string): number {
  const normKey = normalize(keyword);

  if (userWord === normKey) return 10;

  // Match par préfixe/racine si les deux font au moins 3 caractères
  if (normKey.length >= 3 && userWord.length >= 3) {
    if (userWord.startsWith(normKey) || normKey.startsWith(userWord)) {
      return 8;
    }
  }

  return 0;
}

/**
 * Évalue un pattern (liste de mots-clés) contre une liste de mots utilisateur.
 * Retourne le score cumulé si TOUS les mots-clés du pattern matchent, sinon 0.
 */
function evaluatePattern(userWords: string[], pattern: string[]): number {
  let totalScore = 0;

  for (const keyword of pattern) {
    const normKey = normalize(keyword);
    let bestWordScore = 0;

    for (const userWord of userWords) {
      const score = matchWord(userWord, normKey);
      if (score > bestWordScore) {
        bestWordScore = score;
      }
    }

    if (bestWordScore === 0) {
      return 0; // Un mot-clé du pattern n'a pas été trouvé -> échec du pattern
    }

    totalScore += bestWordScore;
  }

  return totalScore;
}

/**
 * Calcule le score de matching d'une règle par rapport au message de l'utilisateur.
 */
function scoreRule(userMessage: string, rule: ChatRule): number {
  if (rule.patterns.length === 0) return 0;

  const allWords = tokenize(userMessage);
  const meaningfulWords = allWords.filter((w) => !STOP_WORDS.has(w));
  const wordsToUse = meaningfulWords.length > 0 ? meaningfulWords : allWords;

  let maxPatternScore = 0;

  for (const pattern of rule.patterns) {
    // Tester avec mots filtrés puis avec tous les mots
    const scoreFiltered = evaluatePattern(wordsToUse, pattern);
    const scoreAll = evaluatePattern(allWords, pattern);
    const score = Math.max(scoreFiltered, scoreAll);

    if (score > maxPatternScore) {
      maxPatternScore = score;
    }
  }

  if (maxPatternScore === 0) return 0;

  const priority = rule.priority ?? 0;
  return maxPatternScore + priority * 5;
}

/**
 * Choisit un élément au hasard dans un tableau.
 */
function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export interface ChatResponse {
  text: string;
  suggestions?: string[];
}

/**
 * Trouve la meilleure réponse pour un message utilisateur.
 */
export function findBestResponse(userMessage: string): ChatResponse {
  const norm = normalize(userMessage);

  if (norm.length < 2) {
    const fallback = chatRules.find((r) => r.id === "fallback")!;
    return {
      text: randomPick(fallback.responses),
      suggestions: fallback.suggestions,
    };
  }

  let bestRule: ChatRule | null = null;
  let bestScore = 0;

  for (const rule of chatRules) {
    if (rule.id === "fallback") continue;

    const score = scoreRule(userMessage, rule);
    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  if (!bestRule || bestScore <= 0) {
    const fallback = chatRules.find((r) => r.id === "fallback")!;
    return {
      text: randomPick(fallback.responses),
      suggestions: fallback.suggestions,
    };
  }

  return {
    text: randomPick(bestRule.responses),
    suggestions: bestRule.suggestions,
  };
}

