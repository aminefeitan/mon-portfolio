"use client";

import { Award, ExternalLink } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "@/app/lib/i18n";

/* ── Data ────────────────────────────────────────────────────── */

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  link?: string;
  icon: string; // emoji
}

// Placeholder — pas de certifications pour l'instant
const certifications: Certification[] = [];

/* ── Certifications Section ─────────────────────────────────── */

export default function Certifications() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  // Si aucune certification, on affiche un message d'information
  if (certifications.length === 0) {
    return (
      <section id="certifications" className="py-20 md:py-32 relative overflow-hidden section-divider">
        {/* Background orbs */}
        <div className="orb w-[500px] h-[500px] bg-cyan-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
        <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

        <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16 animate-fade-up">
            <h2 className="section-title mb-4">{t("certifications.title")}</h2>
            <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {t("certifications.subtitle")}
            </p>
          </div>

          <div className="glass p-8 md:p-12 text-center animate-fade-up delay-100 max-w-[600px] mx-auto group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${isDark ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "bg-cyan-100/60 border border-cyan-200/40 text-cyan-600"}`}>
              <Award className="w-8 h-8" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
              {t("certifications.inProgressTitle")}
            </h3>
            <p className={`text-[0.95rem] leading-relaxed m-0 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {t("certifications.inProgressDesc")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20 md:py-32 relative overflow-hidden section-divider">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-cyan-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-fade-up">
          <h2 className="section-title mb-4">{t("certifications.title")}</h2>
          <p className={`max-w-2xl mx-auto text-base md:text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t("certifications.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="glass flex flex-col group h-full animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="p-5 md:p-7 flex flex-col h-full gap-4 relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-all duration-300 group-hover:scale-110 ${isDark ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-cyan-100/60 border border-cyan-200/40"}`}>
                  {cert.icon}
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold m-0 leading-tight transition-colors ${isDark ? "text-white group-hover:text-cyan-300" : "text-slate-900 group-hover:text-cyan-600"}`}>
                  {cert.title}
                </h3>

                {/* Issuer + Date */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-[0.85rem] font-semibold ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
                    {cert.issuer}
                  </span>
                  {cert.date && (
                    <span className={`text-[0.8rem] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      {cert.date}
                    </span>
                  )}
                </div>

                {/* Verification Link */}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto inline-flex items-center gap-2 text-[0.85rem] font-semibold no-underline transition-colors ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-800"}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Voir le certificat
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
