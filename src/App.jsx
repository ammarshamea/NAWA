import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useI18n } from './i18n/I18nContext';
import HeroSection from './slides/HeroSection';
import MissionVisionSlide from './slides/MissionVisionSlide';
import ValuesSlide from './slides/ValuesSlide';
import DivisionsSlide from './slides/DivisionsSlide';
import ServicesSlide from './slides/ServicesSlide';
import StrategySlide from './slides/StrategySlide';
import ContactSlide from './slides/ContactSlide';
import WebFooter from './components/WebFooter';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitch from './components/LanguageSwitch';

const SECTIONS = [
  { id: 'hero', Component: HeroSection },
  { id: 'overview', Component: MissionVisionSlide },
  { id: 'values', Component: ValuesSlide },
  { id: 'divisions', Component: DivisionsSlide },
  { id: 'services', Component: ServicesSlide },
  { id: 'strategy', Component: StrategySlide },
  { id: 'contact', Component: ContactSlide },
];

const NAV_LINKS = [
  { id: 'overview', k: 'nav.overview' },
  { id: 'divisions', k: 'nav.divisions' },
  { id: 'services', k: 'nav.services' },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const goToSection = useCallback((id) => {
    scrollToId(id);
    setNavOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setNavOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [navOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const onWide = () => { if (mq.matches) setNavOpen(false); };
    mq.addEventListener('change', onWide);
    return () => mq.removeEventListener('change', onWide);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <motion.header
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <button type="button" className="navbar-logo" onClick={() => goToSection('hero')}>
          <img
            src="/src/img/nawa_logo.png"
            alt={t('a11y.logo')}
            style={{ width: 38, height: 38, objectFit: 'contain' }}
          />
          <span className="navbar-logo-text">NAWA</span>
        </button>

        <nav className="navbar-nav" aria-label={t('a11y.mainNav')}>
          {NAV_LINKS.map(({ id, k }) => (
            <button key={id} type="button" className="navbar-link" onClick={() => goToSection(id)}>
              {t(k)}
            </button>
          ))}
          <button type="button" className="navbar-cta" onClick={() => goToSection('contact')}>
            {t('nav.contactCta')}
          </button>
        </nav>
        <div className="navbar-end">
          <button
            type="button"
            className="navbar-menu-btn"
            aria-expanded={navOpen}
            aria-controls="nav-mobile-panel"
            onClick={() => setNavOpen((o) => !o)}
            aria-label={navOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
          >
            {navOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </motion.header>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            key="nav-layer"
            className="nav-mobile-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="nav-mobile-backdrop"
              aria-label={t('a11y.closeMenu')}
              onClick={() => setNavOpen(false)}
            />
            <nav
              id="nav-mobile-panel"
              className="nav-mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label={t('a11y.mainNav')}
            >
              {NAV_LINKS.map(({ id, k }) => (
                <button key={id} type="button" className="nav-mobile-link" onClick={() => goToSection(id)}>
                  {t(k)}
                </button>
              ))}
              <button type="button" className="nav-mobile-cta" onClick={() => goToSection('contact')}>
                {t('nav.contactCta')}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {SECTIONS.map(({ id, Component }) => (
          <section key={id} id={id} className={id === 'hero' ? 'landing-hero-wrap' : undefined}>
            <Component />
          </section>
        ))}
      </main>

      <WebFooter onNav={scrollToId} />
    </div>
  );
}
