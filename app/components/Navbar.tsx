"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "#hero", label: "Accueil" },
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Track scroll for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(`#${id}`);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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
          ? `py-3 md:py-3.5 backdrop-blur-[20px] border-b shadow-[0_4px_30px_rgba(99,102,241,0.06)] ${isDark ? "bg-[#07080f]/90 border-indigo-500/10" : "bg-white/80 border-indigo-200/30 shadow-[0_4px_30px_rgba(99,102,241,0.04)]"}`
          : "py-4 md:py-5 bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group no-underline relative z-[60]">
            <span className={`text-[1.25rem] md:text-[1.4rem] font-extrabold tracking-tight bg-gradient-to-br ${isDark ? "from-white via-indigo-400 to-cyan-500" : "from-slate-900 via-indigo-600 to-cyan-600"} text-transparent bg-clip-text`}>
              Amine<span className="text-indigo-500"> .</span>
            </span>
          </Link>

          {/* Desktop Nav links + Theme Toggle */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex list-none gap-10 m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setActive(link.href)}
                    className={`text-[0.93rem] font-medium no-underline transition-colors duration-200 relative hover:text-slate-200 ${active === link.href
                      ? "text-indigo-400"
                      : isDark ? "text-slate-400" : "text-slate-500 hover:!text-slate-800"
                      }`}
                  >
                    {link.label}
                    {active === link.href && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
                    )}
                  </a>
                </li>
              ))}
            </ul>

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

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-2 relative z-[60]">
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

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 ${isDark
                ? "bg-white/[0.04] border-white/[0.08] hover:bg-indigo-500/10 hover:border-indigo-500/20"
                : "bg-indigo-50/50 border-indigo-200/30 hover:bg-indigo-100/60 hover:border-indigo-300/40"
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
          className={`absolute inset-0 backdrop-blur-[30px] transition-opacity duration-500 ${isDark ? "bg-[#07080f]/95" : "bg-white/90"} ${menuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Decorative orbs */}
        <div className="absolute top-[10%] -left-[20%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
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
                  className={`block w-full text-center py-4 px-6 rounded-2xl text-[1.1rem] font-semibold no-underline transition-all duration-300 ${active === link.href
                    ? isDark
                      ? "bg-indigo-500/15 border border-indigo-500/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                      : "bg-indigo-100/60 border border-indigo-300/40 text-indigo-700 shadow-[0_0_20px_rgba(99,102,241,0.06)]"
                    : isDark
                      ? "bg-white/[0.02] border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      : "bg-transparent border border-transparent text-slate-500 hover:text-slate-800 hover:bg-indigo-50/50"
                    }`}
                >
                  {link.label}
                  {active === link.href && (
                    <span className="block w-8 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-auto mt-2" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom decoration in menu */}
          <div
            className="mt-12 flex flex-col items-center gap-3"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
            }}
          >
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <span className={`text-[0.75rem] font-medium tracking-[0.15em] uppercase ${isDark ? "text-slate-600" : "text-slate-400"}`}>
              Portfolio 2025
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
