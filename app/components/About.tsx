"use client";

import { Network, Layers, Code2, Database, Map, Lock, Award, Briefcase, GraduationCap } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "@/app/lib/i18n";

export default function About() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  const interests = [
    { icon: <Network className="w-6 h-6" />, text: t("about.interests.is") },
    { icon: <Layers className="w-6 h-6" />, text: t("about.interests.architecture") },
    { icon: <Code2 className="w-6 h-6" />, text: t("about.interests.fullstack") },
    { icon: <Database className="w-6 h-6" />, text: t("about.interests.dataModeling") },
    { icon: <Map className="w-6 h-6" />, text: t("about.interests.geospatial") },
    { icon: <Lock className="w-6 h-6" />, text: t("about.interests.api") },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden section-divider">
      {/* Unified Background Orbs */}
      <div className="orb w-[500px] h-[500px] bg-cyan-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-fade-up">
          <h2 className="section-title mb-4">{t("about.title")}</h2>
          <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t("about.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">

          {/* Main Content Area - Span 7 */}
          <div className="lg:col-span-7 flex flex-col gap-8 animate-fade-up delay-100">

            {/* Main Bio Card */}
            <div className="glass p-6 md:p-10 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20" : "bg-cyan-100/60 border border-cyan-200/40 text-cyan-600 group-hover:bg-cyan-200/60"}`}>
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{t("about.journeyTitle")}</h3>
              </div>

              <div className={`text-[0.95rem] md:text-[1.05rem] leading-relaxed space-y-3 md:space-y-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                <p>
                  {t("about.journeyP1")}
                </p>
                <p>
                  {t("about.journeyP2")}
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="glass p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "bg-cyan-100/60 border border-cyan-200/40 text-cyan-600"}`}>
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className={`text-xl md:text-2xl font-black mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>{t("about.trainingCardTitle")}</span>
                <span className={`text-xs md:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t("about.trainingCardSub")}</span>
              </div>
              <div className="glass p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "bg-cyan-100/60 border border-cyan-200/40 text-cyan-600"}`}>
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className={`text-xl md:text-2xl font-black mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>{t("about.schoolCardTitle")}</span>
                <span className={`text-xs md:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t("about.schoolCardSub")}</span>
              </div>
            </div>

          </div>

          {/* Right Column - Span 5 */}
          <div className="lg:col-span-5 flex flex-col gap-6 animate-fade-up delay-200 h-full">
            <div className="glass p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "bg-cyan-100/60 border border-cyan-200/40 text-cyan-600"}`}>
                  <Award className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{t("about.interestsTitle")}</h3>
              </div>

              <div className="flex flex-col gap-4 flex-grow justify-center">
                {interests.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group ${isDark
                      ? "bg-cyan-500/5 border-cyan-500/10 hover:bg-cyan-500/10 hover:border-cyan-500/30"
                      : "bg-cyan-50/40 border-cyan-200/20 hover:bg-cyan-100/50 hover:border-cyan-300/40"
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${isDark ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "bg-cyan-100/60 border border-cyan-200/40 text-cyan-600"}`}>
                      {item.icon}
                    </div>
                    <span className={`text-[0.95rem] font-medium transition-colors ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900"}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
