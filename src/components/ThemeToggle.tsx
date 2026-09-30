import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle-button"
      type="button"
      onClick={onToggle}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 border cursor-pointer ${
        isDark
          ? 'bg-[#0A2254] text-[#D4AF37] border-[#D4AF37]/40 hover:border-[#D4AF37]'
          : 'bg-white text-[#01184C] border-[#DDE4EE] hover:border-[#D4AF37]'
      } shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${className}`}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
