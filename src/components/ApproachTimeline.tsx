import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../lib/DataContext';
import { CURATED_IMAGES } from '../data/media';
import { LOCAL_IMAGES } from '../data/images';

const METHODOLOGY_STEPS = [
  {
    number: '01',
    title: 'Comprendre',
    subtitle: 'Analyse des besoins',
    description:
      'Immersion complète dans votre écosystème pour identifier les défis relationnels, technologiques et organisationnels.',
    details: [
      "Diagnostic de l'existant et des points de friction",
      'Cartographie des attentes clients et collaborateurs',
      'Définition des indicateurs de performance cibles',
    ],
  },
  {
    number: '02',
    title: 'Concevoir',
    subtitle: 'Création d’une solution adaptée',
    description:
      'Élaboration d’architectures sur mesure associant technologies modernes et compétences humaines qualifiées.',
    details: [
      'Design de parcours omnicanaux cohérents',
      'Spécifications techniques et choix des outils',
      'Planification progressive et estimation budgétaire',
    ],
  },
  {
    number: '03',
    title: 'Déployer',
    subtitle: 'Mise en œuvre',
    description:
      'Exécution rigoureuse de la solution avec intégration technique, formation des équipes et tests de robustesse.',
    details: [
      'Configuration et déploiement des plateformes',
      'Formation des conseillers et équipes métiers',
      'Lancement progressif et gestion de la bascule',
    ],
  },
  {
    number: '04',
    title: 'Optimiser',
    subtitle: 'Suivi et amélioration continue',
    description:
      'Analyse continue des métriques, ajustement des processus et accompagnement pour pérenniser l’impact.',
    details: [
      'Contrôle qualité permanent et double écoute',
      'Rapports d’activité hebdomadaires et mensuels',
      'Optimisation des flux et mise à niveau technologique',
    ],
  },
];

export const ApproachTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { media } = useSiteData();

  const approachMedia = media.find(
    (m) => m.location === 'approach-methodology' || m.id === 'approach-methodology'
  );
  const imageUrl = approachMedia?.url || CURATED_IMAGES.approach.url;
  const imageAlt = approachMedia?.alt || CURATED_IMAGES.approach.alt;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#01184C] text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#0A2254]/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2254] border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="uppercase tracking-wider text-[11px]">Méthodologie & Rigueur d'Exécution</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-tight text-balance">
              Notre Approche : une trajectoire maîtrisée en 4 temps.
            </h2>
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed text-pretty">
              De l'analyse approfondie des besoins jusqu'à l'amélioration continue, nous structurons chaque étape pour garantir un impact tangible et durable sur vos indicateurs de performance.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[16/10] bg-[#0A2254] group">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = LOCAL_IMAGES.approachStrategy;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01184C] via-[#01184C]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-200 px-3 py-1 rounded-full bg-[#01184C]/90 backdrop-blur-md border border-[#D4AF37]/30">
                  Pilotage par Jalons Stratégiques
                </span>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold">SLA 100%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {METHODOLOGY_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveStep(idx)}
                className={`relative p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#0A2254] border-[#D4AF37] shadow-xl gold-glow ring-1 ring-[#D4AF37]/50'
                    : 'bg-[#0A2254]/30 backdrop-blur-sm border-white/10 hover:border-[#D4AF37]/60 hover:bg-[#0A2254]/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="timeline-active-badge"
                    className="absolute -top-2.5 right-6 px-3 py-0.5 rounded-full bg-[#01184C] border border-[#D4AF37] text-[10px] uppercase font-mono font-bold text-[#D4AF37] shadow-sm"
                  >
                    Étape Active
                  </motion.div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-display text-3xl sm:text-4xl font-extrabold tabular-nums tracking-[-0.03em] transition-colors ${
                        isActive ? 'text-[#D4AF37]' : 'text-[#D4AF37]/50'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#D4AF37] text-[#01184C]' : 'bg-[#01184C] text-slate-400'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">{step.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">{step.subtitle}</p>
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-5">{step.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-200/90 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
