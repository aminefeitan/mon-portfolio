"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/amine-rachidi-1b9938386",
    color: "#818cf8", // indigo-400
    hoverBg: "rgba(99, 102, 241, 0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/aminefeitan?igsh=aDQ1MXhiOHVzcnk2",
    color: "#818cf8",
    hoverBg: "rgba(99, 102, 241, 0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/18uWB9aoGD/",
    color: "#818cf8",
    hoverBg: "rgba(99, 102, 241, 0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/aminefeitan",
    color: "#818cf8",
    hoverBg: "rgba(99, 102, 241, 0.2)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(""); // "", "sending", "sent", "error"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      alert("Clé d'accès Web3Forms manquante. Veuillez ajouter NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY dans votre fichier .env.local");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        console.error(result);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden section-divider">
      {/* Unified Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      <div className="max-w-[900px] mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="section-title animate-fade-up block mb-4">
            Me Contacter
          </h2>
          <p className="animate-fade-up delay-100 text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Je suis toujours ouvert à de nouvelles opportunités. N&apos;hésitez pas
            à m&apos;écrire — je vous réponds rapidement !
          </p>
        </div>

        {/* Social icons */}
        <div className="animate-fade-up delay-100 flex justify-center gap-4 mb-12">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
              className="flex items-center justify-center w-[52px] h-[52px] rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-white"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Divider with "ou" */}
        <div className="animate-fade-up delay-200 flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-indigo-500/10" />
          <span className="text-[0.8rem] text-slate-500 font-semibold tracking-widest uppercase">
            ou envoyez un message
          </span>
          <div className="flex-1 h-px bg-indigo-500/10" />
        </div>

        {/* Form card */}
        <div className="glass animate-fade-up delay-200 p-6 md:p-10 lg:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label text-indigo-300">Nom</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre Nom"
                  className="form-input focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label text-indigo-300">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Votre Email"
                  className="form-input focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject" className="form-label text-indigo-300">Objet</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Objet de votre message"
                className="form-input focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label text-indigo-300">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Votre message ici…"
                className="form-input resize-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <button type="submit" className="contact-submit-btn flex items-center justify-center gap-2 mt-4" disabled={status === "sending"}>
              {status === "sending" && <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</>}
              {status === "sent" && <><CheckCircle2 className="w-5 h-5 text-emerald-300" /> Message envoyé avec succès !</>}
              {status === "error" && <><AlertCircle className="w-5 h-5 text-red-300" /> Erreur d'envoi (réessayez)</>}
              {status === "" && <><Send className="w-5 h-5" /> Envoyer le message</>}
            </button>

            {/* Email hint */}
            <p className="text-[0.8rem] text-slate-500 text-center m-0 mt-2">
              Votre message sera envoyé à{" "}
              <a
                href="mailto:rachidiamine906@gmail.com"
                className="text-indigo-400 no-underline font-semibold hover:text-indigo-300 transition-colors"
              >
                rachidiamine906@gmail.com
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
