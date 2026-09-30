import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Building2, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { useSiteData } from '../lib/DataContext';

export const KeyStatsSection: React.FC = () => {
  const { services, sectors, settings } = useSiteData();

  const servicesCount = services.filter((s) => s.status !== 'hidden').length || 8;
  const sectorsCount = sectors.filter((s) => s.status !== 'hidden').length || 5;

  const stats = [
    {
      id: 'stat-1',
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      value: `${servicesCount}`,
      label: "Domaines d'Expertise",
      detail: 'Centres de contact, CRM, Web, Digital, Commercial...',
    },
    {
      id: 'stat-2',
      icon: <Building2 className="w-6 h-6 text-[#D4AF37]" />,
      value: `${sectorsCount}`,
      label: 'Secteurs d’Intervention',
      detail: 'Assurances, Hôtellerie, Logistique, Télécoms, MEAL',
    },
    {
      id: 'stat-3',
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      value: '100%',
      label: 'Engagement Qualité 5 Étoiles',
      detail: 'Conformité légale rigoureuse NIF & RCCM au Niger',
    },
    {
      id: 'stat-4',
      icon: <Clock className="w-6 h-6 text-[#D4AF37]" />,
      value: '09h30 - 17h30',
      label: 'Disponibilité Opérationnelle',
      detail: 'Permanence du Lundi au Vendredi à Niamey',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#01184C] text-white border-y border-[#D4AF37]/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#0A2254]/60 rounded-full blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2254] border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="uppercase tracking-wider text-[11px]">Repères Institutionnels</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-[-0.03em] text-white leading-tight">
            Nos indicateurs et repères clés
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto text-pretty">
            Des fondations solides, une gouvernance certifiée et une organisation d'élite pour garantir l’excellence opérationnelle de vos projets au Niger.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#0A2254]/90 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all group flex flex-col justify-between shadow-xl cursor-default"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#01184C] border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {stat.icon}
                </div>
                <div className="font-display text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#D4AF37] tabular-nums tracking-[-0.03em] leading-none">
                  {stat.value}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-3 leading-snug">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-200/90 mt-4 pt-3 border-t border-white/10 leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#0A2254]/60 border border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>
              Siège Opérationnel : <strong className="text-white font-semibold">{settings.location}</strong>
            </span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">NIF :</span>
            <strong className="font-mono text-white tabular-nums">{settings.nif}</strong>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">RCCM :</span>
            <strong className="font-mono text-[#D4AF37] tabular-nums">{settings.rccm}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
