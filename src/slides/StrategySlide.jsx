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
  const { t, messages, isAr } = useI18n();
  const { strategy } = messages;
  const bodyFont = 'var(--font-body)';
  const headReveal = useRevealInView(VP);
  const listReveal = useRevealInView(VP);
  const presenceReveal = useRevealInView(VP);

  /* مطابقة قسم الرؤية/الرسالة: أحجام وأسطر وletter-spacing حسب isAr */
  const paraStyle = {
    fontFamily: bodyFont,
    fontSize: isAr ? 'clamp(14px,1.35vw,17px)' : 'clamp(13px,1.35vw,16px)',
    lineHeight: isAr ? 1.95 : 1.85,
    fontWeight: 400,
  };

  const dotStyle = {
    width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-dark)', opacity: 0.85, flexShrink: 0, marginTop: '0.55em',
  };
  /* عرض كامل داخل الصف/العمود — لا flex-shrink أفقي يسبب حرفاً لكل سطر */
  const lineStyle = {
    ...paraStyle,
    color: 'var(--warm-text)',
    margin: 0,
    maxWidth: '36rem',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
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
            <motion.h2
              variants={fadeUp}
              className="strategy-h2"
              style={{
                fontFamily: bodyFont, fontWeight: 700,
                fontSize: 'clamp(24px,3vw,42px)',
                letterSpacing: isAr ? 0 : 1,
                lineHeight: isAr ? 1.35 : 1.2,
                marginBottom: 16, textAlign: 'center',
              }}
            >
              <span
                className="vm-gradient-text"
                style={{
                  background: 'linear-gradient(135deg,var(--gold-light),var(--gold-dark))',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
                }}
              >{t('strategy.h2')}</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="strategy-intro" style={{
              ...paraStyle,
              color: 'var(--warm-text-mid)', margin: 0,
              textAlign: 'center', maxWidth: '36rem', width: '100%', boxSizing: 'border-box',
              marginLeft: 'auto', marginRight: 'auto',
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
                <p className="strategy-pillar-line" style={lineStyle}>{line}</p>
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
            <motion.h3 variants={fadeUp} className="strategy-h3" style={{
              fontFamily: bodyFont, fontWeight: 700,
              fontSize: isAr ? 'clamp(24px,3.2vw,44px)' : 'clamp(26px,3.2vw,46px)',
              letterSpacing: isAr ? 0 : 1,
              lineHeight: isAr ? 1.35 : 1.2,
              color: 'var(--warm-fg)', marginBottom: 16, textAlign: 'center',
            }}>{t('strategy.presenceTitle')}</motion.h3>
            <motion.div variants={fadeIn} style={titleRuleStyle(48, { marginBottom: 20 })} />
            <motion.p variants={fadeUp} className="strategy-presence-body" style={{
              ...paraStyle,
              color: 'var(--warm-text-mid)', margin: 0, textAlign: 'center', maxWidth: '36rem', width: '100%',
              boxSizing: 'border-box', marginLeft: 'auto', marginRight: 'auto',
            }}>{t('strategy.presenceBody')}</motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
