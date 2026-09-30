import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, ChevronDown, Sparkles, ArrowRight, Bot } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useSiteData } from '../lib/DataContext';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Partenaires', href: '/#partenaires' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const { currentPath, navigate } = useRouter();
  const { isScrolled } = useScrollPosition(25);
  const { services } = useSiteData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const activeServices = services.filter((s) => s.status !== 'hidden');
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTouchTapRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const triggerAdminNavigation = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();
    }
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    navigate('/admin');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    // Set slight delay to distinguish single click (home) from double click (admin)
    clickTimeoutRef.current = setTimeout(() => {
      navigate('/');
      clickTimeoutRef.current = null;
    }, 280);
  };

  const handleLogoDoubleClick = (e?: React.MouseEvent | React.TouchEvent) => {
    triggerAdminNavigation(e);
  };

  // Dedicated touch double-tap listener on mobile navbar logo
  const handleLogoTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now();
    const diff = now - lastTouchTapRef.current;

    if (diff > 40 && diff < 380) {
      triggerAdminNavigation(e);
      lastTouchTapRef.current = 0;
    } else {
      lastTouchTapRef.current = now;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 max-w-full overflow-x-hidden transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#01184C]/98 backdrop-blur-xl border-b border-[#D4AF37]/35 shadow-xl shadow-black/25'
            : 'py-3.5 sm:py-4 bg-[#01184C] sm:bg-[#01184C]/95 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <motion.div
            id="navbar-brand-logo"
            onClick={handleLogoClick}
            onDoubleClick={handleLogoDoubleClick}
            onTouchEnd={handleLogoTouchEnd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center cursor-pointer select-none"
            title="Double-cliquez (ou double-tapez sur mobile) pour accéder à l'espace administrateur"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate('/');
            }}
          >
            <Logo onDoubleClick={handleLogoDoubleClick} />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? currentPath === '/'
                  : link.href.startsWith('/#')
                  ? currentPath === '/' && typeof window !== 'undefined' && window.location.hash === link.href.replace('/', '')
                  : currentPath.startsWith(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-colors ${
                        isActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200 hover:text-[#D4AF37]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-bg"
                          className="absolute inset-0 rounded-full bg-[#0A2254]/80 border border-[#D4AF37]/35 -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${
                          servicesDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-0 w-80 mt-2 p-2 bg-[#01184C]/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#D4AF37]/30 grid gap-1 z-50 origin-top-left"
                        >
                          <div className="px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                              Nos 8 Domaines d'Expertise
                            </span>
                            <span className="text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                              ★ 5 Étoiles
                            </span>
                          </div>
                          <div className="max-h-80 overflow-y-auto py-1 space-y-0.5">
                            {activeServices.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                onClick={() => setServicesDropdownOpen(false)}
                                className="flex items-start gap-2.5 p-2 rounded-xl text-xs text-gray-200 hover:bg-[#0A2254] hover:text-[#D4AF37] transition-all duration-150 group"
                              >
                                <span className="font-mono text-[10px] text-[#D4AF37] mt-0.5 font-bold group-hover:scale-110 transition-transform">
                                  {service.number}
                                </span>
                                <div className="flex-1">
                                  <p className="font-medium group-hover:translate-x-0.5 transition-transform leading-tight">
                                    {service.title}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-white/10 px-2">
                            <Link
                              href="/services"
                              onClick={() => setServicesDropdownOpen(false)}
                              className="flex items-center justify-between text-xs font-semibold text-[#D4AF37] hover:text-white py-1 transition-colors group"
                            >
                              <span>Voir la vue d'ensemble</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full transition-colors ${
                    isActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200 hover:text-[#D4AF37]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-bg"
                      className="absolute inset-0 rounded-full bg-[#0A2254]/80 border border-[#D4AF37]/35 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3">
            <motion.button
              type="button"
              id="navbar-open-ai-desktop"
              onClick={() => navigate('/assistant-ia')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0A2254] hover:bg-[#01184C] text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Discuter avec le Conseiller Virtuel d'Excellence Services"
            >
              <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Assistant IA</span>
            </motion.button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <motion.button
              id="navbar-cta-quote"
              onClick={() => navigate('/devis')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-sheen bg-[#D4AF37] hover:bg-[#E5C358] text-[#01184C] px-5 py-2.5 rounded-full text-sm font-bold gold-glow hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer shadow-md group"
            >
              <span>Demander un devis</span>
              <Sparkles className="w-3.5 h-3.5 text-[#01184C] group-hover:rotate-12 transition-transform duration-300" />
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              id="navbar-open-ai-mobile"
              onClick={() => navigate('/assistant-ia')}
              className="p-2 rounded-xl bg-[#0A2254] text-[#D4AF37] border border-[#D4AF37]/40 cursor-pointer"
              title="Assistant IA (Plein écran)"
              aria-label="Ouvrir l'assistant intelligent"
            >
              <Bot className="w-4 h-4" />
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} className="w-9 h-9" />
            <motion.button
              id="open-mobile-menu"
              onClick={() => setMobileMenuOpen(true)}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-xl bg-white dark:bg-[#0A2254] text-[#01184C] dark:text-white border border-[#DDE4EE] dark:border-[#D4AF37]/30 shadow-sm hover:border-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Ouvrir le menu de navigation"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
    </>
  );
};
