import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GeoPattern from '../components/GeoPattern';
import { useI18n } from '../i18n/I18nContext';
import { fadeUp, fadeIn, container } from '../utils/variants';
import { useRevealInView } from '../utils/useRevealInView';

const VP = { once: true, amount: 0.2 };

const panelAnim = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2, delay: 0.05 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { height: { duration: 0.24 }, opacity: { duration: 0.12 } },
  },
};

export default function ServicesSlide() {
  const { t, messages } = useI18n();
  const { services } = messages;
  const bodyFont = 'var(--font-body)';
  const headReveal = useRevealInView(VP);
  const listReveal = useRevealInView(VP);
  const showSub = Boolean(services.sub && String(services.sub).trim());
  const baseId = useId();
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen((v) => (v === i ? null : i));

  return (
    <div className="landing-section" style={{ background: 'var(--deep-surface-2)' }}>
      <GeoPattern opacity={0.06} />

      <div style={{ position: 'relative', zIndex: 2, padding: '0 7vw', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <motion.div
          ref={headReveal.ref}
          variants={container}
          initial="hidden"
          animate={headReveal.inView ? 'show' : 'hidden'}
          style={{ marginBottom: 40 }}
        >
          <div style={{ textAlign: 'start' }}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: bodyFont, fontWeight: 700,
              fontSize: 'clamp(28px,3.5vw,50px)',
              background: 'var(--grad-h2-dual)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{t('services.h2')}</motion.h2>
            {showSub && (
              <motion.p variants={fadeIn} style={{
                fontFamily: bodyFont, fontSize: 18, lineHeight: 1.5, color: 'var(--label-muted)', fontWeight: 400, marginTop: 8,
              }}>{t('services.sub')}</motion.p>
            )}
            <motion.div variants={fadeIn} style={{ width: 56, height: 2, background: 'linear-gradient(90deg,var(--gold-light),var(--gold-dark))', marginTop: 14, marginInlineStart: 0, marginInlineEnd: 'auto' }} />
          </div>
        </motion.div>

        <ul
          ref={listReveal.ref}
          className="services-accordion-grid"
        >
          {services.list.map((row, i) => {
            const isOpen = open === i;
            const desc = row.desc ?? '';
            const triggerId = `${baseId}-svc-${i}-btn`;
            const panelId = `${baseId}-svc-${i}-panel`;
            return (
              <li key={i} className="hover-card">
                <div
                  style={{
                    border: '1px solid var(--surface-glass-b)',
                    borderRadius: 12,
                    background: 'var(--surface-glass)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    id={triggerId}
                    className="services-accordion__trigger"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`${isOpen ? t('a11y.collapseService') : t('a11y.expandService')} ${row.title}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 14,
                      padding: '16px 18px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'start',
                      color: 'var(--ink)',
                      fontFamily: bodyFont,
                      fontWeight: 700,
                      fontSize: 15,
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ flex: 1, minWidth: 0, textAlign: 'start' }}>{row.title}</span>
                    <ChevronDown
                      size={22}
                      color="var(--gold-dark)"
                      strokeWidth={2.25}
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && desc && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        key="panel"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={panelAnim}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{
                            padding: '0 18px 18px',
                            borderTop: '1px solid var(--surface-glass-b)',
                            background: 'var(--surface-glass-2)',
                          }}
                        >
                          <p style={{
                            fontFamily: bodyFont, fontWeight: 400, fontSize: 14, lineHeight: 1.85,
                            color: 'var(--ink-muted)', margin: 0, textAlign: 'start',
                          }}>
                            {desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
