import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';
import ScrambledText from '../components/common/ScrambledText';
import GlitchText from '../components/common/GlitchText';
import TextType from '../components/common/TextType';

const Contact = () => {
  const { lang, setIsHovering } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen relative bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] bg-fixed text-[#111] dark:text-white font-sans transition-colors duration-500 overflow-x-hidden pt-24 pb-20 px-6 sm:px-12 md:px-24">
      <Helmet>
        <title>Contacto | Sebastian</title>
        <meta name="description" content="Ponte en contacto con Sebastian para colaborar en tu próximo proyecto web." />
        <link rel="canonical" href="https://pwn27sbx.github.io/mi-portafolio/contacto" />
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-4 sm:p-8 flex justify-between items-center z-[100] pointer-events-none left-0">
        <Link 
          to="/" 
          className="ml-0 sm:ml-4 pointer-events-auto group flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 text-secondary bg-transparent hover:text-primary transition-colors duration-300"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="relative z-10 font-mono">[ ← {t('back', lang) || 'BACK'} ]</span>
        </Link>
      </nav>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-4 sm:pt-8 pb-12 flex flex-col items-start relative z-20"
      >
        <div className="font-mono text-xs sm:text-sm text-primary mb-4 tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-primary animate-pulse" />
          <ScrambledText text="[ SECURE_COMMS_CHANNEL // ESTABLISHED ]" speed={0.4} />
        </div>
        <h1 className="font-anton text-6xl sm:text-8xl md:text-[10vw] uppercase tracking-tighter leading-none text-transparent [-webkit-text-stroke:2px_#111] dark:[-webkit-text-stroke:2px_#fff] mb-12">
          <GlitchText speed={1.2} enableShadows enableOnHover={false}>
            {t('contactTitle', lang)}
          </GlitchText>
        </h1>
      </motion.header>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-xl relative z-30"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          <div className="relative group">
            <label className="text-xs font-mono uppercase tracking-widest text-secondary mb-2 block flex items-center gap-2">
              <span className="text-primary">&gt;</span> <TextType text={t('contactName', lang) || 'NAME'} as="span" showCursor={false} />
            </label>
            <div className="relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t('contactPlaceholder', lang)}
                className="w-full bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-gray-800 p-4 font-mono text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300 text-sm"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-mono uppercase tracking-widest text-secondary mb-2 block flex items-center gap-2">
              <span className="text-primary">&gt;</span> <TextType text={t('contactEmail', lang) || 'EMAIL'} as="span" showCursor={false} />
            </label>
            <div className="relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t('emailPlaceholder', lang)}
                className="w-full bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-gray-800 p-4 font-mono text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300 text-sm"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-mono uppercase tracking-widest text-secondary mb-2 block flex items-center gap-2">
              <span className="text-primary">&gt;</span> <TextType text={t('contactMsg', lang) || 'MESSAGE'} as="span" showCursor={false} />
            </label>
            <div className="relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
              <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t('msgPlaceholder', lang)}
                className="w-full bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-gray-800 p-4 font-mono text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300 text-sm resize-none"
                required
              />
            </div>
          </div>

          <button type="submit" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            className="self-start mt-4 px-6 py-3 border border-secondary text-secondary font-mono text-xs sm:text-sm uppercase tracking-widest hover:text-black hover:bg-secondary transition-all duration-300 md:cursor-none relative group overflow-hidden"
          >
            <span className="relative z-10">[ TRANSMIT_MESSAGE ]</span>
          </button>
          
          {status === 'success' && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-secondary font-mono text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary animate-pulse" />
              {t('contactSuccess', lang) || 'MESSAGE_SENT_SUCCESSFULLY'}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};
export default Contact;
