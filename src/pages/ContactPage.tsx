import React, { useState } from 'react';
import { Sparkles, MapPin, Mail, Phone, Clock, MessageSquare, Check, Send } from 'lucide-react';
import { useSiteData } from '../lib/DataContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SocialFollowButtons } from '../components/SocialFollowButtons';

export const ContactPage: React.FC = () => {
  const { settings, submitContactMessage, media } = useSiteData();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactMedia = media.find(
    (m) => m.location === 'contact-multichannel' || m.id === 'contact-multichannel'
  );
  const imageUrl = contactMedia?.url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80';
  const imageAlt = contactMedia?.alt || 'Centre de contact Excellence Services SARL';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    try {
      await submitContactMessage({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || 'Message via formulaire web',
        message: formData.message,
      });
    } catch (err) {
      console.warn('Error saving message into Firestore', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappRaw}?text=${encodeURIComponent(
    settings.defaultWhatsAppMessage
  )}`;

  return (
    <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFD] dark:bg-[#01184C] text-[#0E1D38] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2F8] dark:bg-[#0A2254] border border-[#DDE4EE] dark:border-[#D4AF37]/30 text-xs font-semibold text-[#01184C] dark:text-[#D4AF37] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="uppercase tracking-wider text-[11px]">Contact & Disponibilité</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-balance">
            Une écoute attentive, un accompagnement personnalisé à Niamey.
          </h1>
          <p className="mt-3 text-base text-[#475569] dark:text-slate-300 leading-relaxed font-normal text-pretty">
            Pour toute demande d'information, étude de faisabilité, audit ou partenariat stratégique, notre équipe d'experts basée à Niamey est à votre entière disposition.
          </p>
        </div>

        {/* 2-Column Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#01184C] text-white border border-[#D4AF37]/30 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                Coordonnées Officielles
              </span>
              <h3 className="text-2xl font-extrabold mt-1">Échangeons sur vos enjeux</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Notre équipe permanente basée à Niamey est à votre disposition pour analyser vos besoins et convenir d'un rendez-vous stratégique.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-[#D4AF37]/30 shadow-lg bg-[#0A2254]">
              <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover object-center" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01184C] via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  Dialogue & Écoute Permanente
                </span>
                <span className="text-[#D4AF37] font-bold">Niamey</span>
              </div>
            </div>

            <div className="space-y-4 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A2254] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Localisation</p>
                  <p className="text-slate-300">{settings.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A2254] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Courrier électronique</p>
                  <a href={`mailto:${settings.email}`} className="text-[#D4AF37] hover:underline font-medium">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A2254] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Lignes téléphoniques</p>
                  <p>
                    <a href={`tel:${settings.phones[0]?.raw || '+22778798900'}`} className="hover:text-[#D4AF37]">
                      {settings.phones[0]?.number || '+227 78 79 89 00'}
                    </a>
                  </p>
                  {settings.phones[1] && (
                    <p>
                      <a href={`tel:${settings.phones[1]?.raw}`} className="hover:text-[#D4AF37]">
                        {settings.phones[1]?.number}
                      </a>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A2254] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Horaires d'ouverture</p>
                  <p className="text-slate-300">{settings.workingHours}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A2254]/60 border border-white/10 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center justify-between">
                <span>NIF :</span>
                <span className="font-mono text-white font-bold">{settings.nif}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>RCCM :</span>
                <span className="font-mono text-[#D4AF37] font-bold">{settings.rccm}</span>
              </div>
            </div>

            {/* Direct WhatsApp */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-2">
                Directement sur WhatsApp
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-2xl bg-[#F7B900] hover:bg-[#E5A700] text-[#01184C] text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>

            {/* Suivez-nous (Facebook & TikTok) */}
            <SocialFollowButtons showTitle={true} title="Suivez-nous" size="md" />
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0A2254]/30 border border-[#DDE4EE] dark:border-white/10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mx-auto border-2 border-[#D4AF37]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0E1D38] dark:text-white">Message transmis avec succès</h3>
                <p className="text-xs sm:text-sm text-[#536582] dark:text-slate-300 max-w-md mx-auto">
                  Merci pour votre message. Notre équipe d'Excellence Services SARL vous répondra sous 24 à 48 heures ouvrées.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#01184C] hover:bg-[#D4AF37] text-white hover:text-[#01184C] dark:bg-[#D4AF37] dark:text-[#01184C] dark:hover:bg-white transition-all cursor-pointer"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#0E1D38] dark:text-white mb-2">
                  Envoyez-nous un message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0E1D38] dark:text-slate-200 mb-1.5">
                      Votre nom complet <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="M. / Mme"
                      className="w-full p-3 rounded-xl bg-[#F8FAFD] dark:bg-[#01184C]/60 border border-[#DDE4EE] dark:border-white/10 text-sm text-[#0E1D38] dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0E1D38] dark:text-slate-200 mb-1.5">
                      Email professionnel <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@organisation.com"
                      className="w-full p-3 rounded-xl bg-[#F8FAFD] dark:bg-[#01184C]/60 border border-[#DDE4EE] dark:border-white/10 text-sm text-[#0E1D38] dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0E1D38] dark:text-slate-200 mb-1.5">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+227 00 00 00 00"
                      className="w-full p-3 rounded-xl bg-[#F8FAFD] dark:bg-[#01184C]/60 border border-[#DDE4EE] dark:border-white/10 text-sm text-[#0E1D38] dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0E1D38] dark:text-slate-200 mb-1.5">
                      Objet du message
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Demande d'information générale"
                      className="w-full p-3 rounded-xl bg-[#F8FAFD] dark:bg-[#01184C]/60 border border-[#DDE4EE] dark:border-white/10 text-sm text-[#0E1D38] dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E1D38] dark:text-slate-200 mb-1.5">
                    Message <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre demande..."
                    className="w-full p-3 rounded-xl bg-[#F8FAFD] dark:bg-[#01184C]/60 border border-[#DDE4EE] dark:border-white/10 text-sm text-[#0E1D38] dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#01184C] hover:bg-[#D4AF37] text-white hover:text-[#01184C] dark:bg-[#D4AF37] dark:text-[#01184C] dark:hover:bg-white font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Transmission en cours...</span>
                  ) : (
                    <>
                      <span>Transmettre le message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#0A2254]/30 border border-[#DDE4EE] dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2254] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0E1D38] dark:text-white">Siège social & Bureaux à Niamey</h3>
              <p className="text-xs sm:text-sm text-[#536582] dark:text-slate-300">
                {settings.location} — Ouvert du {settings.workingHours}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-[#EEF2F8] dark:bg-[#01184C] text-[#01184C] dark:text-[#D4AF37] border border-[#DDE4EE] dark:border-[#D4AF37]/30">
            République du Niger
          </span>
        </div>
      </div>
    </div>
  );
};
