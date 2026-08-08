"use client";

import { ArrowRight, Download, Send } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100vh] flex items-center justify-center relative pt-32 pb-32 lg:pb-40 overflow-hidden section-divider">
      {/* Unified Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Text */}
          <div>
            {/* Eyebrow */}
            <div className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-[pulse-glow_2s_ease-in-out_infinite] inline-block" />
              <span className="text-[0.82rem] font-semibold text-indigo-300 tracking-[0.08em] uppercase">
                Disponible pour des opportunités
              </span>
            </div>

            {/* Name */}
            <h1 className="animate-fade-up delay-100 text-[clamp(3.5rem,8vw,6.5rem)] font-black leading-[1.05] tracking-tight mb-4 text-white">
              Amine RACHIDI
            </h1>

            {/* Role */}
            <h2 className="animate-fade-up delay-200 text-[clamp(1.2rem,2.5vw,1.8rem)] text-indigo-400 font-semibold mb-6 leading-relaxed">
              Élève en Ingénieurie Logicielle
            </h2>

            {/* Description */}
            <p className="animate-fade-up delay-300 text-[1.1rem] text-slate-400 max-w-[580px] leading-[1.8] mb-10">
              Élève en 2ème année du cycle ingénieur, passionné par le
              développement web, l&apos;analyse territoriale, les plateformes
              numériques et les outils d&apos;aide à la décision.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-400 flex gap-4 flex-wrap">
              <a href="#projects" className="btn-primary group">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Voir mes projets
              </a>
              <a href="#contact" className="btn-secondary group">
                <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                Me contacter
              </a>
              <a
                href="/cv-amine-rachidi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
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
              <span className="text-[5rem] font-black leading-none text-white mb-2 group-hover:text-indigo-300 transition-colors">
                10+
              </span>
              <span className="text-lg text-slate-300 font-bold uppercase tracking-widest">
                Technologies Utilisées
              </span>
            </div>

            {/* Two smaller blocks */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass p-8 flex flex-col items-center justify-center text-center group">
                <span className="text-4xl font-black text-white mb-2 group-hover:text-indigo-300 transition-colors">5+</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Projets<br />Académiques</span>
              </div>
              <div className="glass p-8 flex flex-col items-center justify-center text-center group">
                <span className="text-4xl font-black text-white mb-2 group-hover:text-indigo-300 transition-colors">2ème</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Année<br />Cycle Ingénieur</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats row for Mobile only */}
        <div className="lg:hidden animate-fade-up delay-400 flex gap-8 mt-16 flex-wrap">
          {[
            { value: "5+", label: "Projets académiques" },
            { value: "2ème", label: "Année cycle ingénieur" },
            { value: "10+", label: "Technologies utilisées" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[2rem] font-extrabold text-white leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-[0.8rem] text-slate-400 font-medium uppercase tracking-[0.06em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
