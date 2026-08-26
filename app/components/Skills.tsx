"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Monitor,
  Code2,
  Globe,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "@/app/lib/i18n";

/* ── Logo Mappings ──────────────────────────────────────────── */

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const techLogos: Record<string, string> = {
  "React": `${DEVICON_BASE}/react/react-original.svg`,
  "Next.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  "Spring Boot": `${DEVICON_BASE}/spring/spring-original.svg`,
  "FastAPI": `${DEVICON_BASE}/fastapi/fastapi-original.svg`,
  "Tailwind CSS": `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  "Git / GitHub": `${DEVICON_BASE}/github/github-original.svg`,
};

const langLogos: Record<string, string> = {
  "HTML": `${DEVICON_BASE}/html5/html5-original.svg`,
  "CSS": `${DEVICON_BASE}/css3/css3-original.svg`,
  "JavaScript": `${DEVICON_BASE}/javascript/javascript-original.svg`,
  "PHP": `${DEVICON_BASE}/php/php-original.svg`,
  "Java": `${DEVICON_BASE}/java/java-original.svg`,
  "C": `${DEVICON_BASE}/c/c-original.svg`,
  "Python": `${DEVICON_BASE}/python/python-original.svg`,
  "SQL": `${DEVICON_BASE}/azuresqldatabase/azuresqldatabase-original.svg`,
};

/** Flag image URL + descriptive level key for spoken languages */
const spokenMeta: Record<string, { flag: string; levelKey: string }> = {
  "arabic": { flag: "https://flagcdn.com/w40/ma.png", levelKey: "skills.levels.native" },
  "english": { flag: "https://flagcdn.com/w40/gb.png", levelKey: "skills.levels.fluent" },
  "french": { flag: "https://flagcdn.com/w40/fr.png", levelKey: "skills.levels.fluent" },
};

/* ── Skill Data ──────────────────────────────────────────────── */

interface Skill {
  name: string;
  level: number; // 0-100
  color?: string; // gradient override
  logo?: string; // optional logo URL
  url?: string; // official website URL
  darkInvert?: boolean; // invert logo in dark mode (for black SVGs)
  flag?: string; // optional flag emoji (spoken languages)
  descriptiveLevel?: string; // e.g. "Native", "Fluent"
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: Skill[];
  accentFrom: string;
  accentTo: string;
  isSpoken?: boolean; // whether this is the spoken-languages card
}

/* ── Tiered Progress Indicator Hierarchy ─────────────────────── */

type LevelTier = "beginner" | "intermediate" | "advanced" | "expert";

function getSkillTier(skill: Skill): LevelTier {
  if (skill.level >= 90) return "expert";
  if (skill.level >= 80) return "advanced";
  if (skill.level >= 70) return "intermediate";
  return "beginner";
}

function getSkillLevel(level: number, t: (key: string) => string): string {
  if (level >= 90) return t("skills.levels.expert");
  if (level >= 80) return t("skills.levels.advanced");
  if (level >= 70) return t("skills.levels.intermediate");
  return t("skills.levels.beginner");
}

interface TierVisuals {
  accentColor: string;
  fillBackground: string;
  emptyBackgroundLight: string;
  emptyBackgroundDark: string;
}

function getTierVisuals(tier: LevelTier, isDark: boolean): TierVisuals {
  switch (tier) {
    case "expert":
      return {
        accentColor: "#06b6d4",
        fillBackground: "linear-gradient(to right, #06b6d4, #14b8a6)",
        emptyBackgroundLight: "#e2e8f0",
        emptyBackgroundDark: "rgba(255, 255, 255, 0.08)",
      };
    case "advanced":
      return {
        accentColor: "#6366f1",
        fillBackground: "#6366f1",
        emptyBackgroundLight: "#e2e8f0",
        emptyBackgroundDark: "rgba(255, 255, 255, 0.08)",
      };
    case "intermediate":
      return {
        accentColor: isDark ? "#94a3b8" : "#64748b",
        fillBackground: "#94a3b8",
        emptyBackgroundLight: "#e2e8f0",
        emptyBackgroundDark: "rgba(255, 255, 255, 0.08)",
      };
    case "beginner":
      return {
        accentColor: isDark ? "#475569" : "#cbd5e1",
        fillBackground: isDark ? "#64748b" : "#cbd5e1",
        emptyBackgroundLight: "#e2e8f0",
        emptyBackgroundDark: "rgba(255, 255, 255, 0.08)",
      };
  }
}

/* ── Modern SaaS Skill Item ──────────────────────────────────── */

function SkillItem({
  skill,
  delay,
  isVisible,
  isDark,
}: {
  skill: Skill;
  delay: number;
  isVisible: boolean;
  isDark: boolean;
}) {
  const { t } = useTranslation();
  const levelText = skill.descriptiveLevel || getSkillLevel(skill.level, t);
  const tier = getSkillTier(skill);
  const visuals = getTierVisuals(tier, isDark);

  const content = (
    <div
      className="skill-saas-card"
      style={{
        borderLeftColor: visuals.accentColor,
      }}
    >
      {/* Left side: [icon 24x24] + [name] */}
      <div className="flex items-center gap-3 min-w-0 pr-2">
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          {skill.flag ? (
            <Image
              src={skill.flag}
              alt={`${skill.name} flag`}
              width={20}
              height={14}
              className="spoken-flag"
              unoptimized
            />
          ) : skill.logo ? (
            <Image
              src={skill.logo}
              alt={skill.name}
              width={20}
              height={20}
              className={`skill-logo${skill.darkInvert && isDark ? " skill-logo-invert" : ""}`}
              unoptimized
            />
          ) : null}
        </div>
        <span className={`text-sm font-semibold truncate ${isDark ? "text-slate-100" : "text-slate-800"}`}>
          {skill.name}
        </span>
      </div>

      {/* Right side: Level text */}
      <div className="shrink-0">
        <span className={`text-[11px] font-medium uppercase tracking-widest whitespace-nowrap ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {levelText}
        </span>
      </div>
    </div>
  );

  const sharedStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(8px)",
    transition: `all 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };

  const ariaLabel = `${skill.name}: ${levelText}`;

  if (skill.url) {
    return (
      <a
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`${skill.name} — Official Website`}
        aria-label={ariaLabel}
        className="skill-item-anchor"
        style={sharedStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="skill-item-anchor" style={sharedStyle} aria-label={ariaLabel}>
      {content}
    </div>
  );
}

/* ── Category Card ───────────────────────────────────────────── */

function CategoryCard({ category, index, isDark }: { category: SkillCategory; index: number; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="glass p-5 md:p-6 flex flex-col group animate-fade-up rounded-2xl"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Category accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[16px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${category.accentFrom}, ${category.accentTo}, transparent)`,
        }}
      />

      {/* Header with subtle bottom border */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: isDark ? `${category.accentFrom}15` : `${category.accentFrom}15`,
              color: category.accentFrom,
            }}
          >
            {category.icon}
          </div>
          <h3 className={`text-base font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            {category.title}
          </h3>
        </div>
        <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {category.description}
        </p>
      </div>

      {/* Skill list */}
      <div className="flex flex-col gap-2 flex-grow">
        {category.skills.map((skill, i) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            delay={i * 30}
            isVisible={isVisible}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Skills Section ──────────────────────────────────────────── */

export default function Skills() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  const skillCategories: SkillCategory[] = [
    {
      title: t("skills.categories.langTitle"),
      icon: <Code2 className="w-5 h-5" />,
      description: t("skills.categories.langDesc"),
      accentFrom: "#06b6d4",
      accentTo: "#22d3ee",
      skills: [
        { name: "HTML", level: 100, logo: langLogos["HTML"], url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "CSS", level: 95, logo: langLogos["CSS"], url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "JavaScript", level: 85, logo: langLogos["JavaScript"], url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "PHP", level: 50, logo: langLogos["PHP"], url: "https://www.php.net/" },
        { name: "Java", level: 75, logo: langLogos["Java"], url: "https://dev.java/" },
        { name: "C", level: 75, logo: langLogos["C"], url: "https://en.cppreference.com/w/c" },
        { name: "Python", level: 70, logo: langLogos["Python"], url: "https://www.python.org/" },
        { name: "SQL", level: 72, logo: langLogos["SQL"], url: "https://developer.mozilla.org/en-US/docs/Glossary/SQL" },
      ],
    },
    {
      title: t("skills.categories.techTitle"),
      icon: <Monitor className="w-5 h-5" />,
      description: t("skills.categories.techDesc"),
      accentFrom: "#6366f1",
      accentTo: "#818cf8",
      skills: [
        { name: "React", level: 85, logo: techLogos["React"], url: "https://react.dev/" },
        { name: "Next.js", level: 70, logo: techLogos["Next.js"], darkInvert: true, url: "https://nextjs.org/" },
        { name: "Spring Boot", level: 65, logo: techLogos["Spring Boot"], url: "https://spring.io/projects/spring-boot" },
        { name: "FastAPI", level: 50, logo: techLogos["FastAPI"], url: "https://fastapi.tiangolo.com/" },
        { name: "Tailwind CSS", level: 65, logo: techLogos["Tailwind CSS"], url: "https://tailwindcss.com/" },
        { name: "Git / GitHub", level: 78, logo: techLogos["Git / GitHub"], darkInvert: true, url: "https://github.com/" },
      ],
    },
    {
      title: t("skills.categories.languagesSpokenTitle"),
      icon: <Globe className="w-5 h-5" />,
      description: t("skills.categories.languagesSpokenDesc"),
      accentFrom: "#a855f7",
      accentTo: "#c084fc",
      isSpoken: true,
      skills: [
        { name: t("skills.spoken.arabic"), level: 100, flag: spokenMeta.arabic.flag, descriptiveLevel: t(spokenMeta.arabic.levelKey) },
        { name: t("skills.spoken.english"), level: 95, flag: spokenMeta.english.flag, descriptiveLevel: t(spokenMeta.english.levelKey) },
        { name: t("skills.spoken.french"), level: 88, flag: spokenMeta.french.flag, descriptiveLevel: t(spokenMeta.french.levelKey) },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden section-divider">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />
      <div className="orb w-[350px] h-[350px] bg-purple-500/8 absolute top-[40%] right-[5%] animate-[pulse-glow_11s_ease-in-out_infinite_4s]" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-14 animate-fade-up">
          <h2 className="section-title mb-4">{t("skills.title")}</h2>
          <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={index === 2 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <CategoryCard category={category} index={index} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
