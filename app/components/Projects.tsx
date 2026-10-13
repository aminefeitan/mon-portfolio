"use client";

import Image from "next/image";
import { Activity, Play, X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "@/app/lib/i18n";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/**
 * Extracts the YouTube video ID from various URL formats.
 */
function getYouTubeId(url: string): string | null {
  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

/* ─── Video Modal Component ──────────────────────────────────── */
function VideoModal({
  videoUrl,
  projectTitle,
  onClose,
  isDark,
  demoLabel,
}: {
  videoUrl: string;
  projectTitle: string;
  onClose: () => void;
  isDark: boolean;
  demoLabel: string;
}) {
  const videoId = getYouTubeId(videoUrl);
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!videoId) return null;

  return (
    <div
      className="video-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="video-modal-content">
        {/* Header */}
        <div className="video-modal-header">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className={`font-bold text-lg m-0 ${isDark ? "text-white" : "text-slate-900"}`}>{projectTitle}</h3>
            <span className={`text-[0.7rem] font-semibold uppercase tracking-widest ${isDark ? "text-cyan-300" : "text-cyan-600"}`}>
              {demoLabel}
            </span>
          </div>
          <button
            onClick={onClose}
            className="video-modal-close"
            aria-label="Fermer la vidéo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video iframe */}
        <div className="video-modal-player">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={`Démo ${projectTitle}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-iframe"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Video Thumbnail Component ──────────────────────────────── */
function VideoThumbnail({
  videoUrl,
  projectTitle,
  onPlay,
  demoLabel,
}: {
  videoUrl: string;
  projectTitle: string;
  onPlay: () => void;
  demoLabel: string;
}) {
  const videoId = getYouTubeId(videoUrl);
  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <button
      onClick={onPlay}
      className="video-thumbnail-container"
      aria-label={`Voir la démo vidéo de ${projectTitle}`}
    >
      {/* Thumbnail image */}
      <Image
        src={thumbnailUrl}
        alt={`Aperçu vidéo ${projectTitle}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />

      {/* Gradient overlay */}
      <div className="video-thumbnail-overlay" />

      {/* Play button */}
      <div className="video-play-btn">
        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
      </div>

      {/* Label */}
      <div className="video-label">
        <Play className="w-3 h-3" />
        <span>{demoLabel}</span>
      </div>
    </button>
  );
}

/* ─── Main Projects Component ────────────────────────────────── */
export default function Projects() {
  const { theme } = useTheme();
  const { t, isFrench } = useTranslation();
  const isDark = theme === "dark";

  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const openVideo = useCallback((url: string, title: string) => {
    setActiveVideo({ url, title });
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  const projects = [
    {
      title: "Urbanisme Assistant",
      logo: "/assistant-urbanisme-v2.png",
      emoji: "🏙️",
      description: isFrench
        ? "Plateforme intelligente d'analyse, de conception et de modélisation territoriale destinée à accompagner les collectivités et les acteurs de l'aménagement."
        : "Intelligent territorial analysis and spatial modeling platform designed to assist municipalities and urban planning stakeholders with AI-driven document insights.",
      features: isFrench
        ? ["Analyse territoriale", "Consultation documentaire", "Chatbot spécialisé", "Aide à la décision"]
        : ["Territorial data analysis", "Regulatory document search", "Specialized AI chatbot", "Decision-making analytics"],
      technologies: ["Next.js", "React", "FastAPI", "MistralAI", "PostgreSQL"],
      repo: "urbanisme-assistant",
      videoUrl: "https://youtu.be/gHXkbftqZeI",
    },
    {
      title: "Social Services Platform",
      logo: "/social-services-v2.png",
      emoji: "🤝",
      description: isFrench
        ? "Plateforme numérique dédiée à la gestion et à l'accès aux services sociaux, avec authentification sécurisée et tableau de bord complet."
        : "Comprehensive digital platform for managing and accessing public social welfare services, featuring secure role-based authentication and real-time case tracking dashboards.",
      features: isFrench
        ? ["Authentification sécurisée", "Gestion des demandes", "Tableau de bord", "Suivi des dossiers"]
        : ["Role-based security", "Assistance request workflow", "Administrative dashboard", "Case status tracking"],
      technologies: ["Next.js", "React", "TypeScript", "Spring Boot", "Spring Security", "MySQL"],
      repo: "social-services",
      videoUrl: "",
    },
    {
      title: "Edu Events",
      emoji: "🎓",
      logo: "/edu-events.png",
      description: isFrench
        ? "Plateforme de gestion d'événements éducatifs et de billetterie en ligne avec gestion complète des participants."
        : "Educational event management and online ticketing platform with integrated participant registration and attendee tracking.",
      features: isFrench
        ? ["Création d'événements", "Billetterie en ligne", "Gestion des participants"]
        : ["Event publishing", "Online e-ticketing", "Participant management"],
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MariaDB"],
      repo: "edu-events",
      videoUrl: "",
    },
    {
      title: "Laundry App",
      logo: "/laundry-app.jpeg",
      emoji: "🧺",
      description: isFrench
        ? "Application mobile de gestion de blanchisserie permettant le suivi numérique des commandes, scan QR et notifications temps réel."
        : "Mobile laundry services management application with end-to-end order processing, QR code scanning, and real-time push notifications.",
      features: isFrench
        ? ["Gestion des commandes", "Suivi du traitement", "Scan QR Code", "Notifications Firebase"]
        : ["Order processing", "Status updates", "QR code verification", "Firebase push alerts"],
      technologies: ["Android Java", "Firebase", "Retrofit", "Spring Boot", "MySQL"],
      repo: "laundry-app",
      videoUrl: "",
    },
    {
      title: "Chess Analyser",
      emoji: "♟️",
      logo: "/chess-analyser.png",
      description: isFrench
        ? "Outil d'analyse de parties d'échecs avec moteur Stockfish intégré — détection des meilleures stratégies et statistiques avancées."
        : "Interactive chess game analysis desktop tool powered by the Stockfish engine — providing deep tactical evaluation, move suggestions, and performance analytics.",
      features: isFrench
        ? ["Analyse de parties", "Suggestions de coups", "Statistiques avancées"]
        : ["Deep move evaluation", "Best continuation engine", "Performance statistics"],
      technologies: ["JavaFX", "FXML", "Maven", "Stockfish", "SQLite"],
      repo: "chess-analyser",
      videoUrl: "",
    },
    {
      title: "Gestion d'Établissement",
      emoji: "🏫",
      logo: "/gestion-etablissement.png",
      description: isFrench
        ? "Application de bureau pour la gestion des étudiants, des notes et des branches avec génération de relevés de notes en PDF."
        : "School administration and student records management desktop application featuring automated grade tracking and official PDF report card generation.",
      features: isFrench
        ? ["Gestion des étudiants", "Suivi des notes", "Tableau de bord interactif", "Génération de PDF"]
        : ["Student profiles", "Academic grading", "Interactive analytics", "Automated PDF reports"],
      technologies: ["Python", "Tkinter", "SQLite", "ReportLab", "Matplotlib"],
      repo: "gestion-etablissement",
      videoUrl: "",
    },
    {
      title: "Gym Manager",
      emoji: "🏋️",
      logo: "/gym-manager.png",
      description: isFrench
        ? "Application de bureau WPF moderne et réactive pour la gestion complète d'une salle de sport (membres, abonnements, revenus)."
        : "High-performance WPF desktop application for comprehensive gym facility management (member subscriptions, attendance, and revenue analytics).",
      features: isFrench
        ? ["Gestion des membres", "Suivi des abonnements", "Tableau de bord", "Architecture Clean"]
        : ["Membership lifecycle", "Subscription monitoring", "Financial dashboard", "Clean Architecture"],
      technologies: ["C#", "WPF", ".NET 10", "SQLite", "EF Core"],
      repo: "gym_manager",
      videoUrl: "",
    },
  ];

  return (
    <>
      <section id="projects" className="py-20 md:py-32 relative overflow-hidden section-divider">
        {/* Background orbs */}
        <div className="orb w-[500px] h-[500px] bg-cyan-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
        <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

        <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16 animate-fade-up">
            <h2 className="section-title mb-4">{t("projects.title")}</h2>
            <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {t("projects.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glass flex flex-col group h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

                <div className="p-5 md:p-8 flex flex-col h-full gap-4 md:gap-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 overflow-hidden relative transition-all duration-300 ${isDark ? "bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20" : "bg-cyan-100/60 border border-cyan-200/40 group-hover:bg-cyan-200/60"} group-hover:scale-110`}>
                      {project.logo ? (
                        <Image
                          src={project.logo}
                          alt={`${project.title} logo`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className={`drop-shadow-md ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>{project.emoji}</span>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold m-0 leading-tight transition-colors ${isDark ? "text-white group-hover:text-cyan-300" : "text-slate-900 group-hover:text-cyan-600"}`}>
                        {project.title}
                      </h3>
                      <p className={`text-[0.75rem] mt-1 font-semibold tracking-wider uppercase ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
                        {project.technologies[0]}
                      </p>
                    </div>
                  </div>

                  {/* Video Preview */}
                  {project.videoUrl && (
                    <VideoThumbnail
                      videoUrl={project.videoUrl}
                      projectTitle={project.title}
                      onPlay={() => openVideo(project.videoUrl, project.title)}
                      demoLabel={t("projects.videoDemoLabel")}
                    />
                  )}

                  {/* Description */}
                  <p className={`text-[0.95rem] leading-relaxed m-0 grow ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {project.description}
                  </p>

                  {/* Features (Compact list) */}
                  <div className={`flex flex-col gap-2 rounded-xl p-4 border transition-colors ${isDark ? "bg-cyan-500/5 border-cyan-500/10 group-hover:border-cyan-500/20" : "bg-cyan-50/50 border-cyan-200/30 group-hover:border-cyan-300/50"}`}>
                    <p className={`text-[0.72rem] font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {t("projects.keyPoints")}
                    </p>
                    <ul className="space-y-1.5 m-0 p-0 list-none">
                      {project.features.slice(0, 3).map((f, i) => (
                        <li key={i} className={`flex items-center gap-2 text-[0.85rem] ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          <Activity className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                      {project.features.length > 3 && (
                        <li className={`text-[0.8rem] italic ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                          + {project.features.length - 3} {t("projects.andMore")}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-md text-[0.7rem] font-semibold border ${isDark ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300" : "bg-cyan-50 border-cyan-200/50 text-cyan-700"}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Repo link */}
                  {project.repo && (
                    <div className={`flex gap-3 mt-auto pt-4 border-t ${isDark ? "border-cyan-500/10" : "border-cyan-200/30"}`}>
                      <a
                        href={`https://github.com/aminefeitan/${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 no-underline ${isDark ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-white" : "bg-cyan-50/60 border-cyan-200/50 text-cyan-700 hover:bg-cyan-100 hover:border-cyan-300 hover:text-cyan-900"}`}
                      >
                        <GitHubIcon />
                        {t("projects.codeBtn")}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          videoUrl={activeVideo.url}
          projectTitle={activeVideo.title}
          onClose={closeVideo}
          isDark={isDark}
          demoLabel={t("projects.videoDemoLabel")}
        />
      )}
    </>
  );
}
