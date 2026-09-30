import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles, MessageSquare, Phone, ShieldCheck, Bot } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { useSiteData } from '../lib/DataContext';
import { SocialFollowButtons } from './SocialFollowButtons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Services', href: '/services' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Partenaires', href: '/#partenaires' },
  { label: 'Contact', href: '/contact' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
}) => {
  const { currentPath, navigate } = useRouter();
  const { settings } = useSiteData();
  const whatsappUrl = `https://wa.me/${settings.whatsappRaw}?text=${encodeURIComponent(settings.defaultWhatsAppMessage)}`;

  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex flex-col bg-[#01184C]/98 backdrop-blur-2xl text-white overflow-y-auto overscroll-contain"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div
              className="cursor-pointer select-none"
              title="Double-tapez sur le logo pour accéder à l'administration"
            >
              <Logo
                size="sm"
                showSubtitle={false}
                onDoubleClick={() => {
                  onClose();
                  navigate('/admin');
                }}
              />
            </div>
            <div className="flex items-center gap-2.5">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} className="w-9 h-9" />
              <motion.button
                id="close-mobile-menu"
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#0A2254] text-white hover:bg-[#D4AF37] hover:text-[#01184C] transition-colors cursor-pointer"
                aria-label="Fermer le menu mobile"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex-1 px-6 py-8 flex flex-col justify-between">
            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
                closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
              }}
              className="space-y-2.5"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === '/'
                    ? currentPath === '/'
                    : item.href.startsWith('/#')
                    ? currentPath === '/' && typeof window !== 'undefined' && window.location.hash === item.href.replace('/', '')
                    : currentPath.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -16 },
                    }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? 'bg-[#0A2254] text-[#D4AF37] border border-[#D4AF37]/50 font-bold shadow-md'
                          : 'text-slate-200 hover:text-[#D4AF37] hover:bg-[#0A2254]/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive ? 'text-[#D4AF37] translate-x-0.5' : 'text-slate-400'
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom actions */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <motion.button
                id="mobile-menu-cta-ai"
                onClick={() => {
                  onClose();
                  navigate('/assistant-ia');
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#0A2254] text-[#D4AF37] border border-[#D4AF37]/50 font-bold text-sm tracking-wide shadow-md hover:bg-[#0A2254]/80 transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Consulter l'Assistant IA (Plein écran)</span>
              </motion.button>

              <motion.button
                id="mobile-menu-cta-devis"
                onClick={() => {
                  onClose();
                  navigate('/devis');
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="btn-sheen w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#D4AF37] text-[#01184C] font-bold text-sm tracking-wide shadow-lg hover:bg-[#E5C358] transition-all cursor-pointer"
              >
                <span>Demander un devis</span>
                <Sparkles className="w-4 h-4" />
              </motion.button>

              <div className="grid grid-cols-2 gap-2">
                <motion.a
                  id="mobile-menu-call"
                  href={`tel:${settings.phones[0]?.raw || '+22778798900'}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#0A2254] text-white border border-white/15 font-semibold text-xs transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Appeler</span>
                </motion.a>

                <motion.a
                  id="mobile-menu-whatsapp"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#0A2254] text-white border border-[#D4AF37]/40 font-semibold text-xs transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>WhatsApp</span>
                </motion.a>
              </div>

              <div className="pt-1">
                <SocialFollowButtons showTitle={true} title="Suivez-nous" size="sm" />
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>RCCM: {settings.rccm}</span>
                </div>
                <span>Niamey, Niger</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
