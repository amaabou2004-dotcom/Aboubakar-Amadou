import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Send,
  Maximize2,
  X,
  RefreshCw,
  PhoneCall,
  FileText,
} from 'lucide-react';
import { useRouter } from '../lib/router';
import { useSiteData } from '../lib/DataContext';
import { FormattedAIMessage } from './FormattedAIMessage';

interface MiniMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  intent?: {
    needsQuote?: boolean;
    needsContact?: boolean;
  };
}

const MINI_CHIPS = [
  { label: 'Demander un devis', query: 'Comment obtenir un devis pour un centre d’appels ou une mission CRM ?' },
  { label: 'Nos 8 services', query: 'Présentez-moi brièvement vos 8 pôles d’expertise à Niamey.' },
  { label: 'Support 24/7', query: 'Comment fonctionne votre centre de contact multicanal externalisé ?' },
  { label: 'Contact Niamey', query: 'Quelles sont vos coordonnées et horaires à Niamey ?' },
];

export const AIAssistantFloatingButton: React.FC = () => {
  const { navigate, currentPath } = useRouter();
  const { settings } = useSiteData();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<MiniMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Bonjour ! Je suis le Conseiller Virtuel d'Excellence Services SARL à Niamey. Comment puis-je vous aider dans votre projet ?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-ai-assistant', handleOpen);
    return () => window.removeEventListener('open-ai-assistant', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages, isTyping]);

  // If already on the dedicated AI page or admin, don't display
  if (currentPath === '/assistant-ia' || currentPath === '/ia' || currentPath.startsWith('/admin')) {
    return null;
  }

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const userMessage: MiniMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      let botReply = data?.reply || '';

      if (!res.ok || !botReply) {
        botReply = `Excellence Services SARL vous accompagne à Niamey (NIF: 155632/R). Contactez nos conseillers au ${settings.phones[0]?.number} ou demandez un devis en ligne.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          intent: data?.intent,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Nos conseillers sont à votre disposition à Niamey au ${settings.phones[0]?.number} pour toute étude ou devis.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <aside aria-label="Assistant Virtuel IA Flottant" className="fixed bottom-5 left-4 sm:left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-3 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[78vh] bg-[#041029] border border-[#183B7A] rounded-2xl shadow-[0_20px_60px_rgba(1,10,32,0.65)] flex flex-col overflow-hidden text-white font-sans"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#06183E] border-b border-[#132C5E] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-8 h-8 rounded-full bg-[#0E2861] border border-[#2353A8]/70 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Bot className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 border border-[#041029]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate">Conseiller Virtuel</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">Excellence Services • Niamey</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/assistant-ia');
                  }}
                  title="Agrandir en plein écran"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#D4AF37] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Fermer le chat"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 overscroll-contain">
              {/* Mini Suggestion Chips */}
              <div className="flex flex-wrap gap-1.5 pb-1">
                {MINI_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(chip.query)}
                    disabled={isTyping}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#0B214E]/70 hover:bg-[#122D68] border border-[#1A3875]/60 text-slate-200 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'} text-left`}
                  >
                    <div
                      className={`max-w-[88%] px-3.5 py-2.5 transition-all ${
                        isBot
                          ? 'bg-gradient-to-br from-[#0A204B] to-[#061536] text-slate-100 border border-[#16356E]/60 rounded-2xl rounded-tl-xs shadow-xs'
                          : 'bg-gradient-to-br from-[#173D85] to-[#12306B] text-white border border-[#2757B3]/50 rounded-2xl rounded-tr-xs shadow-xs'
                      }`}
                    >
                      <FormattedAIMessage
                        content={msg.text}
                        timestamp={msg.timestamp}
                        isBot={isBot}
                        intent={msg.intent}
                      />
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 pl-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                  <span>Rédaction en cours...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-2.5 bg-[#06183E] border-t border-[#132C5E] shrink-0">
              <div className="flex items-center gap-1.5 bg-[#091E47] border border-[#1B3B7E] rounded-xl px-2 py-1 focus-within:border-[#D4AF37]">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question..."
                  disabled={isTyping}
                  className="flex-1 min-w-0 bg-transparent text-xs text-white placeholder:text-slate-400 focus:outline-none py-1.5"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C358] text-[#01184C] disabled:opacity-40 transition-colors cursor-pointer shrink-0"
                  title="Envoyer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-1.5 px-0.5 flex items-center justify-between text-[10px] text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/devis');
                  }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3 h-3 text-[#D4AF37]" />
                  <span>Devis express</span>
                </button>
                <a
                  href={`https://wa.me/${settings.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp direct</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        id="ai-assistant-toggle-button"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 sm:gap-2.5 p-2 sm:px-4 sm:py-3 rounded-full backdrop-blur-md text-white border shadow-2xl transition-all group cursor-pointer ${
          isOpen
            ? 'bg-[#D4AF37] text-[#01184C] border-[#D4AF37] shadow-[#D4AF37]/30'
            : 'bg-[#01184C]/95 border-[#D4AF37]/60 hover:border-[#D4AF37] hover:shadow-[#D4AF37]/25'
        }`}
        aria-label={isOpen ? "Fermer l'Assistant IA" : "Ouvrir l'Assistant IA"}
        title={isOpen ? "Fermer la fenêtre du Conseiller Virtuel" : "Discuter avec le Conseiller Virtuel 24/7"}
      >
        <div
          className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow shrink-0 ${
            isOpen ? 'bg-[#01184C] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#01184C]'
          }`}
        >
          {isOpen ? <X className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          {!isOpen && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#01184C] absolute -top-0.5 -right-0.5 animate-pulse" />
          )}
        </div>
        <div className="hidden sm:block text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-extrabold tracking-wide transition-colors ${
                isOpen ? 'text-[#01184C]' : 'text-white group-hover:text-[#D4AF37]'
              }`}
            >
              {isOpen ? 'Fermer le chat' : 'Conseiller IA'}
            </span>
            {!isOpen && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
          </div>
          <p className={`text-[10px] ${isOpen ? 'text-[#01184C]/80' : 'text-slate-300'}`}>
            {isOpen ? 'Cliquez pour réduire' : 'Discussion instantanée • 24/7'}
          </p>
        </div>
      </motion.button>
    </aside>
  );
};
