"use client";

import Image from "next/image";
import { ArrowRight, Download, Send, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "@/app/lib/i18n";

export default function Hero() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <section id="hero" className="min-h-[100dvh] flex items-center justify-center relative pt-24 pb-20 md:pt-32 md:pb-32 lg:pb-40 overflow-hidden section-divider">
      {/* Unified Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />

      <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10 w-full">
        {/* ========================================================= */}
        {/* DESKTOP LAYOUT (Screen >= 1024px)                        */}
        {/* ========================================================= */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Text */}
          <div>
            {/* Eyebrow */}
            <div className={`animate-fade-up inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-7 ${isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-200/40"}`}>
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-[pulse-glow_2s_ease-in-out_infinite] inline-block shrink-0" />
              <span className={`text-[0.82rem] font-semibold tracking-[0.08em] uppercase ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>
                {t("hero.badge")}
              </span>
            </div>

            {/* Name */}
            <h1 className={`animate-fade-up delay-100 text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[1.05] tracking-tight mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
              {t("hero.name")}
            </h1>

            {/* Role */}
            <h2 className={`animate-fade-up delay-200 text-[clamp(1rem,2.5vw,1.8rem)] font-semibold mb-6 leading-relaxed ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
              {t("hero.role")}
            </h2>

            {/* Description */}
            <p className={`animate-fade-up delay-300 text-[1.1rem] max-w-[580px] leading-[1.8] mb-10 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {t("hero.description")}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-400 flex flex-row gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
                className="btn-ai-hero group text-base"
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                {t("hero.askAi")}
              </button>
              <a href="#projects" className="btn-primary group text-base">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {t("hero.viewProjects")}
              </a>
              <a href="#contact" className="btn-secondary group text-base">
                <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                {t("hero.contactMe")}
              </a>
              <a
                href="/cv-amine-rachidi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group text-base"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                {t("hero.downloadCV")}
              </a>
            </div>
          </div>

          {/* Right Visual — Photo Card + Stats (aligned at the same level as Name) */}
          <div className="flex flex-col gap-8 lg:gap-10 animate-fade-up delay-300 lg:pt-[3.75rem]">
            {/* Photo Card */}
            <div className="hero-photo-wrapper w-72 h-72 lg:w-[350px] lg:h-[350px] mb-2 lg:mb-4">
              <div className="hero-photo-border" />
              <div className="hero-photo-inner">
                <Image
                  src="/photo-amine.jpg.png"
                  alt="Amine Rachidi"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-full transition-none transform-none"
                  priority
                />
                {/* Fallback initials */}
                <div className="hero-photo-fallback" aria-hidden="true">
                  <span className={`text-5xl font-black bg-gradient-to-br ${isDark ? "from-white via-indigo-400 to-cyan-500" : "from-slate-900 via-indigo-600 to-cyan-600"} text-transparent bg-clip-text`}>
                    AR
                  </span>
                </div>
              </div>
            </div>

            {/* Compact Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: t("hero.stats.projectsValue"), label: t("hero.stats.projectsLabel") },
                { value: t("hero.stats.internshipsValue"), label: t("hero.stats.internshipsLabel") },
                { value: t("hero.stats.technologiesValue"), label: t("hero.stats.technologiesLabel") },
              ].map((stat) => (
                <div key={stat.label} className="glass p-5 flex flex-col items-center justify-center text-center group">
                  <span className={`text-2xl font-black mb-1 transition-colors ${isDark ? "text-white group-hover:text-indigo-300" : "text-slate-900 group-hover:text-indigo-600"}`}>
                    {stat.value}
                  </span>
                  <span className={`text-[0.65rem] uppercase tracking-widest font-semibold leading-tight ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE & TABLET LAYOUT (Screen < 1024px)                  */}
        {/* ========================================================= */}
        <div className="lg:hidden flex flex-col items-center text-center w-full">
          {/* Eyebrow Badge */}
          <div className={`animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-5 ${isDark ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-200/40"}`}>
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-[pulse-glow_2s_ease-in-out_infinite] inline-block shrink-0" />
            <span className={`text-[0.72rem] sm:text-[0.8rem] font-semibold tracking-[0.06em] uppercase ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>
              {t("hero.badge")}
            </span>
          </div>

          {/* Circular Photo */}
          <div className="animate-fade-up delay-100 mb-5 flex justify-center w-full">
            <div className="hero-photo-circle-wrapper w-36 h-36 sm:w-44 sm:h-44">
              <div className="hero-photo-circle-border" />
              <div className="hero-photo-circle-inner">
                <Image
                  src="/photo-amine.jpg.png"
                  alt="Amine Rachidi"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full rounded-full transition-none transform-none"
                  priority
                />
                <div className="hero-photo-circle-fallback" aria-hidden="true">
                  <span className={`text-4xl font-black bg-gradient-to-br ${isDark ? "from-white via-indigo-400 to-cyan-500" : "from-slate-900 via-indigo-600 to-cyan-600"} text-transparent bg-clip-text`}>
                    AR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Name */}
          <h1 className={`animate-fade-up delay-200 text-[2.2rem] sm:text-[2.8rem] font-black leading-[1.1] tracking-tight mb-2 w-full ${isDark ? "text-white" : "text-slate-900"}`}>
            {t("hero.name")}
          </h1>

          {/* Role */}
          <h2 className={`animate-fade-up delay-300 text-[1rem] sm:text-[1.15rem] font-semibold mb-4 leading-relaxed w-full ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
            {t("hero.role")}
          </h2>

          {/* Description */}
          <p className={`animate-fade-up delay-300 text-[0.9rem] sm:text-[0.95rem] leading-[1.7] mb-7 w-full max-w-[500px] mx-auto ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t("hero.description")}
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[520px] mx-auto mb-8">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
              className="btn-ai-hero group text-[0.88rem] w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              {t("hero.askAi")}
            </button>
            <a href="#projects" className="btn-primary group text-[0.88rem] w-full sm:w-auto">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {t("hero.viewProjects")}
            </a>
            <a href="#contact" className="btn-secondary group text-[0.88rem] w-full sm:w-auto">
              <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              {t("hero.contactMe")}
            </a>
            <a
              href="/cv-amine-rachidi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group text-[0.88rem] w-full sm:w-auto"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              {t("hero.downloadCV")}
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-500 grid grid-cols-3 gap-2.5 w-full max-w-[400px] mx-auto">
            {[
              { value: t("hero.stats.projectsValue"), label: t("hero.stats.projectsLabel") },
              { value: t("hero.stats.internshipsValue"), label: t("hero.stats.internshipsLabel") },
              { value: t("hero.stats.technologiesValue"), label: t("hero.stats.technologiesLabel") },
            ].map((stat) => (
              <div key={stat.label} className="glass p-3 flex flex-col items-center justify-center text-center">
                <span className={`text-lg sm:text-xl font-black mb-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>
                  {stat.value}
                </span>
                <span className={`text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider font-semibold leading-tight ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
