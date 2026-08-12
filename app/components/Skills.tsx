"use client";

import { useEffect, useRef, useState } from "react";
import {
  Monitor,
  Code2,
  Globe,
  Sparkles,
  Server,
  Database,
  Wrench,
} from "lucide-react";

/* ── Skill Data ──────────────────────────────────────────────── */

interface Skill {
  name: string;
  level: number; // 0-100
  color?: string; // gradient override
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: Skill[];
  accentFrom: string;
  accentTo: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Technologies & Frameworks",
    icon: <Monitor className="w-6 h-6" />,
    description: "Les outils et frameworks que j'utilise dans mes projets.",
    accentFrom: "#6366f1",
    accentTo: "#818cf8",
    skills: [
      { name: "React / Next.js", level: 70 },
      { name: "Spring Boot", level: 72 },
      { name: "Node.js / Express", level: 60 },
      { name: "FastAPI", level: 50 },
      { name: "Tailwind CSS", level: 75 },
      { name: "Docker", level: 35 },
      { name: "Git / GitHub", level: 78 },
    ],
  },
  {
    title: "Langages de Programmation",
    icon: <Code2 className="w-6 h-6" />,
    description: "Les langages avec lesquels je travaille sur mes projets.",
    accentFrom: "#06b6d4",
    accentTo: "#22d3ee",
    skills: [
      { name: "Java", level: 75 },
      { name: "JavaScript / TypeScript", level: 70 },
      { name: "Python", level: 60 },
      { name: "SQL", level: 72 },
      { name: "PostgreSQL / MongoDB", level: 55 },
      { name: "HTML / CSS", level: 80 },
      { name: "C / C++", level: 55 },
      { name: "PHP", level: 40 },
    ],
  },
  {
    title: "Langues",
    icon: <Globe className="w-6 h-6" />,
    description: "Les langues que je parle couramment ou professionnellement.",
    accentFrom: "#a855f7",
    accentTo: "#c084fc",
    skills: [
      { name: "Arabe", level: 100 },
      { name: "Français", level: 88 },
      { name: "Anglais", level: 95 },
    ],
  },
  {
    title: "Autres Compétences",
    icon: <Sparkles className="w-6 h-6" />,
    description: "Méthodologies et compétences que j'apprends et pratique.",
    accentFrom: "#10b981",
    accentTo: "#34d399",
    skills: [
      { name: "UML / Merise", level: 70 },
      { name: "Design Patterns", level: 55 },
      { name: "REST API Design", level: 65 },
      { name: "Linux Administration", level: 45 },
    ],
  },
];

/* ── Animated Progress Bar ───────────────────────────────────── */

function ProgressBar({
  skill,
  accentFrom,
  accentTo,
  delay,
  isVisible,
}: {
  skill: Skill;
  accentFrom: string;
  accentTo: string;
  delay: number;
  isVisible: boolean;
}) {
  const from = skill.color || accentFrom;
  const to = accentTo;

  return (
    <div
      className="skill-progress-row"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-[0.9rem] font-semibold text-slate-200">
          {skill.name}
        </span>
        <span
          className="skill-percent text-[0.8rem] font-bold tabular-nums"
          style={{ color: from }}
        >
          {isVisible ? skill.level : 0}%
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${from}, ${to})`,
            transitionDelay: `${delay}ms`,
          }}
        >
          <div className="progress-glow" style={{ background: to }} />
        </div>
      </div>
    </div>
  );
}

/* ── Category Card ───────────────────────────────────────────── */

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
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
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="glass p-6 md:p-8 flex flex-col group animate-fade-up"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Category accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${category.accentFrom}, ${category.accentTo}, transparent)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${category.accentFrom}15`,
            border: `1px solid ${category.accentFrom}30`,
            color: category.accentFrom,
          }}
        >
          {category.icon}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
          {category.title}
        </h3>
      </div>

      <p className="text-[0.9rem] text-slate-400 leading-relaxed mb-7">
        {category.description}
      </p>

      {/* Progress Bars */}
      <div className="flex flex-col gap-4 flex-grow">
        {category.skills.map((skill, i) => (
          <ProgressBar
            key={skill.name}
            skill={skill}
            accentFrom={category.accentFrom}
            accentTo={category.accentTo}
            delay={i * 80}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Skills Section ──────────────────────────────────────────── */

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden section-divider">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />
      <div className="orb w-[350px] h-[350px] bg-purple-500/8 absolute top-[40%] right-[5%] animate-[pulse-glow_11s_ease-in-out_infinite_4s]" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-fade-up">
          <h2 className="section-title mb-4">Mes Compétences</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Un éventail de technologies, langages et méthodologies que j&apos;utilise
            et que je continue d&apos;apprendre au fil de ma formation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
