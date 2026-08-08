"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled
        ? "py-3.5 bg-[#07080f]/90 backdrop-blur-[20px] border-b border-indigo-500/10"
        : "py-5 bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group no-underline">
          <span className="text-[1.4rem] font-extrabold tracking-tight bg-gradient-to-br from-white via-indigo-400 to-cyan-500 text-transparent bg-clip-text">
            Amine<span className="text-indigo-500"> .</span>
          </span>
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex list-none gap-10 m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`text-[0.93rem] font-medium no-underline transition-colors duration-200 relative hover:text-slate-200 ${active === link.href ? "text-indigo-400" : "text-slate-400"
                  }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
