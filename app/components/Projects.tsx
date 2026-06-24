"use client";

import Image from "next/image";
import { ExternalLink, Activity, ArrowRight } from "lucide-react";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const projects = [
  {
    title: "Urbanisme Assistant",
    logo: "/assistant-urbanisme-v2.png",
    emoji: "🏙️",
    description:
      "Plateforme intelligente d'analyse, de conception et de modélisation territoriale destinée à accompagner les collectivités et les acteurs de l'aménagement.",
    features: ["Analyse territoriale", "Consultation documentaire", "Chatbot spécialisé", "Aide à la décision"],
    technologies: ["Next.js", "React", "FastAPI", "MistralAI", "PostgreSQL"],
    repos: { frontend: "urbanisme-assistant", backend: "urbanisme-assistant" },
  },
  {
    title: "Social Services Platform",
    logo: "/social-services-v2.png",
    emoji: "🤝",
    description:
      "Plateforme numérique dédiée à la gestion et à l'accès aux services sociaux, avec authentification sécurisée et tableau de bord complet.",
    features: ["Authentification sécurisée", "Gestion des demandes", "Tableau de bord", "Suivi des dossiers"],
    technologies: ["Next.js", "React", "TypeScript", "Spring Boot", "Spring Security", "MySQL"],
    repos: { frontend: "social-services-frontend", backend: "social-services-backend" },
  },
  {
    title: "Edu Events",
    emoji: "🎓",
    description:
      "Plateforme de gestion d'événements éducatifs et de billetterie en ligne avec gestion complète des participants.",
    features: ["Création d'événements", "Billetterie en ligne", "Gestion des participants"],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MariaDB"],
    repos: { frontend: "edu-events", backend: "edu-events" },
  },
  {
    title: "Laundry App",
    logo: "/laundry-app.jpeg",
    emoji: "🧺",
    description:
      "Application mobile de gestion de blanchisserie permettant le suivi numérique des commandes, scan QR et notifications temps réel.",
    features: ["Gestion des commandes", "Suivi du traitement", "Scan QR Code", "Notifications Firebase"],
    technologies: ["Android Java", "Firebase", "Retrofit", "Spring Boot", "MySQL"],
    repos: { frontend: "laundry-app-frontend", backend: "laundry-app-backend" },
  },
  {
    title: "Chess Analyser",
    emoji: "♟️",
    description:
      "Outil d'analyse de parties d'échecs avec moteur Stockfish intégré — détection des meilleures stratégies et statistiques avancées.",
    features: ["Analyse de parties", "Suggestions de coups", "Statistiques avancées"],
    technologies: ["JavaFX", "FXML", "Maven", "Stockfish", "SQLite"],
    repos: { frontend: "chess-analyser", backend: "chess-analyser" },
  },
  {
    title: "Gestion d'Établissement",
    emoji: "🏫",
    description:
      "Application de bureau pour la gestion des étudiants, des notes et des branches avec génération de relevés de notes en PDF.",
    features: ["Gestion des étudiants", "Suivi des notes", "Tableau de bord interactif", "Génération de PDF"],
    technologies: ["Python", "Tkinter", "SQLite", "ReportLab", "Matplotlib"],
    repos: { frontend: "gestion-etablissement", backend: "gestion-etablissement" },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden section-divider">
      {/* Unified Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="section-title mb-4">Mes Projets</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Une sélection de mes réalisations, illustrant mon expertise full-stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass flex flex-col group h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

              <div className="p-8 flex flex-col h-full gap-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl shrink-0 overflow-hidden relative group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                    {project.logo ? (
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="drop-shadow-md text-indigo-400">{project.emoji}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white m-0 leading-tight group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[0.75rem] text-indigo-400 mt-1 font-semibold tracking-wider uppercase">
                      {project.technologies[0]}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[0.95rem] text-slate-400 leading-relaxed m-0 grow">
                  {project.description}
                </p>

                {/* Features (Compact list) */}
                <div className="flex flex-col gap-2 bg-indigo-500/5 rounded-xl p-4 border border-indigo-500/10 group-hover:border-indigo-500/20 transition-colors">
                  <p className="text-[0.72rem] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Points Clés
                  </p>
                  <ul className="space-y-1.5 m-0 p-0 list-none">
                    {project.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-[0.85rem] text-slate-300">
                        <Activity className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-[0.8rem] text-slate-500 italic">
                        + {project.features.length - 3} autres...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-[0.7rem] font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Repo links */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-indigo-500/10">
                  {project.repos.frontend && (
                    <a
                      href={`https://github.com/aminefeitan/${project.repos.frontend}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-white transition-all duration-300 no-underline"
                    >
                      <GitHubIcon />
                      {project.repos.frontend === project.repos.backend ? "Code" : "Front"}
                    </a>
                  )}
                  {project.repos.backend && project.repos.backend !== project.repos.frontend && (
                    <a
                      href={`https://github.com/aminefeitan/${project.repos.backend}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-white transition-all duration-300 no-underline"
                    >
                      <GitHubIcon />
                      Backend
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
