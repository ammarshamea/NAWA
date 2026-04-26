import React from 'react';
import { motion } from 'framer-motion';
import GeoPattern from '../components/GeoPattern';
import { useI18n } from '../i18n/I18nContext';
import { fadeUp, fadeIn, container } from '../utils/variants';
import { useRevealInView } from '../utils/useRevealInView';

const VP = { once: true, amount: 0.2 };

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function StrategySlide() {
  const { t, messages } = useI18n();
  const { strategy } = messages;
  const bodyFont = 'var(--font-body)';
  const headReveal = useRevealInView(VP);
  const listReveal = useRevealInView(VP);
  const presenceReveal = useRevealInView(VP);

  const dotStyle = {
    width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-dark)', opacity: 0.85, flexShrink: 0, marginTop: '0.55em',
  };
  const lineStyle = {
    fontFamily: bodyFont, fontSize: 15, lineHeight: 1.75, color: 'var(--warm-text)', margin: 0, flex: '0 1 auto', maxWidth: 'min(100%, 36rem)', fontWeight: 400, textAlign: 'center',
  };
  const titleRuleStyle = (w, more = {}) => ({
    width: w,
    height: 2,
    background: 'linear-gradient(90deg,var(--gold-light),var(--gold-dark))',
    margin: '0 auto',
    display: 'block',
    ...more,
  });

  return (
    <div className="landing-section" style={{ background: 'var(--warm-surface)', color: 'var(--warm-fg)', padding: 0, overflow: 'hidden' }}>
      <GeoPattern opacity={0.05} color="var(--geo-warm)" />

      <div className="strategy-presence-grid">
        {/* الاستراتيجية + الركائز */}
        <div className="strategy-presence-col strategy-presence-grid__strat">
          <motion.div
            ref={headReveal.ref}
            variants={container}
            initial="hidden"
            animate={headReveal.inView ? 'show' : 'hidden'}
            style={{ marginBottom: 20 }}
          >
            <motion.h2 variants={fadeUp} style={{
              fontFamily: bodyFont, fontWeight: 700,
              fontSize: 'clamp(28px,3.5vw,50px)',
              background: 'linear-gradient(135deg,var(--gold-light),var(--gold-dark))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 16, textAlign: 'center',
            }}>{t('strategy.h2')}</motion.h2>
            <motion.p variants={fadeIn} style={{
              fontFamily: bodyFont, fontSize: 16, color: 'var(--warm-text-mid)', fontWeight: 400, lineHeight: 1.7, margin: 0,
              textAlign: 'center', maxWidth: 'min(100%, 36rem)', marginLeft: 'auto', marginRight: 'auto',
            }}>{t('strategy.intro')}</motion.p>
            <motion.div variants={fadeIn} style={titleRuleStyle(56, { marginTop: 20 })} />
          </motion.div>

          <motion.ul
            ref={listReveal.ref}
            className="strategy-presence-pillars"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
            initial="hidden"
            animate={listReveal.inView ? 'show' : 'hidden'}
          >
            {strategy.pillars.map((line, i) => (
              <motion.li
                key={i}
                variants={listItemVariants}
              >
                <span aria-hidden style={dotStyle} />
                <p style={lineStyle}>{line}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* الحضور والتأثير */}
        <div className="strategy-presence-col strategy-presence-grid__presence">
          <motion.div
            ref={presenceReveal.ref}
            variants={container}
            initial="hidden"
            animate={presenceReveal.inView ? 'show' : 'hidden'}
            style={{ height: '100%' }}
          >
            <motion.h3 variants={fadeUp} style={{
              fontFamily: bodyFont, fontWeight: 700,
              fontSize: 'clamp(22px,2.8vw,36px)',
              color: 'var(--warm-fg)', marginBottom: 16, lineHeight: 1.3, textAlign: 'center',
            }}>{t('strategy.presenceTitle')}</motion.h3>
            <motion.div variants={fadeIn} style={titleRuleStyle(48, { marginBottom: 20 })} />
            <motion.p variants={fadeUp} style={{
              fontFamily: bodyFont, fontWeight: 400, fontSize: 15, lineHeight: 1.9,
              color: 'var(--warm-text-mid)', margin: 0, textAlign: 'center', maxWidth: 'min(100%, 36rem)',
              marginLeft: 'auto', marginRight: 'auto',
            }}>{t('strategy.presenceBody')}</motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
