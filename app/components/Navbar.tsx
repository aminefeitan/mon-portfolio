"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "@/app/lib/i18n";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, locale, toggleLocale } = useTranslation();

  const navLinks = [
    { href: "#hero", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#certifications", label: t("nav.certifications") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  // Track active section and navbar background on scroll
  useEffect(() => {
    const sectionIds = ["hero", "about", "experience", "skills", "certifications", "projects", "contact"];

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Update navbar background blur
      setScrolled(scrollY > 30);

      // Bottom of page -> highlight contact
      if (scrollY + windowHeight >= documentHeight - 50) {
        setActive("#contact");
        return;
      }

      // Top of page -> highlight hero
      if (scrollY < 100) {
        setActive("#hero");
        return;
      }

      // Target offset from top (header height + safe margin)
      const targetOffset = 180;
      let currentSection = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetOffset && rect.bottom > targetOffset) {
          currentSection = `#${id}`;
          break;
        }
      }

      if (currentSection) {
        setActive(currentSection);
      }
    };

    updateScrollState();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      setActive(href);
      setMenuOpen(false);
    },
    []
  );

  const isDark = theme === "dark";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled
          ? `py-3 md:py-3.5 backdrop-blur-[20px] border-b shadow-[0_4px_30px_rgba(6, 182, 212,0.06)] ${isDark ? "bg-[#000000]/90 border-white/10" : "bg-white/80 border-cyan-200/30 shadow-[0_4px_30px_rgba(6, 182, 212,0.04)]"}`
          : "py-4 md:py-5 bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group no-underline relative z-[60]">
            <span className={`text-[1.25rem] md:text-[1.4rem] font-extrabold tracking-tight bg-gradient-to-br ${isDark ? "from-white via-cyan-400 to-cyan-500" : "from-slate-900 via-cyan-600 to-cyan-600"} text-transparent bg-clip-text`}>
              Amine<span className="text-cyan-500"> .</span>
            </span>
          </Link>

          {/* Desktop Nav links + Actions */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            <ul className="flex list-none gap-6 lg:gap-8 m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setActive(link.href)}
                    className={`text-[0.92rem] font-medium no-underline transition-colors duration-200 relative hover:text-slate-200 ${active === link.href
                      ? "text-cyan-400"
                      : isDark ? "text-slate-400" : "text-slate-500 hover:!text-slate-800"
                      }`}
                  >
                    {link.label}
                    {active === link.href && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-cyan-500 rounded-full" />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLocale}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[0.8rem] font-bold tracking-wider uppercase transition-all duration-200 ${isDark
                ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-white"
                : "bg-cyan-50 border-cyan-200/50 text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900"
                }`}
              aria-label={`Changer la langue (actuellement ${locale.toUpperCase()})`}
              title="Changer de langue / Switch language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "EN" : "FR"}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
              title={isDark ? "Mode clair" : "Mode sombre"}
            >
              <div className="theme-toggle-icon">
                {isDark ? (
                  <Sun className="w-[18px] h-[18px]" />
                ) : (
                  <Moon className="w-[18px] h-[18px]" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile: Language + Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-2 relative z-[60]">
            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLocale}
              className={`h-9 px-2.5 flex items-center gap-1 rounded-xl border text-[0.75rem] font-bold uppercase transition-all duration-200 ${isDark
                ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
                : "bg-cyan-50 border-cyan-200/50 text-cyan-700"
                }`}
              aria-label={`Changer la langue (${locale.toUpperCase()})`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "EN" : "FR"}</span>
            </button>

            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="theme-toggle !w-9 !h-9"
              aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              <div className="theme-toggle-icon">
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </div>
            </button>

            {/* Hamburger Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 ${isDark
                ? "bg-white/[0.04] border-white/[0.08] hover:bg-cyan-500/10 hover:border-cyan-500/20"
                : "bg-cyan-50/50 border-cyan-200/30 hover:bg-cyan-100/60 hover:border-cyan-300/40"
                }`}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center ${isDark ? "bg-white" : "bg-slate-700"} ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDark ? "bg-white" : "bg-slate-700"} ${menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center ${isDark ? "bg-white" : "bg-slate-700"} ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 backdrop-blur-[30px] transition-opacity duration-500 ${isDark ? "bg-[#000000]/95" : "bg-white/90"} ${menuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Decorative orbs */}
        <div className="absolute top-[10%] -left-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[15%] -right-[15%] w-[250px] h-[250px] rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none" />

        {/* Menu content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
          {/* Nav links */}
          <ul className="list-none m-0 p-0 flex flex-col items-center gap-2 w-full max-w-[320px]">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="w-full"
                style={{
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${menuOpen ? i * 0.07 + 0.15 : 0}s`,
                }}
              >
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-center py-3.5 px-6 rounded-2xl text-[1.05rem] font-semibold no-underline transition-all duration-300 ${active === link.href
                    ? isDark
                      ? "bg-cyan-500/15 border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6, 182, 212,0.1)]"
                      : "bg-cyan-100/60 border border-cyan-300/40 text-cyan-700 shadow-[0_0_20px_rgba(6, 182, 212,0.06)]"
                    : isDark
                      ? "bg-white/[0.02] border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      : "bg-transparent border border-transparent text-slate-500 hover:text-slate-800 hover:bg-cyan-50/50"
                    }`}
                >
                  {link.label}
                  {active === link.href && (
                    <span className="block w-8 h-[2px] bg-gradient-to-r from-cyan-500 to-cyan-500 rounded-full mx-auto mt-2" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom decoration in menu */}
          <div
            className="mt-8 flex flex-col items-center gap-3"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
            }}
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <span className={`text-[0.75rem] font-medium tracking-[0.15em] uppercase ${isDark ? "text-slate-600" : "text-slate-400"}`}>
              Amine Rachidi · 2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
