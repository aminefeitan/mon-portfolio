"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, Building2, MapPin, Calendar } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "@/app/lib/i18n";

/* ── Types ───────────────────────────────────────────────────── */

interface TimelineEntry {
  id: string;
  type: "work" | "education";
  date: string;
  title: string;
  organization: string;
  location?: string;
  description: string[];
  technologies?: string[];
}

/* ── Timeline Card ──────────────────────────────────────────── */

function TimelineCard({
  entry,
  index,
  isDark,
  typeWorkLabel,
  typeEduLabel,
}: {
  entry: TimelineEntry;
  index: number;
  isDark: boolean;
  typeWorkLabel: string;
  typeEduLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isWork = entry.type === "work";
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <div
      ref={ref}
      className={`timeline-item ${visible ? "timeline-visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Dot on the line */}
      <div className={`timeline-dot ${isWork ? "work" : "edu"}`}>
        <Icon className="w-4 h-4" />
      </div>

      {/* Card */}
      <div className="glass timeline-card group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

        <div className="p-5 md:p-7 flex flex-col gap-3 relative z-10">
          {/* Date + Type Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 text-[0.75rem] font-semibold px-3 py-1 rounded-full border ${
                isWork
                  ? isDark
                    ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
                    : "bg-indigo-50 border-indigo-200/50 text-indigo-700"
                  : isDark
                    ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
                    : "bg-cyan-50 border-cyan-200/50 text-cyan-700"
              }`}
            >
              <Calendar className="w-3 h-3" />
              {entry.date}
            </span>
            <span
              className={`text-[0.7rem] font-bold uppercase tracking-widest ${
                isWork
                  ? isDark ? "text-indigo-400" : "text-indigo-600"
                  : isDark ? "text-cyan-400" : "text-cyan-600"
              }`}
            >
              {isWork ? typeWorkLabel : typeEduLabel}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`text-lg md:text-xl font-bold m-0 leading-tight transition-colors ${
              isDark
                ? "text-white group-hover:text-indigo-300"
                : "text-slate-900 group-hover:text-indigo-600"
            }`}
          >
            {entry.title}
          </h3>

          {/* Org + Location */}
          <div className="flex items-center gap-4 flex-wrap">
            <span
              className={`flex items-center gap-1.5 text-[0.9rem] font-semibold ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              <Building2 className="w-4 h-4" />
              {entry.organization}
            </span>
            {entry.location && (
              <span
                className={`flex items-center gap-1 text-[0.82rem] ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                {entry.location}
              </span>
            )}
          </div>

          {/* Description */}
          <ul className={`space-y-1.5 m-0 p-0 list-none text-[0.9rem] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {entry.description.map((d, i) => (
              <li key={i} className="flex gap-2">
                <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isWork ? "bg-indigo-500/50" : "bg-cyan-500/50"}`} />
                {d}
              </li>
            ))}
          </ul>

          {/* Technologies */}
          {entry.technologies && entry.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {entry.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-2.5 py-1 rounded-md text-[0.7rem] font-semibold border ${
                    isDark
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
                      : "bg-indigo-50 border-indigo-200/50 text-indigo-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Experience Section ─────────────────────────────────────── */

export default function Experience() {
  const { theme } = useTheme();
  const { t, isFrench } = useTranslation();
  const isDark = theme === "dark";

  const timelineData: TimelineEntry[] = [
    {
      id: "stage-urbanisme",
      type: "work",
      date: isFrench ? "Juin 2026" : "June 2026",
      title: isFrench ? "Stagiaire — Développeur Full Stack" : "Full Stack Developer Intern",
      organization: isFrench ? "Agence Urbaine Khenifra" : "Urban Agency of Khenifra",
      location: isFrench ? "Khenifra" : "Khenifra, Morocco",
      description: isFrench
        ? [
            "Développer un chatbot intelligent destiné à répondre aux questions des utilisateurs dans le domaine de l'urbanisme.",
            "Concevoir une interface d'administration pour la gestion et le suivi du système.",
            "Participer à la conception et à l'intégration des différentes fonctionnalités de la solution.",
          ]
        : [
            "Engineered an intelligent AI chatbot to assist users with urban planning regulations and documentation.",
            "Designed and built an administrative portal for real-time monitoring, usage tracking, and data management.",
            "Contributed to system architecture design and end-to-end integration of platform services.",
          ],
      technologies: ["Next.js", "React", "FastAPI", "MistralAI", "PostgreSQL"],
    },
    {
      id: "ensiasd",
      type: "education",
      date: "2025 – 2028",
      title: isFrench ? "Cycle en Ingénierie Logicielle" : "State Engineering Degree in Software Engineering",
      organization: "ENSIASD Taroudannt",
      location: isFrench ? "Taroudannt" : "Taroudannt, Morocco",
      description: isFrench
        ? [
            "Formation d'ingénieur d'État spécialisée en conception logicielle, architectures distribuées, bases de données et technologies web modernes.",
          ]
        : [
            "National School of Applied Sciences — In-depth curriculum in software engineering, distributed architectures, database modeling, and modern web frameworks.",
          ],
    },
    {
      id: "stage-sante",
      type: "work",
      date: isFrench ? "Avril – Mai 2025" : "April – May 2025",
      title: isFrench ? "Stagiaire — Développeur Web" : "Web Developer Intern",
      organization: isFrench ? "Délégation Provinciale de Santé" : "Provincial Delegation of Health",
      location: isFrench ? "Khenifra" : "Khenifra, Morocco",
      description: isFrench
        ? [
            "Développer une application web complète dédiée à la gestion des services sociaux.",
            "Participer à la conception et au développement des interfaces utilisateur et des fonctionnalités côté serveur.",
            "Mettre en œuvre une solution web répondant aux besoins de gestion et de suivi des services sociaux.",
          ]
        : [
            "Developed a comprehensive web platform for managing and tracking social welfare services.",
            "Designed responsive user interfaces and implemented robust backend APIs and business logic.",
            "Delivered a secure solution tailored to operational management and tracking requirements.",
          ],
      technologies: ["Next.js", "React", "TypeScript", "Spring Boot", "MySQL"],
    },
    {
      id: "stage-education",
      type: "work",
      date: isFrench ? "Mai 2024" : "May 2024",
      title: isFrench ? "Stagiaire — Développeur Python" : "Python Developer Intern",
      organization: isFrench ? "Direction Provinciale de l'Éducation" : "Provincial Directorate of National Education",
      location: isFrench ? "Khenifra" : "Khenifra, Morocco",
      description: isFrench
        ? [
            "Développer une application Python dédiée à la gestion des établissements scolaires.",
            "Participer à la conception et à la mise en œuvre des différentes fonctionnalités de l'application.",
            "Découvrir et comprendre l'architecture réseau ainsi que l'organisation du système informatique.",
          ]
        : [
            "Developed a Python desktop management application for educational establishments.",
            "Implemented student records management, grade tracking, and automated PDF report generation.",
            "Explored organizational IT infrastructure, network topologies, and systems administration.",
          ],
      technologies: ["Python", "Tkinter", "SQLite", "ReportLab"],
    },
    {
      id: "dut",
      type: "education",
      date: "2023 – 2025",
      title: isFrench ? "DUT en Génie Logiciel" : "University Diploma of Technology (DUT) in Software Engineering",
      organization: "EST Khenifra",
      location: isFrench ? "Khenifra" : "Khenifra, Morocco",
      description: isFrench
        ? [
            "Diplôme Universitaire de Technologie en Génie Logiciel — bases de programmation, structures de données, conception UML et bases relationnelles.",
          ]
        : [
            "Higher School of Technology — Solid foundation in OOP, data structures, algorithms, UML modeling, and relational database management.",
          ],
    },
    {
      id: "bac",
      type: "education",
      date: "2023",
      title: isFrench ? "Baccalauréat Sciences Physiques" : "High School Baccalaureate in Physical Sciences",
      organization: "Lycée Tariq Qualifiant",
      location: isFrench ? "Khenifra" : "Khenifra, Morocco",
      description: isFrench
        ? ["Baccalauréat en Sciences Physiques avec mention."]
        : ["Baccalaureate in Physical Sciences (with honors)."],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden section-divider">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      <div className="max-w-[900px] mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-fade-up">
          <h2 className="section-title mb-4">{t("experience.title")}</h2>
          <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t("experience.subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {/* Vertical line */}
          <div className="timeline-line" />

          {timelineData.map((entry, i) => (
            <TimelineCard
              key={entry.id}
              entry={entry}
              index={i}
              isDark={isDark}
              typeWorkLabel={t("experience.typeWork")}
              typeEduLabel={t("experience.typeEdu")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
