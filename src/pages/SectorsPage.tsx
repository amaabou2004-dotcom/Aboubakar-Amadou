import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useRouter } from '../lib/router';
import { SectorExplorer } from '../components/SectorExplorer';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const SectorsPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFD] dark:bg-[#01184C] text-[#0E1D38] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        <Breadcrumbs items={[{ label: 'Secteurs d’intervention' }]} />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2F8] dark:bg-[#0A2254] border border-[#DDE4EE] dark:border-[#D4AF37]/30 text-xs font-semibold text-[#01184C] dark:text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Expertise Métier & Écosystèmes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Nos 5 secteurs d'intervention prioritaires
          </h1>
          <p className="text-base text-[#536582] dark:text-slate-300 leading-relaxed">
            De la micro-assurance aux projets de développement humanitaire et institutionnel, nous adaptons les canaux de contact, le CRM et les dispositifs digitaux aux réalités nigériennes et régionales.
          </p>
        </div>

        <SectorExplorer />

        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#01184C] via-[#0A2254] to-[#01184C] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#D4AF37]/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <h3 className="text-xl font-bold mb-1">Votre secteur ne figure pas dans la liste ?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Nos méthodologies de relation client et d'automatisation CRM s'appliquent à tous les contextes B2B et B2C.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#01184C] font-extrabold text-xs tracking-wide transition-all shadow cursor-pointer relative z-10"
          >
            <span>Consulter nos spécialistes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
