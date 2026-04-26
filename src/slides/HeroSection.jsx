import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../context/ThemeContext';

/* ─── Canvas configs ─────────────────────────────────────────────────────── */
const DARK_CFG = {
  count: 90, maxDist: 140, speed: 0.35,
  rMin: 0.4, rMax: 2.0, aMin: 0.2, aMax: 0.8,
  getColor: (a) => { const h = 38 + Math.random() * 12; return `hsla(${h},85%,65%,${a})`; },
  lineRgb: '235,191,91', lineAlpha: 0.18, lineWidth: 0.6,
};
const LIGHT_CFG = {
  count: 80, maxDist: 130, speed: 0.28,
  rMin: 0.6, rMax: 2.2, aMin: 0.45, aMax: 0.85,
  getColor: (a) => { const h = 28 + Math.random() * 18; return `hsla(${h},80%,32%,${a})`; },
  lineRgb: '140,90,10', lineAlpha: 0.22, lineWidth: 0.7,
};

/* ─── Canvas particle constellation ─────────────────────────────────────── */
function useParticleCanvas(canvasRef, isDark) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cfg = isDark ? DARK_CFG : LIGHT_CFG;
    let animId;
    let W, H;
    const particles = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x  = Math.random() * W;
        this.y  = init ? Math.random() * H : Math.random() * H;
        this.vx = (Math.random() - 0.5) * cfg.speed;
        this.vy = (Math.random() - 0.5) * cfg.speed;
        this.r  = Math.random() * (cfg.rMax - cfg.rMin) + cfg.rMin;
        this.a  = Math.random() * (cfg.aMax - cfg.aMin) + cfg.aMin;
        this.color = cfg.getColor(this.a);
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < cfg.count; i++) particles.push(new Particle());
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < cfg.maxDist) {
            const alpha = (1 - dist / cfg.maxDist) * cfg.lineAlpha;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${cfg.lineRgb},${alpha})`;
            ctx.lineWidth = cfg.lineWidth;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(loop);
    };

    resize(); init(); loop();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [canvasRef, isDark]);
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useParticleCanvas(canvasRef, isDark);
  const { t, isAr, messages } = useI18n();
  const { overview } = messages;
  const bodyFont = 'var(--font-body)';

  return (
    <div
      className="landing-section landing-section--hero"
      style={{ background: 'var(--hero-base)' }}
    >
      {/* Live canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          display: 'block', pointerEvents: 'none',
        }}
      />

      {/* Radial vignette over canvas */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--hero-fade) 100%)',
      }} />

      {/* Corner SVG lines */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: 200, height: 200, opacity: 0.2, pointerEvents: 'none' }}>
        <line x1="0" y1="80"  x2="80"  y2="0"   stroke="var(--gold-light)" strokeWidth="1" />
        <line x1="0" y1="130" x2="130" y2="0"   stroke="var(--gold-light)" strokeWidth="0.5" />
        <line x1="0" y1="180" x2="180" y2="0"   stroke="var(--gold-light)" strokeWidth="0.25" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, right: 0, width: 200, height: 200, opacity: 0.2, pointerEvents: 'none' }}>
        <line x1="200" y1="120" x2="120" y2="200" stroke="var(--gold-light)" strokeWidth="1" />
        <line x1="200" y1="70"  x2="70"  y2="200" stroke="var(--gold-light)" strokeWidth="0.5" />
        <line x1="200" y1="20"  x2="20"  y2="200" stroke="var(--gold-light)" strokeWidth="0.25" />
      </svg>

      {/* Gold top accent */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold-dark), transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── عمود يسار: شعار + هوية  |  عمود يمين: «من نحن» (ترتيب أعمدة ثابت) ── */}
      <div className="hero-split">
        <div className="hero-split__brand">
          <motion.div
            style={{ marginBottom: 36 }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img
              src="/src/img/nawa_logo.png"
              alt={t('a11y.logo')}
              style={{
                width: 'clamp(200px, 32vw, 320px)',
                height: 'clamp(200px, 32vw, 320px)',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </motion.div>

          <motion.h1
            style={{
              fontFamily: 'var(--font-en)',
              fontWeight: 700, fontSize: 'clamp(48px, 7.5vw, 96px)',
              textTransform: 'uppercase',
              background: 'var(--grad-hero)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 10, lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 24, letterSpacing: 18 }}
            animate={{ opacity: 1, y: 0, letterSpacing: 12 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            NAWA
          </motion.h1>

          <motion.p
            style={{
              fontFamily: bodyFont,
              fontSize: 'clamp(12px, 1.5vw, 16px)', letterSpacing: 8,
              color: 'var(--label-muted)', textTransform: isAr ? 'none' : 'uppercase',
              marginBottom: 24,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
          >
            {isAr ? t('hero.holding') : t('hero.holding').toUpperCase()}
          </motion.p>

          <motion.div
            style={{
              width: 100, height: 1,
              background: 'linear-gradient(90deg, transparent, var(--gold-light), transparent)',
              marginBottom: 24,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            className="hero-split__tagline"
            style={{
              fontFamily: bodyFont,
              fontSize: isAr ? 'clamp(18px, 2.2vw, 26px)' : 'clamp(16px, 1.8vw, 22px)',
              fontWeight: 400,
              letterSpacing: isAr ? 0 : 1.5,
              color: 'var(--ink-muted)',
              lineHeight: 1.55,
              maxWidth: 420,
              margin: 0,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hero.tagline')}
          </motion.p>
        </div>

        <div
          className="hero-split__about"
          style={{ textAlign: 'start' }}
        >
            <motion.h2
              style={{
                fontFamily: bodyFont, fontWeight: 700,
                fontSize: 'clamp(26px, 3.2vw, 42px)', letterSpacing: isAr ? 0 : 0.5,
                background: 'linear-gradient(135deg, var(--gold-light), var(--gold-dark))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                marginBottom: 20, lineHeight: 1.2,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('overview.title')}
            </motion.h2>
            <div
              style={{
                width: 48, height: 2, marginBottom: 20,
                background: 'linear-gradient(90deg, var(--gold-light), var(--gold-dark))',
                marginInlineStart: 0, marginInlineEnd: 'auto',
              }}
            />
            {overview.bodyParagraphs.map((para, i) => (
              <motion.p
                key={i}
                style={{
                  fontFamily: bodyFont, fontWeight: 400, margin: 0, marginBottom: i < overview.bodyParagraphs.length - 1 ? 16 : 0,
                  fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.9,
                  color: 'var(--ink-muted)',
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.7 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {para}
              </motion.p>
            ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(transparent, var(--hero-fade))',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
