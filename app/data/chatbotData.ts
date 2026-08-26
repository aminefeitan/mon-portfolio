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
  { text: "Ses expériences & stages", icon: "💼" },
  { text: "Ses compétences", icon: "💻" },
  { text: "Ses projets récents", icon: "🚀" },
  { text: "Comment le contacter ?", icon: "📬" },
];

// ─── Message de bienvenue ────────────────────────────────────────
export const welcomeMessage =
  "Salut ! 👋 Je suis l'assistant virtuel du portfolio d'Amine Rachidi. Posez-moi vos questions sur son parcours, ses formations, ses stages, ses compétences, ses projets ou ses coordonnées !";

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
      ["bienvenue"],
    ],
    responses: [
      "Salut ! 👋 Comment puis-je vous aider à découvrir le parcours et les projets d'Amine Rachidi ?",
      "Bonjour ! 😊 Que souhaitez-vous savoir sur Amine (formation, stages, compétences, projets) ?",
      "Hey ! Bienvenue sur le portfolio d'Amine. Je suis là pour répondre à toutes vos questions !",
    ],
    suggestions: ["Qui est Amine ?", "Ses expériences", "Ses projets"],
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
      "Je vais très bien, merci ! 😄 Je suis à votre disposition pour vous présenter le profil d'Amine.",
      "Parfaitement bien ! Merci de demander 😊 Que souhaitez-vous explorer aujourd'hui ?",
    ],
    suggestions: ["Qui est Amine ?", "Ses projets", "Comment le contacter ?"],
  },
  {
    id: "thanks",
    category: "salutation",
    patterns: [["merci"], ["thanks"], ["cool"], ["super"], ["parfait"], ["genial"], ["excellent"]],
    responses: [
      "Avec grand plaisir ! 😊 N'hésitez pas si vous avez d'autres questions sur Amine.",
      "De rien ! Je suis là pour ça. Souhaitez-vous voir ses projets ou ses coordonnées ?",
      "Ravi de vous aider ! 🙌 Une autre question ?",
    ],
    suggestions: ["Ses compétences", "Ses projets", "Contact"],
  },
  {
    id: "bye",
    category: "salutation",
    patterns: [["au revoir"], ["bye"], ["a bientot"], ["bonne journee"], ["bonne soiree"], ["ciao"]],
    responses: [
      "Au revoir ! 👋 Merci de votre visite et à très bientôt sur le portfolio d'Amine !",
      "À bientôt ! Bonne continuation et n'hésitez pas à contacter Amine 😊",
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
      ["bio"],
      ["a", "propos"],
    ],
    responses: [
      "**Amine Rachidi** est un élève-ingénieur en **Génie Logiciel** à l'**ENSIASD Taroudannt** 🎓.\n\nPassionné par l'architecture logicielle, le développement Full Stack, les plateformes territoriales et les solutions d'aide à la décision, il conçoit des applications modernes et performantes avec des technologies comme **Next.js**, **React**, **FastAPI**, **Spring Boot** et **Python**.",
    ],
    suggestions: ["Sa formation", "Ses stages", "Ses compétences", "Ses projets"],
    priority: 3,
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
      ["diplomes"],
      ["ensiasd"],
      ["taroudannt"],
      ["cycle", "ingenieur"],
      ["dut"],
      ["est", "khenifra"],
      ["parcours", "academique"],
      ["cursus"],
      ["bac"],
      ["baccalaureat"],
    ],
    responses: [
      "Le parcours académique d'Amine comprend 🎓 :\n\n🏛️ **2025 – 2028** : **Cycle d'Ingénieur d'État en Ingénierie Logicielle** à l'**ENSIASD Taroudannt** (Architectures distribuées, conception logicielle avancée, bases de données, technologies web modernes).\n\n📜 **2023 – 2025** : **DUT en Génie Logiciel** à l'**EST Khénifra** (Bases solides en POO, structures de données, modélisation UML & Merise, bases de données relationnelles).\n\n🎓 **2023** : **Baccalauréat en Sciences Physiques** au Lycée Tariq Qualifiant (Khénifra) avec mention.",
    ],
    suggestions: ["Ses stages & expériences", "Ses compétences", "Ses projets"],
    priority: 5,
  },
  {
    id: "experience-stages",
    category: "experience",
    patterns: [
      ["experience"],
      ["experiences"],
      ["stage"],
      ["stages"],
      ["parcours"],
      ["professionnel"],
      ["travail"],
      ["historique"],
      ["agence", "urbaine"],
      ["delegation", "sante"],
      ["education", "nationale"],
    ],
    responses: [
      "Amine a réalisé plusieurs stages enrichissants en développement logiciel 💼 :\n\n🏙️ **Juin 2026 — Stagiaire Développeur Full Stack**\n*Agence Urbaine de Khénifra*\n• Conception et développement d'un chatbot intelligent d'aide à la décision en urbanisme avec IA (MistralAI).\n• Création d'un portail d'administration pour la gestion et le suivi temps réel (`Next.js`, `React`, `FastAPI`, `PostgreSQL`).\n\n🏥 **Avril – Mai 2025 — Stagiaire Développeur Web**\n*Délégation Provinciale de Santé, Khénifra*\n• Développement d'une plateforme web pour la gestion et le suivi des services sociaux (`Next.js`, `TypeScript`, `Spring Boot`, `MySQL`).\n\n🏫 **Mai 2024 — Stagiaire Développeur Python**\n*Direction Provinciale de l'Éducation Nationale, Khénifra*\n• Développement d'une application desktop Python de gestion d'établissements scolaires et génération de bulletins PDF (`Python`, `Tkinter`, `SQLite`, `ReportLab`).",
    ],
    suggestions: ["Ses projets", "Ses compétences", "Contact"],
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
      ["domaines"],
    ],
    responses: [
      "Les domaines d'expertise et centres d'intérêt d'Amine sont 🎯 :\n\n🌐 **Analyse & Conception des Systèmes d'Information**\n🏗️ **Architecture logicielle & Design Patterns**\n⚡ **Développement Full Stack moderne (Web & Mobile)**\n🗄️ **Modélisation & optimisation des bases de données**\n🗺️ **Applications géospatiales & Outils décisionnels**\n🔒 **Conception d'APIs REST sécurisées**",
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
      ["stack"],
    ],
    responses: [
      "Voici un aperçu de la stack technique d'Amine 💻 :\n\n🔹 **Langages** : HTML (Expert), CSS (Expert), JavaScript (Avancé), Java, C, SQL, Python (Intermédiaire), PHP\n🔹 **Frameworks & Libs** : React (Avancé), Next.js, Git / GitHub (Intermédiaire), Spring Boot, Tailwind CSS, FastAPI\n🔹 **Langues parlées** : Arabe (Maternelle), Anglais (Courant), Français (Courant)\n\nChaque technologie de son portfolio renvoie vers son site officiel !",
    ],
    suggestions: ["Frontend ?", "Backend ?", "Ses projets"],
    priority: 3,
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
      ["css"],
      ["html"],
      ["javascript"],
      ["js"],
    ],
    responses: [
      "Côté **Frontend**, Amine maîtrise 🎨 :\n\n⚛️ **React** — Niveau Avancé (85%)\n⚡ **Next.js** — Niveau Intermédiaire (70%)\n📜 **JavaScript** — Niveau Avancé (85%)\n📄 **HTML / CSS** — Niveau Expert (95–100%)\n🎨 **Tailwind CSS** — Conception d'interfaces réactives et soignées\n\nIl privilégie les interfaces fluides, ergonomiques, responsives et accessibles !",
    ],
    suggestions: ["Backend ?", "Ses projets", "Ses stages"],
  },
  {
    id: "backend",
    category: "competences",
    patterns: [
      ["backend"],
      ["back-end"],
      ["back", "end"],
      ["spring"],
      ["spring", "boot"],
      ["fastapi"],
      ["serveur"],
      ["api"],
      ["rest"],
      ["java"],
      ["python"],
      ["php"],
      ["c"],
    ],
    responses: [
      "Côté **Backend & Architecture**, Amine travaille avec ⚙️ :\n\n☕ **Java & Spring Boot** — Conception d'architectures robustes et APIs REST\n⚡ **FastAPI (Python)** — Création d'APIs asynchrones rapides et intégration de modèles IA\n🐍 **Python** — Scripts, traitement de données, Tkinter & automatisation\n🐘 **PHP** — Développement web backend\n⚙️ **C** — Programmation système et algorithmique avancée",
    ],
    suggestions: ["Bases de données ?", "Frontend ?", "Ses projets"],
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
      ["mysql"],
      ["mariadb"],
      ["sqlite"],
      ["bdd"],
      ["modelisation"],
      ["merise"],
      ["uml"],
    ],
    responses: [
      "Pour les **Bases de Données & Modélisation**, Amine utilise 🗄️ :\n\n🐘 **PostgreSQL** — Utilisé notamment pour *Urbanisme Assistant*\n🗄️ **MySQL / MariaDB** — Pour les plateformes web et services sociaux\n📦 **SQLite** — Pour les applications desktop et outils locaux\n📐 **UML & Merise** — Conception rigoureuse des schémas relationnels et modèles de données",
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
      ["language"],
    ],
    responses: [
      "Amine est polyglotte et parle **3 langues** 🌍 :\n\n🇲🇦 **Arabe** — Langue maternelle\n🇬🇧 **Anglais** — Courant\n🇫🇷 **Français** — Courant",
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
      ["applications"],
      ["apps"],
    ],
    responses: [
      "Amine a développé **7 projets complets** dans différents domaines 🚀 :\n\n1. 🏙️ **Urbanisme Assistant** — Plateforme d'analyse territoriale avec IA & démo vidéo\n2. 🤝 **Social Services Platform** — Gestion sécurisée des services sociaux\n3. 🎓 **Edu Events** — Billetterie en ligne et gestion d'événements\n4. 🧺 **Laundry App** — App mobile de blanchisserie avec scan QR\n5. ♟️ **Chess Analyser** — Analyse de parties d'échecs avec moteur Stockfish\n6. 🏫 **Gestion d'Établissement** — Gestion scolaire desktop & relevés PDF\n7. 🏋️ **Gym Manager** — Gestion complète de salle de sport en WPF / C#\n\nSur quel projet voulez-vous en savoir plus ?",
    ],
    suggestions: ["Urbanisme Assistant", "Social Services Platform", "Chess Analyser", "Gym Manager"],
    priority: 4,
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
      ["mistral"],
      ["mistralai"],
    ],
    responses: [
      "🏙️ **Urbanisme Assistant** est une plateforme intelligente d'analyse territoriale destinée à accompagner les collectivités et acteurs de l'aménagement.\n\n✨ **Fonctionnalités clés** :\n• Analyse de données territoriales\n• Consultation documentaire automatisée\n• Chatbot spécialisé avec MistralAI\n• Outils d'aide à la décision\n\n🛠️ **Technologies** : Next.js, React, FastAPI, MistralAI, PostgreSQL\n📺 **Démo vidéo** : https://youtu.be/gHXkbftqZeI",
    ],
    suggestions: ["Social Services Platform", "Autres projets", "Ses compétences"],
  },
  {
    id: "project-social",
    category: "projets",
    patterns: [
      ["social", "service"],
      ["social", "services"],
      ["services", "sociaux"],
      ["plateforme", "sociale"],
      ["sante"],
    ],
    responses: [
      "🤝 **Social Services Platform** est une plateforme web dédiée à la gestion et à l'accès simplifié aux services sociaux.\n\n✨ **Fonctionnalités clés** :\n• Authentification sécurisée multi-rôles (Spring Security)\n• Gestion et suivi des demandes d'aide\n• Tableau de bord administratif interactif\n• Suivi des dossiers en temps réel\n\n🛠️ **Technologies** : Next.js, React, TypeScript, Spring Boot, Spring Security, MySQL",
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
      "🎓 **Edu Events** est une plateforme web complète de gestion d'événements éducatifs et de billetterie en ligne.\n\n✨ **Fonctionnalités clés** :\n• Création et publication d'événements\n• Billetterie électronique en ligne\n• Gestion et suivi des inscriptions des participants\n\n🛠️ **Technologies** : HTML, CSS, JavaScript, PHP, MariaDB",
    ],
    suggestions: ["Laundry App", "Chess Analyser", "Autres projets"],
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
      ["android"],
    ],
    responses: [
      "🧺 **Laundry App** est une application mobile de gestion de blanchisserie avec suivi numérique des commandes.\n\n✨ **Fonctionnalités clés** :\n• Suivi en temps réel des commandes et étapes de traitement\n• Scan de QR Code pour vérification rapide\n• Notifications push en direct via Firebase\n\n🛠️ **Technologies** : Android Java, Firebase, Retrofit, Spring Boot, MySQL",
    ],
    suggestions: ["Chess Analyser", "Gym Manager", "Contact"],
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
      ["javafx"],
    ],
    responses: [
      "♟️ **Chess Analyser** est un outil desktop interactif d'analyse de parties d'échecs intégrant le moteur Stockfish.\n\n✨ **Fonctionnalités clés** :\n• Évaluation tactique et stratégique des positions\n• Suggestions des meilleurs coups calculés par Stockfish\n• Statistiques de performance et historique des parties\n\n🛠️ **Technologies** : JavaFX, FXML, Maven, Stockfish, SQLite",
    ],
    suggestions: ["Gym Manager", "Gestion d'Établissement", "Autres projets"],
  },
  {
    id: "project-gestion",
    category: "projets",
    patterns: [
      ["gestion", "etablissement"],
      ["gestion", "scolaire"],
      ["gestion", "etudiant"],
      ["bulletin"],
      ["releve"],
      ["pdf"],
      ["tkinter"],
    ],
    responses: [
      "🏫 **Gestion d'Établissement** est une application desktop Python pour la gestion scolaire.\n\n✨ **Fonctionnalités clés** :\n• Gestion des fiches étudiants et filières\n• Suivi des notes et calcul des moyennes\n• Tableau de bord interactif\n• Génération automatisée des relevés de notes au format PDF\n\n🛠️ **Technologies** : Python, Tkinter, SQLite, ReportLab, Matplotlib",
    ],
    suggestions: ["Gym Manager", "Urbanisme Assistant", "Contact"],
  },
  {
    id: "project-gym",
    category: "projets",
    patterns: [
      ["gym"],
      ["salle", "sport"],
      ["gym", "manager"],
      ["abonnement"],
      ["abonnements"],
      ["wpf"],
      ["c#"],
      ["csharp"],
      ["dotnet"],
      [".net"],
    ],
    responses: [
      "🏋️ **Gym Manager** est une application desktop WPF moderne et performante pour la gestion d'une salle de sport.\n\n✨ **Fonctionnalités clés** :\n• Gestion des membres et renouvellements d'abonnements\n• Suivi des paiements et tableau de bord financier\n• Architecture logicielle Clean et maintenable\n\n🛠️ **Technologies** : C#, WPF, .NET 10, SQLite, EF Core",
    ],
    suggestions: ["Urbanisme Assistant", "Social Services Platform", "Contact"],
  },
  {
    id: "project-video-demo",
    category: "projets",
    patterns: [
      ["demo"],
      ["video"],
      ["youtube"],
      ["voir", "projet"],
      ["apercu"],
    ],
    responses: [
      "📺 Une démo vidéo complète est disponible pour le projet **Urbanisme Assistant** !\n\nVous pouvez la visionner directement sur YouTube ici :\n👉 **https://youtu.be/gHXkbftqZeI**\n\nou en cliquant sur le bouton de lecture dans la section Projets du portfolio !",
    ],
    suggestions: ["Urbanisme Assistant", "Tous les projets", "Contact"],
  },

  // ── Contact & Réseaux ──
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
      ["coordonnees"],
      ["telephone"],
    ],
    responses: [
      "Vous pouvez joindre Amine Rachidi par plusieurs canaux 📬 :\n\n📧 **Email** : rachidiamine906@gmail.com\n💼 **LinkedIn** : linkedin.com/in/amine-rachidi-1b9938386\n🐙 **GitHub** : github.com/aminefeitan\n📸 **Instagram** : @aminefeitan\n📘 **Facebook** : disponible sur le portfolio\n\nVous pouvez également envoyer un message direct via le **formulaire de contact** en bas de page !",
    ],
    suggestions: ["Ses projets", "Ses compétences", "Télécharger son CV"],
    priority: 3,
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
      ["projets", "github"],
    ],
    responses: [
      "Retrouvez tous les repositories et projets open source d'Amine sur son GitHub 🐙 :\n👉 **https://github.com/aminefeitan**",
    ],
    suggestions: ["Ses projets", "LinkedIn ?", "Contact"],
  },
  {
    id: "linkedin",
    category: "contact",
    patterns: [
      ["linkedin"],
      ["reseau", "professionnel"],
      ["profil", "professionnel"],
    ],
    responses: [
      "Connectez-vous avec Amine sur LinkedIn 💼 :\n👉 **https://linkedin.com/in/amine-rachidi-1b9938386**",
    ],
    suggestions: ["GitHub ?", "Email ?", "Ses projets"],
  },
  {
    id: "social-media",
    category: "contact",
    patterns: [
      ["instagram"],
      ["facebook"],
      ["reseaux"],
      ["reseaux", "sociaux"],
      ["social"],
    ],
    responses: [
      "Amine est présent sur plusieurs réseaux sociaux 🌐 :\n\n💼 **LinkedIn** : linkedin.com/in/amine-rachidi-1b9938386\n🐙 **GitHub** : github.com/aminefeitan\n📸 **Instagram** : @aminefeitan\n📘 **Facebook** : facebook.com (lien sur le portfolio)",
    ],
    suggestions: ["Contact", "Ses projets"],
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
      ["fichier", "cv"],
    ],
    responses: [
      "Le CV d'Amine Rachidi est disponible au téléchargement 📄 !\n\nVous pouvez le télécharger directement en cliquant sur le bouton **\"Télécharger CV\"** dans l'en-tête d'accueil du portfolio ou via le lien direct `/cv-amine-rachidi.pdf`.",
    ],
    suggestions: ["Ses compétences", "Ses stages", "Contact"],
  },

  // ── Disponibilité ──
  {
    id: "availability",
    category: "disponibilite",
    patterns: [
      ["disponible"],
      ["disponibilite"],
      ["opportunite"],
      ["opportunites"],
      ["stage"],
      ["pfe"],
      ["embauche"],
      ["recrute"],
      ["recrutement"],
      ["emploi"],
      ["travail"],
      ["poste"],
      ["offre"],
      ["freelance"],
      ["collaboration"],
    ],
    responses: [
      "Amine est actuellement **disponible pour des opportunités** (stages, projets innovants ou opportunités professionnelles) 🟢 !\n\nN'hésitez pas à lui écrire par email à **rachidiamine906@gmail.com** ou via le formulaire de contact pour échanger sur vos projets.",
    ],
    suggestions: ["Contact", "Ses compétences", "Ses projets"],
    priority: 3,
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
      ["qui", "t'a", "cree"],
    ],
    responses: [
      "Je suis l'assistant interactif du portfolio d'Amine Rachidi 🤖 !\n\nJe fonctionne avec un moteur de recherche contextuel ultra-rapide côté client. Je connais l'ensemble du profil d'Amine : son parcours à l'ENSIASD, ses stages, ses 7 projets majeurs, sa stack technique et ses moyens de contact.",
    ],
    suggestions: ["Qui est Amine ?", "Ses compétences", "Ses projets"],
  },

  // ── Fallback ──
  {
    id: "fallback",
    category: "fallback",
    patterns: [],
    responses: [
      "Hmm, je ne suis pas certain d'avoir bien compris 🤔. Posez-moi des questions sur :\n\n• La **formation** d'Amine (ENSIASD, EST, Bac)\n• Ses **stages & expériences** professionnelles\n• Ses **compétences** (React, Next.js, FastAPI, Spring Boot, Python...)\n• Ses **7 projets** réalisés\n• Comment le **contacter**",
      "Je n'ai pas trouvé de correspondance exacte 😅. Pouvez-vous reformuler ? Je peux vous renseigner sur le parcours, les stages, les projets ou les coordonnées d'Amine !",
      "Cette question dépasse mes connaissances actuelles 🙈. Mais je peux vous guider à travers tout le portfolio ! Choisissez une suggestion ci-dessous 👇",
    ],
    suggestions: ["Qui est Amine ?", "Ses expériences & stages", "Ses projets", "Contact"],
    priority: -1,
  },
];
