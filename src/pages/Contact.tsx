import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { t } from '../data/i18n';

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
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] text-[#111] dark:text-white transition-colors duration-500 px-6 sm:px-12 md:px-24 pt-32 pb-20 select-text">
      <Helmet>
        <title>Contacto | Sebastian</title>
        <meta name="description" content="Ponte en contacto con Sebastian para colaborar en tu próximo proyecto web." />
        <link rel="canonical" href="https://pwn27sbx.github.io/mi-portafolio/contacto" />
      </Helmet>
      <nav className="fixed top-0 left-0 w-full p-4 sm:p-8 flex justify-between items-center z-50 mix-blend-difference">

        <Link to="/" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          className="text-xs uppercase tracking-[0.2em] text-white hover:text-[#00A889] transition-colors duration-300 md:cursor-none">
          ← {t('back', lang)}
        </Link>
      </nav>

      <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
        className="font-anton text-[15vw] sm:text-[10vw] leading-none uppercase tracking-tighter mb-12">
        {t('contactTitle', lang)}
      </motion.h1>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{t('contactName', lang)}</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('contactPlaceholder', lang)}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-3 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00A889] transition-colors duration-300 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{t('contactEmail', lang)}</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t('emailPlaceholder', lang)}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-3 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00A889] transition-colors duration-300 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{t('contactMsg', lang)}</label>
            <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t('msgPlaceholder', lang)}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-3 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00A889] transition-colors duration-300 text-sm resize-none"
              required
            />
          </div>
          <button type="submit" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            className="self-start px-10 py-4 bg-[#00A889] text-white rounded-full font-anton text-sm uppercase tracking-widest hover:bg-[#00c5a1] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00A889]/30 md:cursor-none"
          >
            {t('contactSend', lang)}
          </button>
          {status === 'success' && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#00A889] text-sm">
              {t('contactSuccess', lang)}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};
export default Contact;
