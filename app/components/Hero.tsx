"use client";

import { ArrowRight, Download, Send } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="hero" className="min-h-[100dvh] flex items-center justify-center relative pt-24 pb-20 md:pt-32 md:pb-32 lg:pb-40 overflow-hidden section-divider">
      {/* Unified Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />

      <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Text */}
          <div>
            {/* Eyebrow */}
            <div className={`animate-fade-up inline-flex items-center gap-2 md:gap-2.5 px-3 md:px-4 py-1.5 rounded-full border mb-6 md:mb-8 ${isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-200/40"}`}>
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-[pulse-glow_2s_ease-in-out_infinite] inline-block shrink-0" />
              <span className={`text-[0.72rem] md:text-[0.82rem] font-semibold tracking-[0.06em] md:tracking-[0.08em] uppercase ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>
                Disponible pour des opportunités
              </span>
            </div>

            {/* Name */}
            <h1 className={`animate-fade-up delay-100 text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[1.05] tracking-tight mb-3 md:mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
              Amine RACHIDI
            </h1>

            {/* Role */}
            <h2 className={`animate-fade-up delay-200 text-[clamp(1rem,2.5vw,1.8rem)] font-semibold mb-4 md:mb-6 leading-relaxed ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
              Élève en Ingénieurie Logicielle
            </h2>

            {/* Description */}
            <p className={`animate-fade-up delay-300 text-[0.95rem] md:text-[1.1rem] max-w-[580px] leading-[1.7] md:leading-[1.8] mb-8 md:mb-10 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Élève en 2ème année du cycle ingénieur, passionné par le
              développement web, l&apos;analyse territoriale, les plateformes
              numériques et les outils d&apos;aide à la décision.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3 md:gap-4 sm:flex-wrap">
              <a href="#projects" className="btn-primary group text-[0.9rem] md:text-base">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Voir mes projets
              </a>
              <a href="#contact" className="btn-secondary group text-[0.9rem] md:text-base">
                <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                Me contacter
              </a>
              <a
                href="/cv-amine-rachidi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group text-[0.9rem] md:text-base"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                Télécharger CV
              </a>
            </div>
          </div>

          {/* Right Visual / Bento */}
          <div className="hidden lg:flex flex-col gap-6 animate-fade-up delay-300">
            {/* Large Stats block */}
            <div className="glass p-10 flex flex-col items-center justify-center text-center h-[240px] group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className={`text-[5rem] font-black leading-none mb-2 transition-colors ${isDark ? "text-white group-hover:text-indigo-300" : "text-slate-900 group-hover:text-indigo-600"}`}>
                10+
              </span>
              <span className={`text-lg font-bold uppercase tracking-widest ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Technologies Utilisées
              </span>
            </div>

            {/* Two smaller blocks */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass p-8 flex flex-col items-center justify-center text-center group">
                <span className={`text-4xl font-black mb-2 transition-colors ${isDark ? "text-white group-hover:text-indigo-300" : "text-slate-900 group-hover:text-indigo-600"}`}>5+</span>
                <span className={`text-xs uppercase tracking-widest font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>Projets<br />Académiques</span>
              </div>
              <div className="glass p-8 flex flex-col items-center justify-center text-center group">
                <span className={`text-4xl font-black mb-2 transition-colors ${isDark ? "text-white group-hover:text-indigo-300" : "text-slate-900 group-hover:text-indigo-600"}`}>2ème</span>
                <span className={`text-xs uppercase tracking-widest font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>Année<br />Cycle Ingénieur</span>
              </div>
            </div>
          </div>

          {/* Stats row for Mobile only — inside grid for alignment */}
          <div className="lg:hidden col-span-full animate-fade-up delay-400">
            <div className="grid grid-cols-3 gap-3 max-w-[480px]">
              {[
                { value: "5+", label: "Projets académiques" },
                { value: "2ème", label: "Année cycle ingénieur" },
                { value: "10+", label: "Technologies utilisées" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`text-center py-5 px-3 rounded-2xl backdrop-blur-sm border ${isDark ? "bg-white/[0.03] border-white/[0.08]" : "bg-indigo-50/50 border-indigo-200/30"}`}
                >
                  <div className={`text-[1.4rem] sm:text-[1.75rem] font-extrabold leading-none mb-1.5 ${isDark ? "text-white" : "text-slate-900"}`}>
                    {stat.value}
                  </div>
                  <div className={`text-[0.62rem] sm:text-[0.72rem] font-medium uppercase tracking-[0.04em] leading-tight ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
