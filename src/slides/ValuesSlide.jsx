import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../context/ThemeContext';
import { fadeUp, fadeIn, container } from '../utils/variants';
import { useRevealInView } from '../utils/useRevealInView';

import coreValueDarkUrl from '../img/core_value/core_value_dark.png?url';
import coreValueLightUrl from '../img/core_value/core_value_light.png?url';

const VP = { once: true, amount: 0.2 };

const listItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function ValuesSlide() {
  const { t, messages } = useI18n();
  const { values } = messages;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bodyFont = 'var(--font-body)';
  const contentReveal = useRevealInView(VP);
  const sideImageUrl = isDark ? coreValueDarkUrl : coreValueLightUrl;

  const listParagraphStyle = {
    fontFamily: bodyFont, fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', margin: 0, flex: 1, minWidth: 0,
  };
  const strongStyle = { color: 'var(--ink)', fontWeight: 700 };
  const dotStyle = {
    width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-dark)', opacity: 0.85, flexShrink: 0, marginTop: '0.55em',
  };

  const textBlock = (
    <motion.div
      ref={contentReveal.ref}
      variants={container}
      initial="hidden"
      animate={contentReveal.inView ? 'show' : 'hidden'}
      className="values-side-layout__text"
    >
      <div style={{ marginBottom: 28 }}>
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: bodyFont, fontWeight: 700, fontSize: 'clamp(28px,3.5vw,46px)',
            color: 'var(--ink)', marginBottom: 8, lineHeight: 1.2, textAlign: 'start',
          }}
        >
          {t('values.h2')}
        </motion.h2>
        <motion.p variants={fadeIn} style={{
          fontFamily: bodyFont, fontSize: 16, color: 'var(--label-muted)', fontWeight: 400,
          textAlign: 'start',
        }}>
          {t('values.sub')}
        </motion.p>
        <motion.div
          variants={fadeIn}
          style={{
            width: 56, height: 2, marginTop: 16,
            background: 'linear-gradient(90deg, var(--gold-light), var(--gold-dark))',
            marginInlineStart: 0, marginInlineEnd: 'auto',
          }}
        />
      </div>

      <motion.ul
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {values.items.map((item, i) => (
          <motion.li
            key={i}
            variants={listItemVariants}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 10,
              marginBottom: 18,
            }}
          >
            <span aria-hidden style={dotStyle} />
            <p style={{ ...listParagraphStyle, textAlign: 'start' }}>
              <strong style={strongStyle}>{item.name}:</strong>
              {' '}
              {item.desc}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );

  const side = <SideFigure key="side" url={sideImageUrl} />;

  return (
    <div
      className="landing-section values-section"
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--deep-surface-4)', color: 'var(--ink)',
      }}
    >
      <div
        className="values-side-layout"
        style={{ position: 'relative', zIndex: 2, padding: '0 7vw', maxWidth: 1200, margin: '0 auto', width: '100%' }}
      >
        <>{textBlock}{side}</>
      </div>
    </div>
  );
}

function SideFigure({ url }) {
  return (
    <figure
      className="values-side-layout__figure"
      style={{ margin: 0, minHeight: 280, position: 'relative', borderRadius: 16, overflow: 'hidden' }}
    >
      <img
        src={url}
        alt=""
        style={{ width: '100%', height: '100%', minHeight: 320, objectFit: 'cover', display: 'block' }}
        loading="lazy"
        decoding="async"
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)',
          pointerEvents: 'none',
        }}
      />
    </figure>
  );
}
