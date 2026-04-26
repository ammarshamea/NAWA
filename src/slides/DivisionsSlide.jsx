import React from 'react';
import { motion } from 'framer-motion';
import { Building, Film, Megaphone } from 'lucide-react';
import GeoPattern from '../components/GeoPattern';
import { useI18n } from '../i18n/I18nContext';
import { fadeUp, fadeIn, fadeLeft, fadeRight, container } from '../utils/variants';
import { useRevealInView } from '../utils/useRevealInView';

const ICONS = [Building, Film, Megaphone];
const VP = { once: true, amount: 0.2 };

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function DivisionsSlide() {
  const { t, messages } = useI18n();
  const { divisions } = messages;
  const bodyFont = 'var(--font-body)';
  const headReveal = useRevealInView(VP);
  const gridReveal = useRevealInView(VP);

  return (
    <div className="landing-section" style={{
      background: 'var(--warm-surface)', color: 'var(--warm-fg)',
    }}>
      <GeoPattern opacity={0.05} color="var(--geo-warm)" />

      <div style={{
        position: 'absolute', top: -100, insetInlineEnd: -150,
        width: 460, height: 460, borderRadius: '50%',
        border: '1px solid var(--warm-arc)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '0 7vw', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <motion.div
          ref={headReveal.ref}
          variants={container}
          initial="hidden"
          animate={headReveal.inView ? 'show' : 'hidden'}
          style={{ marginBottom: 56, textAlign: 'start' }}
        >
          <div className="divisions-head">
            <motion.h2 variants={fadeLeft} style={{
              fontFamily: bodyFont, fontWeight: 700,
              fontSize: 'clamp(28px,3.5vw,50px)',
              background: 'linear-gradient(135deg,var(--gold-light),var(--gold-dark))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{t('divisions.h2')}</motion.h2>
            <motion.p variants={fadeRight} className="divisions-sub" style={{
              fontFamily: bodyFont, color: 'var(--warm-text-mid)', fontWeight: 700, margin: 0,
            }}>{t('divisions.sub')}</motion.p>
          </div>
          <motion.div variants={fadeIn} style={{ width: 56, height: 2, background: 'linear-gradient(90deg,var(--gold-light),var(--gold-dark))', marginTop: 14, marginInlineStart: 0, marginInlineEnd: 'auto' }} />
        </motion.div>

        <motion.div
          ref={gridReveal.ref}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          initial="hidden"
          animate={gridReveal.inView ? 'show' : 'hidden'}
          className="divisions-grid"
        >
          {divisions.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="hover-card-light"
                style={{
                  background: 'var(--warm-card-bright)',
                  border: '1px solid var(--warm-border)',
                  borderRadius: 16, padding: '38px 28px',
                  backdropFilter: 'blur(10px)', cursor: 'default',
                }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 62, height: 62, borderRadius: '50%', marginBottom: 26,
                  background: 'linear-gradient(135deg,var(--gold-light),var(--gold-dark))',
                  boxShadow: '0 8px 24px rgba(181,133,22,0.25)',
                }}>
                  <Icon size={26} color="#fff" />
                </div>
                <h3 style={{
                  fontFamily: bodyFont, fontWeight: 700,
                  fontSize: 17, color: 'var(--warm-fg)', marginBottom: 14, textAlign: 'start',
                }}>{item.title}</h3>
                <div style={{ width: 36, height: 1.5, background: 'linear-gradient(90deg,var(--gold-light),var(--gold-dark))', marginBottom: 18, marginInlineStart: 0, marginInlineEnd: 'auto' }} />
                <p style={{
                  fontFamily: bodyFont, fontWeight: 400,
                  fontSize: 13, lineHeight: 1.9, color: 'var(--warm-text-mid)', textAlign: 'start',
                }}>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
