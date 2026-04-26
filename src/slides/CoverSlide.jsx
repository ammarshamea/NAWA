import React from 'react';
import { motion } from 'framer-motion';
import GeoPattern from '../components/GeoPattern';

const CHAR_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

export default function CoverSlide() {
  return (
    <div className="landing-section landing-section--hero" style={{
      background: 'linear-gradient(160deg, #0d0900 0%, #1a1000 40%, #0d0900 100%)',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      minHeight: '100vh',
    }}>
      <GeoPattern opacity={0.06} />

      {/* Animated pulse rings */}
      {[700, 520, 340].map((size, i) => (
        <motion.div
          key={size}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: size, height: size, borderRadius: '50%',
            border: '1px solid rgba(235,191,91,0.1)',
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, scale: 0.7, x: '-50%', y: '-50%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Spinning accent ring */}
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 420, height: 420, borderRadius: '50%',
          border: '1px dashed rgba(235,191,91,0.06)',
          pointerEvents: 'none',
          animation: 'spin-slow 40s linear infinite',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* Corner SVG decorations */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: 200, height: 200, opacity: 0.25 }}>
        <line x1="0" y1="80" x2="80" y2="0" stroke="var(--gold-light)" strokeWidth="1" />
        <line x1="0" y1="130" x2="130" y2="0" stroke="var(--gold-light)" strokeWidth="0.5" />
        <line x1="0" y1="180" x2="180" y2="0" stroke="var(--gold-light)" strokeWidth="0.25" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, right: 0, width: 200, height: 200, opacity: 0.25 }}>
        <line x1="200" y1="120" x2="120" y2="200" stroke="var(--gold-light)" strokeWidth="1" />
        <line x1="200" y1="70" x2="70" y2="200" stroke="var(--gold-light)" strokeWidth="0.5" />
        <line x1="200" y1="20" x2="20" y2="200" stroke="var(--gold-light)" strokeWidth="0.25" />
      </svg>

      {/* Gold top accent line */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold-dark), transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 40px' }}>
        {/* Logo circle */}
        <motion.div
          style={{ marginBottom: 44 }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 92, height: 92, borderRadius: '50%',
            border: '2px solid rgba(235,191,91,0.7)',
            background: 'rgba(235,191,91,0.07)',
          }}>
            <span style={{
              fontFamily: 'var(--font-en)',
              fontSize: 34, fontWeight: 700, letterSpacing: 3,
              background: 'linear-gradient(135deg,var(--gold-light),var(--gold-dark))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>N</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          style={{
            fontFamily: 'var(--font-en)',
            fontWeight: 700, fontSize: 'clamp(42px, 7vw, 80px)',
            letterSpacing: 14, textTransform: 'uppercase',
            background: 'linear-gradient(135deg, var(--gold-light), #fff8e1, var(--gold-dark))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 10, lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 30, letterSpacing: 30 }}
          animate={{ opacity: 1, y: 0, letterSpacing: 14 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          NAWA
        </motion.h1>

        <motion.p
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: 'clamp(11px, 1.5vw, 15px)', letterSpacing: 8,
            color: 'rgba(235,191,91,0.65)', textTransform: 'uppercase',
            marginBottom: 44,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          HOLDING COMPANY
        </motion.p>

        {/* Gold divider */}
        <motion.div
          style={{
            width: 80, height: 1,
            background: 'linear-gradient(90deg, transparent, var(--gold-light), transparent)',
            margin: '0 auto 44px',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Taglines */}
        <motion.p
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: 'clamp(14px, 1.8vw, 20px)', fontWeight: 400,
            letterSpacing: 2, color: 'rgba(255,248,225,0.85)',
            marginBottom: 12,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Building Value… Shaping the Future
        </motion.p>

        <motion.p
          style={{
            fontFamily: 'var(--font-ar)',
            fontSize: 'clamp(15px, 1.8vw, 21px)', fontWeight: 400,
            color: 'rgba(235,191,91,0.7)', direction: 'rtl',
            marginBottom: 52,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          نمو القيمة... تشكيل المستقبل
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span>Scroll to explore</span>
        <div className="scroll-indicator-arrow" />
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
        background: 'linear-gradient(transparent, rgba(13,9,0,0.9))',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
