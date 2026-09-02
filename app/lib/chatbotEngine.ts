import { chatRules, ChatRule } from "@/app/data/chatbotData";

/** Mots de liaison et grammaire en français */
const STOP_WORDS_FR = new Set([
  "le", "la", "les", "l", "de", "du", "des", "d", "un", "une", "et", "en",
  "est", "es", "a", "ai", "as", "suis", "dans", "par", "pour", "avec", "sur",
  "qui", "que", "quoi", "qu", "ce", "c", "ca", "ma", "ta", "sa", "mon", "ton",
  "son", "mes", "tes", "ses", "tu", "il", "elle", "nous", "vous", "ils", "pas",
  "plus", "ou", "au", "aux", "votre", "vos", "notre", "nos", "qu'a", "qu'as"
]);

/** Stop words in English */
const STOP_WORDS_EN = new Set([
  "the", "a", "an", "and", "or", "but", "if", "then", "of", "at", "by",
  "for", "with", "about", "between", "into", "through", "during", "before",
  "after", "above", "below", "to", "from", "up", "down", "in", "out", "on",
  "off", "over", "under", "again", "further", "then", "once", "here", "there",
  "when", "where", "why", "how", "all", "any", "both", "each", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same",
  "so", "than", "too", "very", "can", "will", "just", "should", "now", "is",
  "are", "was", "were", "be", "been", "being", "have", "has", "had", "do",
  "does", "did", "am", "i", "me", "my", "myself", "we", "our", "ours",
  "you", "your", "yours", "he", "him", "his", "she", "her", "hers", "it",
  "its", "they", "them", "their", "what", "which", "who", "whom", "this",
  "that", "these", "those"
]);

const ALL_STOP_WORDS = new Set([...STOP_WORDS_FR, ...STOP_WORDS_EN]);

const ENGLISH_MARKERS = new Set([
  "who", "what", "where", "when", "why", "how", "which", "whose",
  "is", "are", "was", "were", "am", "be", "been",
  "the", "this", "that", "these", "those",
  "he", "his", "him", "she", "her", "they", "them", "their",
  "you", "your", "yours", "i", "me", "my", "mine", "we", "our",
  "tell", "show", "give", "help", "please", "can", "could", "would", "should",
  "does", "did", "do", "have", "has", "had",
  "about", "for", "with", "from", "into",
  "hello", "hi", "hey", "thanks", "thank", "bye", "goodbye",
  "skills", "projects", "internship", "internships", "education", "experience",
  "contact", "reach", "resume", "cv", "hire", "work", "studies", "degree"
]);

const FRENCH_MARKERS = new Set([
  "qui", "quoi", "ou", "quand", "pourquoi", "comment", "quel", "quelle", "quels", "quelles",
  "est", "sont", "ete", "suis", "sommes", "etes",
  "le", "la", "les", "un", "une", "des", "du", "ce", "cette", "ces",
  "il", "son", "sa", "ses", "lui", "elle", "ils", "elles", "leur", "leurs",
  "tu", "ton", "ta", "tes", "vous", "votre", "vos", "je", "moi", "mon", "ma", "mes", "nous", "notre", "nos",
  "parle", "montre", "donne", "aide", "plait", "peux", "peut", "pourrait",
  "fait", "faire", "avez", "ont", "avait",
  "sur", "dans", "par", "pour", "avec", "sans",
  "salut", "bonjour", "bonsoir", "coucou", "merci", "revoir", "bientot",
  "competences", "projets", "stage", "stages", "formation", "etudes"
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
 * Détecte la langue cible (fr ou en) basée sur les tokens et le locale préféré
 */
export function detectLanguage(text: string, preferredLocale: string = "fr"): "fr" | "en" {
  const tokens = tokenize(text);
  let enScore = 0;
  let frScore = 0;

  for (const token of tokens) {
    if (ENGLISH_MARKERS.has(token)) enScore++;
    if (FRENCH_MARKERS.has(token)) frScore++;
  }

  if (enScore > frScore) return "en";
  if (frScore > enScore) return "fr";
  return preferredLocale === "en" ? "en" : "fr";
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
function scoreRule(userMessage: string, rule: ChatRule, targetLang: "fr" | "en"): number {
  const allWords = tokenize(userMessage);
  const meaningfulWords = allWords.filter((w) => !ALL_STOP_WORDS.has(w));
  const wordsToUse = meaningfulWords.length > 0 ? meaningfulWords : allWords;

  let maxScore = 0;

  // Priorité aux patterns de la langue détectée, mais évaluation de tous les patterns
  const primaryPatterns = targetLang === "en" ? (rule.patternsEn || rule.patterns) : rule.patterns;
  const secondaryPatterns = targetLang === "en" ? rule.patterns : (rule.patternsEn || []);

  for (const pattern of primaryPatterns) {
    const scoreFiltered = evaluatePattern(wordsToUse, pattern);
    const scoreAll = evaluatePattern(allWords, pattern);
    const score = Math.max(scoreFiltered, scoreAll);
    if (score > maxScore) maxScore = score;
  }

  for (const pattern of secondaryPatterns) {
    const scoreFiltered = evaluatePattern(wordsToUse, pattern);
    const scoreAll = evaluatePattern(allWords, pattern);
    const score = Math.max(scoreFiltered, scoreAll);
    if (score > maxScore) maxScore = score;
  }

  if (maxScore === 0) return 0;

  const priority = rule.priority ?? 0;
  return maxScore + priority * 5;
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
  detectedLanguage?: "fr" | "en";
}

/**
 * Trouve la meilleure réponse pour un message utilisateur (en français ou en anglais).
 */
export function findBestResponse(userMessage: string, preferredLocale: string = "fr"): ChatResponse {
  const norm = normalize(userMessage);
  const targetLang = detectLanguage(userMessage, preferredLocale);

  const fallback = chatRules.find((r) => r.id === "fallback")!;

  if (norm.length < 2) {
    const responses = targetLang === "en" && fallback.responsesEn ? fallback.responsesEn : fallback.responses;
    const suggestions = targetLang === "en" && fallback.suggestionsEn ? fallback.suggestionsEn : fallback.suggestions;
    return {
      text: randomPick(responses),
      suggestions,
      detectedLanguage: targetLang,
    };
  }

  let bestRule: ChatRule | null = null;
  let bestScore = 0;

  for (const rule of chatRules) {
    if (rule.id === "fallback") continue;

    const score = scoreRule(userMessage, rule, targetLang);
    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  if (!bestRule || bestScore <= 0) {
    const responses = targetLang === "en" && fallback.responsesEn ? fallback.responsesEn : fallback.responses;
    const suggestions = targetLang === "en" && fallback.suggestionsEn ? fallback.suggestionsEn : fallback.suggestions;
    return {
      text: randomPick(responses),
      suggestions,
      detectedLanguage: targetLang,
    };
  }

  const responses = targetLang === "en" && bestRule.responsesEn ? bestRule.responsesEn : bestRule.responses;
  const suggestions = targetLang === "en" && bestRule.suggestionsEn ? bestRule.suggestionsEn : bestRule.suggestions;

  return {
    text: randomPick(responses),
    suggestions,
    detectedLanguage: targetLang,
  };
}
