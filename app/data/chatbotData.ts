// ─── Types ──────────────────────────────────────────────────────
export interface ChatRule {
  /** Identifiant unique de la règle */
  id: string;
  /** Catégorie pour le regroupement logique */
  category: string;
  /** Patterns de mots-clés en français / communs */
  patterns: string[][];
  /** Patterns de mots-clés en anglais */
  patternsEn?: string[][];
  /** Réponses en français (une sera choisie au hasard) */
  responses: string[];
  /** Réponses en anglais */
  responsesEn?: string[];
  /** Suggestions affichées après la réponse (FR) */
  suggestions?: string[];
  /** Suggestions affichées après la réponse (EN) */
  suggestionsEn?: string[];
  /** Score bonus si plusieurs patterns matchent (priorité) */
  priority?: number;
}

export interface ChatSuggestion {
  text: string;
  icon?: string;
}

// ─── Suggestions initiales ───────────────────────────────────────
export const initialSuggestionsFr: ChatSuggestion[] = [
  { text: "Qui est Amine ?", icon: "👤" },
  { text: "Ses expériences & stages", icon: "💼" },
  { text: "Ses compétences", icon: "💻" },
  { text: "Ses projets récents", icon: "🚀" },
  { text: "Comment le contacter ?", icon: "📬" },
];

export const initialSuggestionsEn: ChatSuggestion[] = [
  { text: "Who is Amine?", icon: "👤" },
  { text: "His internships & experience", icon: "💼" },
  { text: "His technical skills", icon: "💻" },
  { text: "His recent projects", icon: "🚀" },
  { text: "How to contact him?", icon: "📬" },
];

export const initialSuggestions: ChatSuggestion[] = initialSuggestionsFr;

// ─── Messages de bienvenue ───────────────────────────────────────
export const welcomeMessageFr =
  "Salut ! 👋 Je suis l'assistant virtuel du portfolio d'Amine Rachidi. Posez-moi vos questions sur son parcours, ses formations, ses stages, ses compétences, ses projets ou ses coordonnées !";

export const welcomeMessageEn =
  "Hi! 👋 I am the virtual assistant for Amine Rachidi's portfolio. Ask me anything about his background, education, internships, skills, projects, or contact info!";

export const welcomeMessage = welcomeMessageFr;

export function getWelcomeMessage(locale: string = "fr"): string {
  return locale === "en" ? welcomeMessageEn : welcomeMessageFr;
}

export function getInitialSuggestions(locale: string = "fr"): ChatSuggestion[] {
  return locale === "en" ? initialSuggestionsEn : initialSuggestionsFr;
}

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
    patternsEn: [
      ["hello"],
      ["hi"],
      ["hey"],
      ["greetings"],
      ["good", "morning"],
      ["good", "afternoon"],
      ["good", "evening"],
      ["welcome"],
      ["whats", "up"],
    ],
    responses: [
      "Salut ! 👋 Comment puis-je vous aider à découvrir le parcours et les projets d'Amine Rachidi ?",
      "Bonjour ! 😊 Que souhaitez-vous savoir sur Amine (formation, stages, compétences, projets) ?",
      "Hey ! Bienvenue sur le portfolio d'Amine. Je suis là pour répondre à toutes vos questions !",
    ],
    responsesEn: [
      "Hello! 👋 How can I assist you in discovering Amine Rachidi's background and projects?",
      "Hi there! 😊 What would you like to know about Amine (education, internships, skills, or projects)?",
      "Hey! Welcome to Amine's portfolio. I'm here to answer any questions you have!",
    ],
    suggestions: ["Qui est Amine ?", "Ses expériences", "Ses projets"],
    suggestionsEn: ["Who is Amine?", "His experience", "His projects"],
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
      ["forme"],
    ],
    patternsEn: [
      ["how", "are", "you"],
      ["how", "is", "it", "going"],
      ["how", "are", "things"],
      ["how", "do", "you", "do"],
      ["how", "you", "doing"],
    ],
    responses: [
      "Je vais très bien, merci ! 😄 Je suis à votre disposition pour vous présenter le profil d'Amine.",
      "Parfaitement bien ! Merci de demander 😊 Que souhaitez-vous explorer aujourd'hui ?",
    ],
    responsesEn: [
      "I'm doing great, thank you! 😄 I'm ready to introduce you to Amine's profile.",
      "Doing wonderful, thanks for asking! 😊 What would you like to explore today?",
    ],
    suggestions: ["Qui est Amine ?", "Ses projets", "Comment le contacter ?"],
    suggestionsEn: ["Who is Amine?", "His projects", "How to contact him?"],
  },
  {
    id: "thanks",
    category: "salutation",
    patterns: [["merci"], ["thanks"], ["cool"], ["super"], ["parfait"], ["genial"], ["excellent"], ["merci", "beaucoup"]],
    patternsEn: [["thank", "you"], ["thanks"], ["awesome"], ["great"], ["perfect"], ["appreciate", "it"], ["nice"], ["thank", "you", "so", "much"]],
    responses: [
      "Avec grand plaisir ! 😊 N'hésitez pas si vous avez d'autres questions sur Amine.",
      "De rien ! Je suis là pour ça. Souhaitez-vous voir ses projets ou ses coordonnées ?",
      "Ravi de vous aider ! 🙌 Une autre question ?",
    ],
    responsesEn: [
      "You're very welcome! 😊 Feel free to ask if you have any other questions about Amine.",
      "Happy to help! 🙌 Would you like to check out his projects or contact details?",
      "My pleasure! Let me know if you need anything else!",
    ],
    suggestions: ["Ses compétences", "Ses projets", "Contact"],
    suggestionsEn: ["His skills", "His projects", "Contact"],
  },
  {
    id: "bye",
    category: "salutation",
    patterns: [["au revoir"], ["bye"], ["a bientot"], ["bonne journee"], ["bonne soiree"], ["ciao"], ["a", "plus"]],
    patternsEn: [["goodbye"], ["bye"], ["see", "you"], ["have", "a", "good", "day"], ["have", "a", "nice", "day"], ["take", "care"], ["later"], ["cya"]],
    responses: [
      "Au revoir ! 👋 Merci de votre visite et à très bientôt sur le portfolio d'Amine !",
      "À bientôt ! Bonne continuation et n'hésitez pas à contacter Amine 😊",
    ],
    responsesEn: [
      "Goodbye! 👋 Thank you for stopping by, and see you soon on Amine's portfolio!",
      "See you soon! Have a great day and feel free to get in touch with Amine 😊",
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
    patternsEn: [
      ["who", "is", "amine"],
      ["who", "are", "you"],
      ["tell", "about", "amine"],
      ["tell", "me", "about", "amine"],
      ["introduce", "yourself"],
      ["about", "amine"],
      ["bio"],
      ["profile"],
      ["who", "is", "he"],
    ],
    responses: [
      "**Amine Rachidi** est un élève-ingénieur en **Génie Logiciel** à l'**ENSIASD Taroudannt** 🎓.\n\nPassionné par l'architecture logicielle, le développement Full Stack, les plateformes territoriales et les solutions d'aide à la décision, il conçoit des applications modernes et performantes avec des technologies comme **Next.js**, **React**, **FastAPI**, **Spring Boot** et **Python**.",
    ],
    responsesEn: [
      "**Amine Rachidi** is a Software Engineering student at **ENSIASD Taroudannt** 🎓.\n\nPassionate about software architecture, Full Stack engineering, territorial platforms, and decision-support systems, he designs modern, high-performance applications using **Next.js**, **React**, **FastAPI**, **Spring Boot**, and **Python**.",
    ],
    suggestions: ["Sa formation", "Ses stages", "Ses compétences", "Ses projets"],
    suggestionsEn: ["His education", "His internships", "His skills", "His projects"],
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
    patternsEn: [
      ["education"],
      ["studies"],
      ["study"],
      ["degree"],
      ["degrees"],
      ["university"],
      ["school"],
      ["college"],
      ["ensiasd"],
      ["taroudannt"],
      ["academic", "background"],
      ["engineering", "cycle"],
      ["dut"],
      ["khenifra"],
      ["high", "school"],
      ["baccalaureate"],
    ],
    responses: [
      "Le parcours académique d'Amine comprend 🎓 :\n\n🏛️ **2025 – 2028** : **Cycle d'Ingénieur d'État en Ingénierie Logicielle** à l'**ENSIASD Taroudannt** (Architectures distribuées, conception logicielle avancée, bases de données, technologies web modernes).\n\n📜 **2023 – 2025** : **DUT en Génie Logiciel** à l'**EST Khénifra** (Bases solides en POO, structures de données, modélisation UML & Merise, bases de données relationnelles).\n\n🎓 **2023** : **Baccalauréat en Sciences Physiques** au Lycée Tariq Qualifiant (Khénifra) avec mention.",
    ],
    responsesEn: [
      "Amine's academic background includes 🎓:\n\n🏛️ **2025 – 2028**: **State Software Engineering Degree** at **ENSIASD Taroudannt** (Distributed architectures, advanced software design, databases, modern web technologies).\n\n📜 **2023 – 2025**: **DUT in Software Engineering** at **EST Khénifra** (Solid foundation in OOP, data structures, UML & Merise modeling, relational databases).\n\n🎓 **2023**: **High School Diploma in Physical Sciences** at Tariq Qualifying High School (Khénifra) with honors.",
    ],
    suggestions: ["Ses stages & expériences", "Ses compétences", "Ses projets"],
    suggestionsEn: ["His internships & experience", "His skills", "His projects"],
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
      ["parcours", "professionnel"],
      ["travail"],
      ["historique"],
      ["agence", "urbaine"],
      ["delegation", "sante"],
      ["education", "nationale"],
    ],
    patternsEn: [
      ["internship"],
      ["internships"],
      ["experience"],
      ["experiences"],
      ["work", "experience"],
      ["career"],
      ["work", "history"],
      ["jobs"],
      ["urban", "agency"],
      ["health", "delegation"],
      ["education", "directorate"],
    ],
    responses: [
      "Amine a réalisé plusieurs stages enrichissants en développement logiciel 💼 :\n\n🏙️ **Juin 2026 — Stagiaire Développeur Full Stack**\n*Agence Urbaine de Khénifra*\n• Conception et développement d'un chatbot intelligent d'aide à la décision en urbanisme avec IA (MistralAI).\n• Création d'un portail d'administration pour la gestion et le suivi temps réel (`Next.js`, `React`, `FastAPI`, `PostgreSQL`).\n\n🏥 **Avril – Mai 2025 — Stagiaire Développeur Web**\n*Délégation Provinciale de Santé, Khénifra*\n• Développement d'une plateforme web pour la gestion et le suivi des services sociaux (`Next.js`, `TypeScript`, `Spring Boot`, `MySQL`).\n\n🏫 **Mai 2024 — Stagiaire Développeur Python**\n*Direction Provinciale de l'Éducation Nationale, Khénifra*\n• Développement d'une application desktop Python de gestion d'établissements scolaires et génération de bulletins PDF (`Python`, `Tkinter`, `SQLite`, `ReportLab`).",
    ],
    responsesEn: [
      "Amine has completed several impactful software development internships 💼:\n\n🏙️ **June 2026 — Full Stack Developer Intern**\n*Urban Agency of Khénifra*\n• Designed and built an intelligent urban planning decision-support chatbot powered by AI (MistralAI).\n• Created an admin portal for real-time monitoring and management (`Next.js`, `React`, `FastAPI`, `PostgreSQL`).\n\n🏥 **April – May 2025 — Web Developer Intern**\n*Provincial Health Delegation, Khénifra*\n• Developed a web platform for managing and monitoring social services (`Next.js`, `TypeScript`, `Spring Boot`, `MySQL`).\n\n🏫 **May 2024 — Python Developer Intern**\n*Provincial Directorate of National Education, Khénifra*\n• Built a desktop Python app for school management and automated PDF report generation (`Python`, `Tkinter`, `SQLite`, `ReportLab`).",
    ],
    suggestions: ["Ses projets", "Ses compétences", "Contact"],
    suggestionsEn: ["His projects", "His skills", "Contact"],
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
    patternsEn: [
      ["interests"],
      ["interest"],
      ["passions"],
      ["passion"],
      ["hobbies"],
      ["what", "does", "he", "like"],
      ["fields"],
      ["domains"],
    ],
    responses: [
      "Les domaines d'expertise et centres d'intérêt d'Amine sont 🎯 :\n\n🌐 **Analyse & Conception des Systèmes d'Information**\n🏗️ **Architecture logicielle & Design Patterns**\n⚡ **Développement Full Stack moderne (Web & Mobile)**\n🗄️ **Modélisation & optimisation des bases de données**\n🗺️ **Applications géospatiales & Outils décisionnels**\n🔒 **Conception d'APIs REST sécurisées**",
    ],
    responsesEn: [
      "Amine's core areas of expertise and passion include 🎯:\n\n🌐 **Information Systems Analysis & Design**\n🏗️ **Software Architecture & Design Patterns**\n⚡ **Modern Full Stack Development (Web & Mobile)**\n🗄️ **Database Modeling & Performance Optimization**\n🗺️ **Geospatial Applications & Decision-Support Tools**\n🔒 **Secure RESTful API Design**",
    ],
    suggestions: ["Ses compétences techniques", "Ses projets", "Sa formation"],
    suggestionsEn: ["His technical skills", "His projects", "His education"],
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
    patternsEn: [
      ["skill"],
      ["skills"],
      ["tech", "stack"],
      ["technologies"],
      ["technology"],
      ["stack"],
      ["abilities"],
      ["tools"],
      ["what", "can", "he", "do"],
    ],
    responses: [
      "Voici un aperçu de la stack technique d'Amine 💻 :\n\n🔹 **Langages** : HTML (Expert), CSS (Expert), JavaScript (Avancé), Java, C, SQL, Python (Intermédiaire), PHP\n🔹 **Frameworks & Libs** : React (Avancé), Next.js, Git / GitHub (Intermédiaire), Spring Boot, Tailwind CSS, FastAPI\n🔹 **Langues parlées** : Arabe (Maternelle), Anglais (Courant), Français (Courant)\n\nChaque technologie de son portfolio renvoie vers son site officiel !",
    ],
    responsesEn: [
      "Here is an overview of Amine's technical stack 💻:\n\n🔹 **Languages**: HTML (Expert), CSS (Expert), JavaScript (Advanced), Java, C, SQL, Python (Intermediate), PHP\n🔹 **Frameworks & Libs**: React (Advanced), Next.js, Git / GitHub (Intermediate), Spring Boot, Tailwind CSS, FastAPI\n🔹 **Spoken Languages**: Arabic (Native), English (Fluent), French (Fluent)\n\nEvery technology in his portfolio links to its official documentation!",
    ],
    suggestions: ["Frontend ?", "Backend ?", "Ses projets"],
    suggestionsEn: ["Frontend?", "Backend?", "His projects"],
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
    patternsEn: [
      ["frontend"],
      ["front-end"],
      ["front", "end"],
      ["react"],
      ["nextjs"],
      ["next.js"],
      ["tailwind"],
      ["ui"],
      ["user", "interface"],
      ["css"],
      ["html"],
      ["javascript"],
      ["js"],
    ],
    responses: [
      "Côté **Frontend**, Amine maîtrise 🎨 :\n\n⚛️ **React** — Niveau Avancé (85%)\n⚡ **Next.js** — Niveau Intermédiaire (70%)\n📜 **JavaScript** — Niveau Avancé (85%)\n📄 **HTML / CSS** — Niveau Expert (95–100%)\n🎨 **Tailwind CSS** — Conception d'interfaces réactives et soignées\n\nIl privilégie les interfaces fluides, ergonomiques, responsives et accessibles !",
    ],
    responsesEn: [
      "On the **Frontend** side, Amine is proficient in 🎨:\n\n⚛️ **React** — Advanced Level (85%)\n⚡ **Next.js** — Intermediate Level (70%)\n📜 **JavaScript** — Advanced Level (85%)\n📄 **HTML / CSS** — Expert Level (95–100%)\n🎨 **Tailwind CSS** — Crafting responsive, modern, and polished UIs\n\nHe emphasizes fluid, accessible, and user-centric interfaces!",
    ],
    suggestions: ["Backend ?", "Ses projets", "Ses stages"],
    suggestionsEn: ["Backend?", "His projects", "His internships"],
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
    patternsEn: [
      ["backend"],
      ["back-end"],
      ["back", "end"],
      ["spring"],
      ["spring", "boot"],
      ["fastapi"],
      ["server"],
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
    responsesEn: [
      "On the **Backend & Architecture** side, Amine works with ⚙️:\n\n☕ **Java & Spring Boot** — Architecting robust enterprise systems and REST APIs\n⚡ **FastAPI (Python)** — High-performance async APIs and AI model integration\n🐍 **Python** — Scripting, data processing, Tkinter, and automation\n🐘 **PHP** — Web backend development\n⚙️ **C** — Systems programming and advanced algorithms",
    ],
    suggestions: ["Bases de données ?", "Frontend ?", "Ses projets"],
    suggestionsEn: ["Databases?", "Frontend?", "His projects"],
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
    patternsEn: [
      ["database"],
      ["databases"],
      ["sql"],
      ["postgresql"],
      ["mysql"],
      ["mariadb"],
      ["sqlite"],
      ["data", "modeling"],
      ["merise"],
      ["uml"],
    ],
    responses: [
      "Pour les **Bases de Données & Modélisation**, Amine utilise 🗄️ :\n\n🐘 **PostgreSQL** — Utilisé notamment pour *Urbanisme Assistant*\n🗄️ **MySQL / MariaDB** — Pour les plateformes web et services sociaux\n📦 **SQLite** — Pour les applications desktop et outils locaux\n📐 **UML & Merise** — Conception rigoureuse des schémas relationnels et modèles de données",
    ],
    responsesEn: [
      "For **Databases & Modeling**, Amine leverages 🗄️:\n\n🐘 **PostgreSQL** — Key database for *Urban Planning Assistant*\n🗄️ **MySQL / MariaDB** — Powering web applications and social platforms\n📦 **SQLite** — For desktop apps and lightweight local storage\n📐 **UML & Merise** — Rigorous relational schema design and entity modeling",
    ],
    suggestions: ["Ses projets", "Backend ?", "Frontend ?"],
    suggestionsEn: ["His projects", "Backend?", "Frontend?"],
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
    patternsEn: [
      ["languages", "spoken"],
      ["languages"],
      ["language"],
      ["speak"],
      ["speaks"],
      ["arabic"],
      ["french"],
      ["english"],
      ["multilingual"],
      ["polyglot"],
    ],
    responses: [
      "Amine est polyglotte et parle **3 langues** 🌍 :\n\n🇲🇦 **Arabe** — Langue maternelle\n🇬🇧 **Anglais** — Courant\n🇫🇷 **Français** — Courant",
    ],
    responsesEn: [
      "Amine is multilingual and speaks **3 languages** 🌍:\n\n🇲🇦 **Arabic** — Native language\n🇬🇧 **English** — Fluent\n🇫🇷 **French** — Fluent",
    ],
    suggestions: ["Ses compétences techniques", "Ses projets", "Contact"],
    suggestionsEn: ["His technical skills", "His projects", "Contact"],
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
    patternsEn: [
      ["project"],
      ["projects"],
      ["portfolio"],
      ["works"],
      ["applications"],
      ["apps"],
      ["what", "did", "he", "build"],
    ],
    responses: [
      "Amine a développé **7 projets complets** dans différents domaines 🚀 :\n\n1. 🏙️ **Urbanisme Assistant** — Plateforme d'analyse territoriale avec IA & démo vidéo\n2. 🤝 **Social Services Platform** — Gestion sécurisée des services sociaux\n3. 🎓 **Edu Events** — Billetterie en ligne et gestion d'événements\n4. 🧺 **Laundry App** — App mobile de blanchisserie avec scan QR\n5. ♟️ **Chess Analyser** — Analyse de parties d'échecs avec moteur Stockfish\n6. 🏫 **Gestion d'Établissement** — Gestion scolaire desktop & relevés PDF\n7. 🏋️ **Gym Manager** — Gestion complète de salle de sport en WPF / C#\n\nSur quel projet voulez-vous en savoir plus ?",
    ],
    responsesEn: [
      "Amine has built **7 complete projects** across various domains 🚀:\n\n1. 🏙️ **Urban Planning Assistant** — Territorial analysis platform with AI & video demo\n2. 🤝 **Social Services Platform** — Secure social assistance management\n3. 🎓 **Edu Events** — Online educational ticketing & event management\n4. 🧺 **Laundry App** — Mobile laundry management with QR scan\n5. ♟️ **Chess Analyser** — Chess analysis tool powered by Stockfish\n6. 🏫 **School Management** — Desktop student records & automated PDF reports\n7. 🏋️ **Gym Manager** — Full fitness center management in WPF / C#\n\nWhich project would you like to explore?",
    ],
    suggestions: ["Urbanisme Assistant", "Social Services Platform", "Chess Analyser", "Gym Manager"],
    suggestionsEn: ["Urban Planning Assistant", "Social Services Platform", "Chess Analyser", "Gym Manager"],
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
    patternsEn: [
      ["urban", "planning"],
      ["urbanisme"],
      ["territorial", "analysis"],
      ["mistral"],
      ["mistralai"],
      ["urban", "assistant"],
    ],
    responses: [
      "🏙️ **Urbanisme Assistant** est une plateforme intelligente d'analyse territoriale destinée à accompagner les collectivités et acteurs de l'aménagement.\n\n✨ **Fonctionnalités clés** :\n• Analyse de données territoriales\n• Consultation documentaire automatisée\n• Chatbot spécialisé avec MistralAI\n• Outils d'aide à la décision\n\n🛠️ **Technologies** : Next.js, React, FastAPI, MistralAI, PostgreSQL\n📺 **Démo vidéo** : https://youtu.be/gHXkbftqZeI",
    ],
    responsesEn: [
      "🏙️ **Urban Planning Assistant** is an intelligent territorial analysis platform built to support municipalities and urban planners.\n\n✨ **Key Highlights**:\n• Territorial data analysis & spatial metrics\n• Automated regulatory document consultation\n• Specialized conversational AI with MistralAI\n• Interactive decision-support dashboard\n\n🛠️ **Technologies**: Next.js, React, FastAPI, MistralAI, PostgreSQL\n📺 **Video Demo**: https://youtu.be/gHXkbftqZeI",
    ],
    suggestions: ["Social Services Platform", "Autres projets", "Ses compétences"],
    suggestionsEn: ["Social Services Platform", "Other projects", "His skills"],
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
    patternsEn: [
      ["social", "services"],
      ["social", "service"],
      ["social", "platform"],
      ["health", "platform"],
    ],
    responses: [
      "🤝 **Social Services Platform** est une plateforme web dédiée à la gestion et à l'accès simplifié aux services sociaux.\n\n✨ **Fonctionnalités clés** :\n• Authentification sécurisée multi-rôles (Spring Security)\n• Gestion et suivi des demandes d'aide\n• Tableau de bord administratif interactif\n• Suivi des dossiers en temps réel\n\n🛠️ **Technologies** : Next.js, React, TypeScript, Spring Boot, Spring Security, MySQL",
    ],
    responsesEn: [
      "🤝 **Social Services Platform** is a web portal dedicated to streamlining social assistance requests and management.\n\n✨ **Key Highlights**:\n• Role-based authentication & authorization (Spring Security)\n• Assistance request submission and real-time tracking\n• Interactive admin dashboard\n• Secure data management\n\n🛠️ **Technologies**: Next.js, React, TypeScript, Spring Boot, Spring Security, MySQL",
    ],
    suggestions: ["Urbanisme Assistant", "Edu Events", "Autres projets"],
    suggestionsEn: ["Urban Planning Assistant", "Edu Events", "Other projects"],
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
    patternsEn: [
      ["edu", "events"],
      ["edu", "event"],
      ["ticketing"],
      ["event", "management"],
      ["events"],
    ],
    responses: [
      "🎓 **Edu Events** est une plateforme web complète de gestion d'événements éducatifs et de billetterie en ligne.\n\n✨ **Fonctionnalités clés** :\n• Création et publication d'événements\n• Billetterie électronique en ligne\n• Gestion et suivi des inscriptions des participants\n\n🛠️ **Technologies** : HTML, CSS, JavaScript, PHP, MariaDB",
    ],
    responsesEn: [
      "🎓 **Edu Events** is a complete web platform for managing educational events and digital ticketing.\n\n✨ **Key Highlights**:\n• Event creation, publishing, and scheduling\n• Online e-ticketing and attendee registration\n• Participant tracking and management\n\n🛠️ **Technologies**: HTML, CSS, JavaScript, PHP, MariaDB",
    ],
    suggestions: ["Laundry App", "Chess Analyser", "Autres projets"],
    suggestionsEn: ["Laundry App", "Chess Analyser", "Other projects"],
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
    patternsEn: [
      ["laundry"],
      ["laundry", "app"],
      ["dry", "cleaner"],
      ["qr", "code"],
      ["android"],
    ],
    responses: [
      "🧺 **Laundry App** est une application mobile de gestion de blanchisserie avec suivi numérique des commandes.\n\n✨ **Fonctionnalités clés** :\n• Suivi en temps réel des commandes et étapes de traitement\n• Scan de QR Code pour vérification rapide\n• Notifications push en direct via Firebase\n\n🛠️ **Technologies** : Android Java, Firebase, Retrofit, Spring Boot, MySQL",
    ],
    responsesEn: [
      "🧺 **Laundry App** is a native Android mobile application for laundry operations and digital order tracking.\n\n✨ **Key Highlights**:\n• Real-time order progress tracking through each processing stage\n• QR code scanning for quick item verification\n• Live push notifications via Firebase\n\n🛠️ **Technologies**: Android Java, Firebase, Retrofit, Spring Boot, MySQL",
    ],
    suggestions: ["Chess Analyser", "Gym Manager", "Contact"],
    suggestionsEn: ["Chess Analyser", "Gym Manager", "Contact"],
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
    patternsEn: [
      ["chess"],
      ["chess", "analyser"],
      ["stockfish"],
      ["chess", "game"],
      ["javafx"],
    ],
    responses: [
      "♟️ **Chess Analyser** est un outil desktop interactif d'analyse de parties d'échecs intégrant le moteur Stockfish.\n\n✨ **Fonctionnalités clés** :\n• Évaluation tactique et stratégique des positions\n• Suggestions des meilleurs coups calculés par Stockfish\n• Statistiques de performance et historique des parties\n\n🛠️ **Technologies** : JavaFX, FXML, Maven, Stockfish, SQLite",
    ],
    responsesEn: [
      "♟️ **Chess Analyser** is an interactive desktop chess analysis tool integrating the Stockfish chess engine.\n\n✨ **Key Highlights**:\n• Deep tactical and strategic position evaluation\n• Best move recommendations calculated by Stockfish\n• Game history tracking and performance statistics\n\n🛠️ **Technologies**: JavaFX, FXML, Maven, Stockfish, SQLite",
    ],
    suggestions: ["Gym Manager", "Gestion d'Établissement", "Autres projets"],
    suggestionsEn: ["Gym Manager", "School Management", "Other projects"],
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
    patternsEn: [
      ["school", "management"],
      ["student", "management"],
      ["gestion", "etablissement"],
      ["report", "cards"],
      ["pdf", "generation"],
      ["tkinter"],
    ],
    responses: [
      "🏫 **Gestion d'Établissement** est une application desktop Python pour la gestion scolaire.\n\n✨ **Fonctionnalités clés** :\n• Gestion des fiches étudiants et filières\n• Suivi des notes et calcul des moyennes\n• Tableau de bord interactif\n• Génération automatisée des relevés de notes au format PDF\n\n🛠️ **Technologies** : Python, Tkinter, SQLite, ReportLab, Matplotlib",
    ],
    responsesEn: [
      "🏫 **School Management** is a Python desktop software designed for academic administration.\n\n✨ **Key Highlights**:\n• Student profiles and academic program management\n• Grade entry and automated GPA computation\n• Interactive administrative dashboard\n• Automated PDF report card generation\n\n🛠️ **Technologies**: Python, Tkinter, SQLite, ReportLab, Matplotlib",
    ],
    suggestions: ["Gym Manager", "Urbanisme Assistant", "Contact"],
    suggestionsEn: ["Gym Manager", "Urban Planning Assistant", "Contact"],
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
    patternsEn: [
      ["gym"],
      ["gym", "manager"],
      ["fitness"],
      ["memberships"],
      ["wpf"],
      ["c#"],
      ["csharp"],
      ["dotnet"],
      [".net"],
    ],
    responses: [
      "🏋️ **Gym Manager** est une application desktop WPF moderne et performante pour la gestion d'une salle de sport.\n\n✨ **Fonctionnalités clés** :\n• Gestion des membres et renouvellements d'abonnements\n• Suivi des paiements et tableau de bord financier\n• Architecture logicielle Clean et maintenable\n\n🛠️ **Technologies** : C#, WPF, .NET 10, SQLite, EF Core",
    ],
    responsesEn: [
      "🏋️ **Gym Manager** is a modern desktop WPF application engineered for fitness center management.\n\n✨ **Key Highlights**:\n• Member management and automated subscription renewals\n• Payment tracking and financial analytics dashboard\n• Clean, maintainable software architecture\n\n🛠️ **Technologies**: C#, WPF, .NET 10, SQLite, EF Core",
    ],
    suggestions: ["Urbanisme Assistant", "Social Services Platform", "Contact"],
    suggestionsEn: ["Urban Planning Assistant", "Social Services Platform", "Contact"],
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
    patternsEn: [
      ["video"],
      ["demo"],
      ["youtube"],
      ["watch", "demo"],
      ["preview"],
    ],
    responses: [
      "📺 Une démo vidéo complète est disponible pour le projet **Urbanisme Assistant** !\n\nVous pouvez la visionner directement sur YouTube ici :\n👉 **https://youtu.be/gHXkbftqZeI**\n\nou en cliquant sur le bouton de lecture dans la section Projets du portfolio !",
    ],
    responsesEn: [
      "📺 A comprehensive video demo is available for the **Urban Planning Assistant** project!\n\nYou can watch it directly on YouTube here:\n👉 **https://youtu.be/gHXkbftqZeI**\n\nor by clicking the play button in the Projects section on the portfolio!",
    ],
    suggestions: ["Urbanisme Assistant", "Tous les projets", "Contact"],
    suggestionsEn: ["Urban Planning Assistant", "All projects", "Contact"],
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
    patternsEn: [
      ["contact"],
      ["reach"],
      ["get", "in", "touch"],
      ["email"],
      ["mail"],
      ["message"],
      ["send", "message"],
      ["phone"],
      ["write"],
    ],
    responses: [
      "Vous pouvez joindre Amine Rachidi par plusieurs canaux 📬 :\n\n📧 **Email** : rachidiamine906@gmail.com\n💼 **LinkedIn** : linkedin.com/in/amine-rachidi-1b9938386\n🐙 **GitHub** : github.com/aminefeitan\n📸 **Instagram** : @aminefeitan\n📘 **Facebook** : disponible sur le portfolio\n\nVous pouvez également envoyer un message direct via le **formulaire de contact** en bas de page !",
    ],
    responsesEn: [
      "You can get in touch with Amine Rachidi through several channels 📬:\n\n📧 **Email**: rachidiamine906@gmail.com\n💼 **LinkedIn**: linkedin.com/in/amine-rachidi-1b9938386\n🐙 **GitHub**: github.com/aminefeitan\n📸 **Instagram**: @aminefeitan\n📘 **Facebook**: available on the portfolio\n\nYou can also send a direct message using the **contact form** at the bottom of the page!",
    ],
    suggestions: ["Ses projets", "Ses compétences", "Télécharger son CV"],
    suggestionsEn: ["His projects", "His skills", "Download his CV"],
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
    patternsEn: [
      ["github"],
      ["git"],
      ["source", "code"],
      ["repo"],
      ["repositories"],
      ["code"],
    ],
    responses: [
      "Retrouvez tous les repositories et projets open source d'Amine sur son GitHub 🐙 :\n👉 **https://github.com/aminefeitan**",
    ],
    responsesEn: [
      "Explore all of Amine's open source repositories and projects on GitHub 🐙:\n👉 **https://github.com/aminefeitan**",
    ],
    suggestions: ["Ses projets", "LinkedIn ?", "Contact"],
    suggestionsEn: ["His projects", "LinkedIn?", "Contact"],
  },
  {
    id: "linkedin",
    category: "contact",
    patterns: [
      ["linkedin"],
      ["reseau", "professionnel"],
      ["profil", "professionnel"],
    ],
    patternsEn: [
      ["linkedin"],
      ["professional", "profile"],
      ["network"],
    ],
    responses: [
      "Connectez-vous avec Amine sur LinkedIn 💼 :\n👉 **https://linkedin.com/in/amine-rachidi-1b9938386**",
    ],
    responsesEn: [
      "Connect with Amine on LinkedIn 💼:\n👉 **https://linkedin.com/in/amine-rachidi-1b9938386**",
    ],
    suggestions: ["GitHub ?", "Email ?", "Ses projets"],
    suggestionsEn: ["GitHub?", "Email?", "His projects"],
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
    patternsEn: [
      ["social", "media"],
      ["social", "networks"],
      ["instagram"],
      ["facebook"],
      ["social"],
    ],
    responses: [
      "Amine est présent sur plusieurs réseaux sociaux 🌐 :\n\n💼 **LinkedIn** : linkedin.com/in/amine-rachidi-1b9938386\n🐙 **GitHub** : github.com/aminefeitan\n📸 **Instagram** : @aminefeitan\n📘 **Facebook** : facebook.com (lien sur le portfolio)",
    ],
    responsesEn: [
      "Amine is active across several platforms 🌐:\n\n💼 **LinkedIn**: linkedin.com/in/amine-rachidi-1b9938386\n🐙 **GitHub**: github.com/aminefeitan\n📸 **Instagram**: @aminefeitan\n📘 **Facebook**: facebook.com (link on the portfolio)",
    ],
    suggestions: ["Contact", "Ses projets"],
    suggestionsEn: ["Contact", "His projects"],
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
    patternsEn: [
      ["cv"],
      ["resume"],
      ["curriculum", "vitae"],
      ["download", "cv"],
      ["download", "resume"],
      ["pdf", "cv"],
      ["cv", "file"],
    ],
    responses: [
      "Le CV d'Amine Rachidi est disponible au téléchargement 📄 !\n\nVous pouvez le télécharger directement en cliquant sur le bouton **\"Télécharger CV\"** dans l'en-tête d'accueil du portfolio ou via le lien direct `/cv-amine-rachidi.pdf`.",
    ],
    responsesEn: [
      "Amine Rachidi's CV / Resume is available for download 📄!\n\nYou can download it directly by clicking the **\"Download CV\"** button in the hero header or via the direct link `/cv-amine-rachidi.pdf`.",
    ],
    suggestions: ["Ses compétences", "Ses stages", "Contact"],
    suggestionsEn: ["His skills", "His internships", "Contact"],
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
    patternsEn: [
      ["available"],
      ["availability"],
      ["hire"],
      ["hiring"],
      ["job"],
      ["opportunity"],
      ["opportunities"],
      ["internship", "offer"],
      ["recruit"],
      ["recruiting"],
      ["employment"],
      ["freelance"],
      ["collaboration"],
      ["open", "to", "work"],
    ],
    responses: [
      "Amine est actuellement **disponible pour des opportunités** (stages, projets innovants ou opportunités professionnelles) 🟢 !\n\nN'hésitez pas à lui écrire par email à **rachidiamine906@gmail.com** ou via le formulaire de contact pour échanger sur vos projets.",
    ],
    responsesEn: [
      "Amine is currently **open to opportunities** (internships, innovative projects, or full-time opportunities) 🟢!\n\nFeel free to email him directly at **rachidiamine906@gmail.com** or use the contact form to discuss potential collaborations.",
    ],
    suggestions: ["Contact", "Ses compétences", "Ses projets"],
    suggestionsEn: ["Contact", "His skills", "His projects"],
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
    patternsEn: [
      ["chatbot"],
      ["robot"],
      ["bot"],
      ["ai", "assistant"],
      ["artificial", "intelligence"],
      ["how", "do", "you", "work"],
      ["who", "made", "you"],
      ["who", "created", "you"],
    ],
    responses: [
      "Je suis l'assistant interactif du portfolio d'Amine Rachidi 🤖 !\n\nJe fonctionne avec un moteur de recherche contextuel ultra-rapide côté client. Je connais l'ensemble du profil d'Amine : son parcours à l'ENSIASD, ses stages, ses 7 projets majeurs, sa stack technique et ses moyens de contact.",
    ],
    responsesEn: [
      "I am the interactive assistant for Amine Rachidi's portfolio 🤖!\n\nI run on a lightning-fast client-side contextual search engine. I know all about Amine's background: his software engineering studies at ENSIASD, his internships, his 7 flagship projects, his technical stack, and how to reach him.",
    ],
    suggestions: ["Qui est Amine ?", "Ses compétences", "Ses projets"],
    suggestionsEn: ["Who is Amine?", "His skills", "His projects"],
  },

  // ── Fallback ──
  {
    id: "fallback",
    category: "fallback",
    patterns: [],
    patternsEn: [],
    responses: [
      "Hmm, je ne suis pas certain d'avoir bien compris 🤔. Posez-moi des questions sur :\n\n• La **formation** d'Amine (ENSIASD, EST, Bac)\n• Ses **stages & expériences** professionnelles\n• Ses **compétences** (React, Next.js, FastAPI, Spring Boot, Python...)\n• Ses **7 projets** réalisés\n• Comment le **contacter**",
      "Je n'ai pas trouvé de correspondance exacte 😅. Pouvez-vous reformuler ? Je peux vous renseigner sur le parcours, les stages, les projets ou les coordonnées d'Amine !",
      "Cette question dépasse mes connaissances actuelles 🙈. Mais je peux vous guider à travers tout le portfolio ! Choisissez une suggestion ci-dessous 👇",
    ],
    responsesEn: [
      "Hmm, I'm not sure I understood that 🤔. You can ask me about:\n\n• Amine's **education** (ENSIASD, EST, Baccalaureate)\n• His **internships & work experience**\n• His **technical skills** (React, Next.js, FastAPI, Spring Boot, Python...)\n• His **7 featured projects**\n• How to **contact** him",
      "I couldn't find an exact match 😅. Could you rephrase? I can tell you about Amine's background, internships, projects, or contact info!",
      "That question is currently beyond my knowledge base 🙈. But I can guide you through the entire portfolio! Pick a suggestion below 👇",
    ],
    suggestions: ["Qui est Amine ?", "Ses expériences & stages", "Ses projets", "Contact"],
    suggestionsEn: ["Who is Amine?", "His internships & experience", "His projects", "Contact"],
    priority: -1,
  },
];
