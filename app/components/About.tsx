"use client";

import { Network, Layers, Code2, Database, Map, Lock, Award, Briefcase, GraduationCap } from "lucide-react";

const interests = [
  { icon: <Network className="w-6 h-6" />, text: "L'analyse et la conception des SI" },
  { icon: <Layers className="w-6 h-6" />, text: "L'architecture logicielle" },
  { icon: <Code2 className="w-6 h-6" />, text: "Le développement Full Stack" },
  { icon: <Database className="w-6 h-6" />, text: "La modélisation des données" },
  { icon: <Map className="w-6 h-6" />, text: "App géospatiales & décisionnelles" },
  { icon: <Lock className="w-6 h-6" />, text: "Les API REST sécurisées" },
];

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden section-divider">
      {/* Unified Background Orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 absolute -top-[5%] -left-[10%] animate-[pulse-glow_7s_ease-in-out_infinite]" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/10 absolute -bottom-[10%] -right-[5%] animate-[pulse-glow_9s_ease-in-out_infinite_2s]" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="section-title mb-4">À propos de moi</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Passionné par la création de solutions numériques performantes et évolutives.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Main Content Area - Span 7 */}
          <div className="lg:col-span-7 flex flex-col gap-8 animate-fade-up delay-100">

            {/* Main Bio Card */}
            <div className="glass p-10 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Mon Parcours</h3>
              </div>

              <div className="text-[1.05rem] text-slate-400 leading-relaxed space-y-4">
                <p>
                  Élève en 2ème année du cycle ingénieur à l&apos;<span className="text-indigo-400 font-semibold">ENSIASD Taroudannt</span>, je m&apos;intéresse à <span className="text-white font-semibold">l&apos;analyse, la conception, la modélisation et le développement</span> d&apos;applications web.
                </p>
                <p>
                  Je travaille avec des technologies comme <span className="text-indigo-400 font-semibold">Java Spring Boot</span>, <span className="text-indigo-400 font-semibold">React</span> et <span className="text-indigo-400 font-semibold">Next.js</span>. Mes projets académiques couvrent divers domaines allant de l&apos;analyse territoriale et la gestion d&apos;événements, jusqu&apos;aux outils d&apos;aide à la décision.
                </p>
              </div>


            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-white mb-1">Formation</span>
                <span className="text-sm text-slate-400">Projets Académiques</span>
              </div>
              <div className="glass p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-white mb-1">ENSIASD</span>
                <span className="text-sm text-slate-400">Taroudannt · 2ème Année</span>
              </div>
            </div>

          </div>

          {/* Right Column - Span 5 */}
          <div className="lg:col-span-5 flex flex-col gap-6 animate-fade-up delay-200 h-full">
            <div className="glass p-8 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Centres d&apos;Intérêt</h3>
              </div>

              <div className="flex flex-col gap-4 flex-grow justify-center">
                {interests.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 transition-all duration-300 hover:bg-indigo-500/10 hover:border-indigo-500/30 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-[0.95rem] text-slate-300 font-medium group-hover:text-white transition-colors">
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

