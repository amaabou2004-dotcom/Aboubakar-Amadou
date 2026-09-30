import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RouterProvider, useRouter } from './lib/router';
import { DataProvider } from './lib/DataContext';
import { AuthProvider } from './lib/AuthContext';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AIAssistantFloatingButton } from './components/AIAssistantFloatingButton';
import { BackToTop } from './components/BackToTop';
import { CustomCursor } from './components/CustomCursor';

import { ErrorBoundary } from './components/ErrorBoundary';
import { PageProgressBar } from './components/PageProgressBar';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SectorsPage } from './pages/SectorsPage';
import { RealisationsPage } from './pages/RealisationsPage';
import { ActualitesPage } from './pages/ActualitesPage';
import { ContactPage } from './pages/ContactPage';
import { DevisPage } from './pages/DevisPage';
import { AdminPage } from './pages/AdminPage';
import { PartnerPortalPage } from './pages/PartnerPortalPage';
import { AIAssistantPage } from './pages/AIAssistantPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Scroll to top upon route change smoothly (must run unconditionally before any early return)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPath]);

  // Admin dedicated workspace (no public navbar/footer overlay)
  if (currentPath.startsWith('/admin')) {
    return <AdminPage />;
  }

  // AI Assistant Full Page (100vw x 100dvh dedicated application workspace)
  if (currentPath === '/assistant-ia' || currentPath === '/ia') {
    return <AIAssistantPage />;
  }

  // Route Dispatcher for Public Site
  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath === '/a-propos') {
      return <AboutPage />;
    }
    if (currentPath === '/services') {
      return <ServicesPage />;
    }
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '').replace(/\/$/, '');
      return <ServiceDetailPage slug={slug} />;
    }
    if (currentPath === '/secteurs') {
      return <SectorsPage />;
    }
    if (currentPath === '/realisations') {
      return <RealisationsPage />;
    }
    if (currentPath === '/actualites') {
      return <ActualitesPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/devis') {
      return <DevisPage />;
    }
    if (currentPath === '/espace-partenaire' || currentPath === '/partenaires') {
      return <PartnerPortalPage />;
    }
    if (currentPath === '/assistant-ia' || currentPath === '/ia') {
      return <AIAssistantPage />;
    }

    // Default Fallback
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFD] dark:bg-[#030F26] text-[#0E1D38] dark:text-white transition-colors duration-300 font-sans selection:bg-[#D4AF37] selection:text-[#01184C]">
      {/* Subtle Custom Cursor for desktop precision */}
      <CustomCursor />

      {/* Smooth reading & route transition indicator */}
      <PageProgressBar />

      {/* Main Navigation */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Page View with Fluid Page Transitions */}
      <main id="main-content" className="flex-1 w-full max-w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex-1"
          >
            {renderRoute()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Floating Actions */}
      <BackToTop />
      <AIAssistantFloatingButton />
      <WhatsAppButton />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider>
        <DataProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </DataProvider>
      </RouterProvider>
    </ErrorBoundary>
  );
}
