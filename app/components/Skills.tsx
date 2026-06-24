"use client";

import { Monitor, Server, Database, Wrench, Lightbulb, Code2 } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Monitor className="w-6 h-6" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
    description: "Création d'interfaces utilisateur modernes, réactives et accessibles.",
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    skills: ["Node.js", "Express", "Python", "FastAPI", "Java", "Spring Boot"],
    description: "Architecture d'API robustes et de services scalables.",
  },
  {
    title: "Database & Cloud",
    icon: <Database className="w-6 h-6" />,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "AWS", "Docker"],
    description: "Modélisation de données et déploiement cloud sécurisé.",
  },
  {
    title: "Tools & DevOps",
    icon: <Wrench className="w-6 h-6" />,
    skills: ["Git", "GitHub Actions", "CI/CD", "Jest", "Postman", "Linux"],
    description: "Automatisation, tests et intégration continue.",
  },
  {
    title: "Soft Skills",
    icon: <Lightbulb className="w-6 h-6" />,
    skills: ["Agile/Scrum", "Problem Solving", "Teamwork", "Communication"],
    description: "Méthodologies agiles et travail collaboratif efficace.",
  },
  {
    title: "Architecture & Conception",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["UML", "Merise", "Microservices", "Design Patterns", "REST"],
    description: "Conception logicielle orientée objet et systèmes distribués.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden section-divider">
      {/* Unified Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="section-title mb-4">Mes Compétences</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Un éventail de technologies et de méthodologies que j&apos;utilise 
            pour construire des solutions numériques complètes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="glass p-8 flex flex-col group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                {category.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {category.title}
              </h3>
              
              <p className="text-[0.95rem] text-slate-400 leading-relaxed mb-8 flex-grow">
                {category.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-[0.8rem] font-semibold bg-white/[0.04] border border-white/5 text-slate-300 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/5 group-hover:text-indigo-200 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

