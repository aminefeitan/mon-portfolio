// ─── Types ──────────────────────────────────────────────────────
export interface ChatRule {
  /** Identifiant unique de la règle */
  id: string;
  /** Catégorie pour le regroupement logique */
  category: string;
  /** Patterns de mots-clés (chaque sous-tableau = un ensemble de mots à matcher) */
  patterns: string[][];
  /** Réponses possibles (une sera choisie au hasard) */
  responses: string[];
  /** Suggestions affichées après la réponse */
  suggestions?: string[];
  /** Score bonus si plusieurs patterns matchent (priorité) */
  priority?: number;
}

export interface ChatSuggestion {
  text: string;
  icon?: string;
}

// ─── Suggestions initiales (affichées au premier message) ────────
export const initialSuggestions: ChatSuggestion[] = [
  { text: "Qui est Amine ?", icon: "👤" },
  { text: "Quelles sont ses compétences ?", icon: "💻" },
  { text: "Montre-moi ses projets", icon: "🚀" },
  { text: "Comment le contacter ?", icon: "📬" },
];

// ─── Message de bienvenue ────────────────────────────────────────
export const welcomeMessage =
  "Salut ! 👋 Je suis l'assistant virtuel d'Amine Rachidi. Posez-moi vos questions sur son parcours, ses compétences, ses projets ou comment le contacter !";

// ─── Règles du chatbot ───────────────────────────────────────────
export const chatRules: ChatRule[] = [
  // ── Salutations ──
  {
    id: "greeting",
    category: "salutation",
    patterns: [
      ["salut"],
      ["bonjour"],
      ["hello"],
      ["hey"],
      ["coucou"],
      ["bonsoir"],
      ["salam"],
      ["hi"],
    ],
    responses: [
      "Salut ! 👋 Comment puis-je vous aider à en savoir plus sur Amine ?",
      "Bonjour ! 😊 Que souhaitez-vous savoir sur Amine Rachidi ?",
      "Hey ! Bienvenue sur le portfolio d'Amine. Posez-moi vos questions !",
    ],
    suggestions: ["Qui est Amine ?", "Ses compétences", "Ses projets"],
    priority: 1,
  },
  {
    id: "how-are-you",
    category: "salutation",
    patterns: [
      ["comment", "vas"],
      ["comment", "allez"],
      ["ça", "va"],
      ["ca", "va"],
    ],
    responses: [
      "Je vais très bien, merci ! 😄 Je suis prêt à répondre à vos questions sur Amine.",
      "Parfait ! Merci de demander 😊 Comment puis-je vous aider ?",
    ],
    suggestions: ["Parle-moi d'Amine", "Ses projets", "Comment le contacter ?"],
  },
  {
    id: "thanks",
    category: "salutation",
    patterns: [["merci"], ["thanks"], ["cool"], ["super"], ["parfait"], ["genial"], ["excellent"]],
    responses: [
      "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions.",
      "De rien ! Je suis là pour ça. Que voulez-vous savoir d'autre ?",
      "Content de pouvoir aider ! 🙌 Une autre question ?",
    ],
    suggestions: ["Ses compétences", "Ses projets", "Contact"],
  },
  {
    id: "bye",
    category: "salutation",
    patterns: [["au revoir"], ["bye"], ["a bientot"], ["bonne journee"], ["ciao"]],
    responses: [
      "Au revoir ! 👋 N'hésitez pas à revenir si vous avez d'autres questions.",
      "À bientôt ! Bonne continuation 😊",
    ],
  },

  // ── Identité & Parcours ──
  {
    id: "who-is-amine",
    category: "identite",
    patterns: [
      ["qui", "amine"],
      ["qui", "est"],
      ["qui", "es", "tu"],
      ["presente", "toi"],
      ["parle", "amine"],
      ["c'est", "qui"],
      ["identite"],
      ["presentation"],
    ],
    responses: [
      "Amine Rachidi est un élève en **2ème année du cycle ingénieur** à l'**ENSIASD Taroudannt** 🎓. Il est passionné par le développement web, l'analyse territoriale, les plateformes numériques et les outils d'aide à la décision. Il travaille avec des technologies comme **Spring Boot**, **React**, **Next.js** et bien plus !",
    ],
    suggestions: ["Sa formation", "Ses compétences", "Ses projets"],
    priority: 2,
  },
  {
    id: "formation",
    category: "identite",
    patterns: [
      ["formation"],
      ["formations"],
      ["etude"],
      ["etudes"],
      ["ecole"],
      ["universite"],
      ["diplome"],
      ["ensiasd"],
      ["taroudannt"],
      ["cycle", "ingenieur"],
      ["parcours", "academique"],
      ["cursus"],
      ["bac"],
      ["ingenierie"],
    ],
    responses: [
      "Amine est actuellement en **2ème année du cycle ingénieur** à l'**ENSIASD** (École Nationale des Sciences Appliquées de l'Information, des Systèmes et du Digital) à **Taroudannt** 🏫. Sa spécialité couvre l'analyse, la conception et le développement de systèmes d'information.",
    ],
    suggestions: ["Ses compétences", "Ses centres d'intérêt", "Ses projets"],
    priority: 5,
  },
  {
    id: "interests",
    category: "identite",
    patterns: [
      ["centre", "interet"],
      ["interets"],
      ["interesse"],
      ["passion"],
      ["passions"],
      ["aime", "faire"],
      ["domaine"],
    ],
    responses: [
      "Les centres d'intérêt d'Amine incluent :\n\n🔹 L'analyse et la conception des SI\n🔹 L'architecture logicielle\n🔹 Le développement Full Stack\n🔹 La modélisation des données\n🔹 Les applications géospatiales & décisionnelles\n🔹 Les API REST sécurisées",
    ],
    suggestions: ["Ses compétences techniques", "Ses projets", "Sa formation"],
  },

  // ── Compétences ──
  {
    id: "skills-general",
    category: "competences",
    patterns: [
      ["competence"],
      ["competences"],
      ["skill"],
      ["skills"],
      ["sait", "faire"],
      ["capable"],
      ["technologie"],
      ["technologies"],
      ["maitrise"],
      ["tech", "stack"],
    ],
    responses: [
      "Amine maîtrise un large éventail de technologies 💻 :\n\n**Frameworks** : React/Next.js, Spring Boot, Node.js/Express, FastAPI, Tailwind CSS\n**Langages** : Java, JavaScript/TypeScript, Python, SQL, HTML/CSS, C/C++, PHP\n**Outils** : Git/GitHub, Docker\n**Méthodologies** : UML/Merise, Design Patterns, REST API Design\n\nIl parle aussi 3 langues : Arabe, Français et Anglais ! 🌍",
    ],
    suggestions: ["Frontend ?", "Backend ?", "Ses projets"],
    priority: 2,
  },
  {
    id: "frontend",
    category: "competences",
    patterns: [
      ["frontend"],
      ["front-end"],
      ["front", "end"],
      ["react"],
      ["nextjs"],
      ["next.js"],
      ["tailwind"],
      ["interface"],
      ["ui"],
    ],
    responses: [
      "Côté **Frontend**, Amine travaille avec :\n\n⚛️ **React / Next.js** — 70%\n🎨 **Tailwind CSS** — 75%\n📄 **HTML / CSS** — 80%\n📜 **JavaScript / TypeScript** — 70%\n\nIl crée des interfaces modernes, responsives et performantes !",
    ],
    suggestions: ["Backend ?", "Ses projets", "Son parcours"],
  },
  {
    id: "backend",
    category: "competences",
    patterns: [
      ["backend"],
      ["back-end"],
      ["back", "end"],
      ["spring"],
      ["boot"],
      ["node"],
      ["express"],
      ["fastapi"],
      ["serveur"],
      ["api"],
    ],
    responses: [
      "Côté **Backend**, Amine maîtrise :\n\n☕ **Spring Boot** — 72%\n🟢 **Node.js / Express** — 60%\n⚡ **FastAPI** — 50%\n☕ **Java** — 75%\n🐍 **Python** — 60%\n\nIl conçoit des API REST sécurisées et des architectures robustes !",
    ],
    suggestions: ["Frontend ?", "Bases de données ?", "Ses projets"],
  },
  {
    id: "database",
    category: "competences",
    patterns: [
      ["base", "donnee"],
      ["bases", "donnees"],
      ["database"],
      ["sql"],
      ["postgresql"],
      ["mongodb"],
      ["mysql"],
      ["sqlite"],
      ["bdd"],
    ],
    responses: [
      "Pour les **bases de données**, Amine utilise :\n\n🗃️ **SQL** — 72%\n🐘 **PostgreSQL / MongoDB** — 55%\n🗄️ **MySQL** — utilisé dans plusieurs projets\n📦 **SQLite** — pour les apps desktop\n\nIl maîtrise aussi la modélisation de données avec UML et Merise !",
    ],
    suggestions: ["Ses projets", "Backend ?", "Frontend ?"],
  },
  {
    id: "languages-spoken",
    category: "competences",
    patterns: [
      ["langue"],
      ["langues"],
      ["parle"],
      ["arabe"],
      ["francais"],
      ["anglais"],
      ["bilingue"],
      ["polyglotte"],
    ],
    responses: [
      "Amine parle **3 langues** 🌍 :\n\n🇲🇦 **Arabe** — Langue maternelle (100%)\n🇫🇷 **Français** — Courant (88%)\n🇬🇧 **Anglais** — Avancé (95%)",
    ],
    suggestions: ["Ses compétences techniques", "Ses projets", "Contact"],
  },

  // ── Projets ──
  {
    id: "projects-general",
    category: "projets",
    patterns: [
      ["projet"],
      ["projets"],
      ["realisation"],
      ["realisations"],
      ["portfolio"],
      ["travaux"],
    ],
    responses: [
      "Amine a réalisé **7 projets** impressionnants 🚀 :\n\n🏙️ **Urbanisme Assistant** — Analyse territoriale avec IA\n🤝 **Social Services Platform** — Gestion des services sociaux\n🎓 **Edu Events** — Gestion d'événements éducatifs\n🧺 **Laundry App** — App mobile de blanchisserie\n♟️ **Chess Analyser** — Analyse de parties d'échecs\n🏫 **Gestion d'Établissement** — Gestion scolaire\n🏋️ **Gym Manager** — Gestion de salle de sport\n\nLequel vous intéresse ?",
    ],
    suggestions: ["Urbanisme Assistant", "Social Services", "Chess Analyser"],
    priority: 3,
  },
  {
    id: "project-urbanisme",
    category: "projets",
    patterns: [
      ["urbanisme"],
      ["assistant", "urbanisme"],
      ["analyse", "territoriale"],
      ["amenagement"],
      ["collectivite"],
    ],
    responses: [
      "🏙️ **Urbanisme Assistant** est une plateforme intelligente d'analyse territoriale destinée aux collectivités et acteurs de l'aménagement.\n\n**Fonctionnalités** : Analyse territoriale, consultation documentaire, chatbot spécialisé, aide à la décision\n**Technologies** : Next.js, React, FastAPI, MistralAI, PostgreSQL\n\n📺 Une démo vidéo est disponible dans la section projets !",
    ],
    suggestions: ["Social Services", "Autres projets", "Ses compétences"],
  },
  {
    id: "project-social",
    category: "projets",
    patterns: [
      ["social", "service"],
      ["social", "services"],
      ["services", "sociaux"],
      ["plateforme", "sociale"],
    ],
    responses: [
      "🤝 **Social Services Platform** est une plateforme numérique pour la gestion et l'accès aux services sociaux.\n\n**Fonctionnalités** : Authentification sécurisée, gestion des demandes, tableau de bord, suivi des dossiers\n**Technologies** : Next.js, React, TypeScript, Spring Boot, Spring Security, MySQL",
    ],
    suggestions: ["Urbanisme Assistant", "Edu Events", "Autres projets"],
  },
  {
    id: "project-edu-events",
    category: "projets",
    patterns: [
      ["edu", "event"],
      ["edu", "events"],
      ["evenement"],
      ["evenements", "educatif"],
      ["billetterie"],
    ],
    responses: [
      "🎓 **Edu Events** est une plateforme de gestion d'événements éducatifs et de billetterie en ligne.\n\n**Fonctionnalités** : Création d'événements, billetterie en ligne, gestion des participants\n**Technologies** : HTML, CSS, JavaScript, PHP, MariaDB",
    ],
    suggestions: ["Laundry App", "Autres projets", "Ses compétences"],
  },
  {
    id: "project-laundry",
    category: "projets",
    patterns: [
      ["laundry"],
      ["blanchisserie"],
      ["linge"],
      ["laverie"],
      ["qr", "code"],
    ],
    responses: [
      "🧺 **Laundry App** est une application mobile de gestion de blanchisserie avec suivi numérique des commandes.\n\n**Fonctionnalités** : Gestion des commandes, suivi du traitement, scan QR Code, notifications Firebase\n**Technologies** : Android Java, Firebase, Retrofit, Spring Boot, MySQL",
    ],
    suggestions: ["Chess Analyser", "Autres projets", "Contact"],
  },
  {
    id: "project-chess",
    category: "projets",
    patterns: [
      ["chess"],
      ["echec"],
      ["echecs"],
      ["stockfish"],
      ["analyse", "partie"],
    ],
    responses: [
      "♟️ **Chess Analyser** est un outil d'analyse de parties d'échecs avec le moteur Stockfish intégré.\n\n**Fonctionnalités** : Analyse de parties, suggestions de coups, statistiques avancées\n**Technologies** : JavaFX, FXML, Maven, Stockfish, SQLite",
    ],
    suggestions: ["Gym Manager", "Autres projets", "Ses compétences"],
  },
  {
    id: "project-gestion",
    category: "projets",
    patterns: [
      ["gestion", "etablissement"],
      ["gestion", "etudiant"],
      ["note"],
      ["releve"],
      ["pdf"],
      ["tkinter"],
    ],
    responses: [
      "🏫 **Gestion d'Établissement** est une application desktop pour la gestion scolaire.\n\n**Fonctionnalités** : Gestion des étudiants, suivi des notes, tableau de bord interactif, génération de relevés PDF\n**Technologies** : Python, Tkinter, SQLite, ReportLab, Matplotlib",
    ],
    suggestions: ["Gym Manager", "Autres projets", "Contact"],
  },
  {
    id: "project-gym",
    category: "projets",
    patterns: [
      ["gym"],
      ["salle", "sport"],
      ["manager"],
      ["abonnement"],
      ["wpf"],
      ["c#"],
      ["csharp"],
    ],
    responses: [
      "🏋️ **Gym Manager** est une application desktop WPF moderne pour la gestion complète d'une salle de sport.\n\n**Fonctionnalités** : Gestion des membres, suivi des abonnements, tableau de bord, architecture Clean\n**Technologies** : C#, WPF, .NET 10, SQLite, EF Core",
    ],
    suggestions: ["Urbanisme Assistant", "Autres projets", "Contact"],
  },

  // ── Contact ──
  {
    id: "contact",
    category: "contact",
    patterns: [
      ["contact"],
      ["contacter"],
      ["joindre"],
      ["email"],
      ["mail"],
      ["ecrire"],
      ["message"],
      ["envoyer"],
    ],
    responses: [
      "Vous pouvez contacter Amine de plusieurs façons 📬 :\n\n📧 **Email** : rachidiamine906@gmail.com\n💼 **LinkedIn** : linkedin.com/in/amine-rachidi-1b9938386\n🐙 **GitHub** : github.com/aminefeitan\n📸 **Instagram** : @aminefeitan\n📘 **Facebook** : disponible sur le portfolio\n\nVous pouvez aussi utiliser le **formulaire de contact** en bas de la page !",
    ],
    suggestions: ["Ses projets", "Ses compétences", "Son parcours"],
    priority: 2,
  },
  {
    id: "github",
    category: "contact",
    patterns: [
      ["github"],
      ["git"],
      ["code", "source"],
      ["repository"],
      ["repo"],
    ],
    responses: [
      "Le profil GitHub d'Amine est **github.com/aminefeitan** 🐙\n\nVous y trouverez tous ses projets open source !",
    ],
    suggestions: ["Ses projets", "LinkedIn ?", "Contact"],
  },
  {
    id: "linkedin",
    category: "contact",
    patterns: [["linkedin"], ["professionnel"], ["reseau", "professionnel"]],
    responses: [
      "Le profil LinkedIn d'Amine est disponible ici :\n💼 **linkedin.com/in/amine-rachidi-1b9938386**\n\nN'hésitez pas à le connecter !",
    ],
    suggestions: ["GitHub ?", "Email ?", "Ses projets"],
  },
  {
    id: "cv",
    category: "contact",
    patterns: [
      ["cv"],
      ["curriculum"],
      ["resume"],
      ["telecharger"],
      ["pdf", "cv"],
    ],
    responses: [
      "Le CV d'Amine est téléchargeable directement depuis le portfolio ! 📄\n\nCliquez sur le bouton **\"Télécharger CV\"** dans la section d'accueil en haut de la page.",
    ],
    suggestions: ["Ses compétences", "Ses projets", "Contact"],
  },

  // ── Disponibilité ──
  {
    id: "availability",
    category: "disponibilite",
    patterns: [
      ["disponible"],
      ["disponibilite"],
      ["opportunite"],
      ["stage"],
      ["embauche"],
      ["recrute"],
      ["recrutement"],
      ["emploi"],
      ["travail"],
      ["poste"],
      ["offre"],
    ],
    responses: [
      "Amine est actuellement **disponible pour des opportunités** ! 🟢\n\nQue ce soit un stage, un projet collaboratif ou une opportunité professionnelle, n'hésitez pas à le contacter via le formulaire de contact ou par email à **rachidiamine906@gmail.com** 📧",
    ],
    suggestions: ["Contact", "Ses compétences", "Ses projets"],
    priority: 2,
  },

  // ── Questions sur le chatbot ──
  {
    id: "about-chatbot",
    category: "meta",
    patterns: [
      ["chatbot"],
      ["robot"],
      ["bot"],
      ["assistant"],
      ["ia"],
      ["intelligence", "artificielle"],
      ["comment", "fonctionne"],
    ],
    responses: [
      "Je suis l'assistant virtuel du portfolio d'Amine ! 🤖\n\nJe fonctionne avec un système de **correspondance par mots-clés** — entièrement côté client, sans IA externe. Je connais toutes les informations sur Amine : son parcours, ses compétences, ses projets et ses coordonnées !",
    ],
    suggestions: ["Qui est Amine ?", "Ses compétences", "Ses projets"],
  },

  // ── Fallback ──
  {
    id: "fallback",
    category: "fallback",
    patterns: [],
    responses: [
      "Hmm, je ne suis pas sûr de comprendre votre question 🤔. Essayez de me poser des questions sur :\n\n• Le **parcours** d'Amine\n• Ses **compétences** techniques\n• Ses **projets** réalisés\n• Comment le **contacter**",
      "Je n'ai pas bien compris 😅. Pouvez-vous reformuler ? Je peux vous parler du parcours, des compétences, des projets ou des coordonnées d'Amine !",
      "Cette question dépasse mes connaissances actuelles 🙈. Mais je peux vous aider avec les infos du portfolio ! Essayez les suggestions ci-dessous 👇",
    ],
    suggestions: ["Qui est Amine ?", "Ses compétences", "Ses projets", "Contact"],
    priority: -1,
  },
];
