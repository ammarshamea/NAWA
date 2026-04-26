import React, { useEffect, useRef, useId } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ─── Star-particle configs per theme ───────────────────────────────────── */
const STAR_DARK = {
  count: 38, speed: 0.14,
  rMin: 0.3, rMax: 1.4,
  aMin: 0.18, aMax: 0.55,
  getColor: (a) => {
    const h = 38 + Math.random() * 14;
    return `hsla(${h},80%,68%,${a})`;
  },
};

const STAR_LIGHT = {
  count: 45, speed: 0.18,
  rMin: 0.5, rMax: 1.8,
  aMin: 0.45, aMax: 0.80,
  getColor: (a) => {
    const h = 28 + Math.random() * 18;
    return `hsla(${h},78%,30%,${a})`;
  },
};

function useStarCanvas(canvasRef, isDark) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cfg = isDark ? STAR_DARK : STAR_LIGHT;
    let animId;
    let W, H;
    const stars = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    class Star {
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

    resize();
    for (let i = 0; i < cfg.count; i++) {
      const s = new Star();
      s.reset(true);
      stars.push(s);
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => { s.update(); s.draw(); });
      animId = requestAnimationFrame(loop);
    };
    loop();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [canvasRef, isDark]);
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function GeoPattern({ opacity = 0.06, color }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const canvasRef = useRef(null);
  const uid = useId().replace(/:/g, '-');
  useStarCanvas(canvasRef, isDark);

  const strokeColor = color ?? (isDark ? 'var(--gold-light)' : 'var(--brand-gold-dark)');
  const svgOpacity  = isDark ? opacity : opacity * 1.6;

  return (
    <>
      {/* SVG geometric (Islamic star) background pattern */}
      <svg
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          opacity: svgOpacity, pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`geo-${uid}`}
            x="0" y="0" width="80" height="80"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="40,10 47,30 68,30 52,43 58,64 40,52 22,64 28,43 12,30 33,30"
              fill="none" stroke={strokeColor} strokeWidth="0.6"
            />
            <rect
              x="20" y="20" width="40" height="40"
              fill="none" stroke={strokeColor} strokeWidth="0.4"
              transform="rotate(45 40 40)"
            />
            <circle cx="40" cy="40" r="12" fill="none" stroke={strokeColor} strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#geo-${uid})`} />
      </svg>

      {/* Canvas star-particle overlay — dark: gold stars, light: amber dust */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          display: 'block', pointerEvents: 'none',
          opacity: isDark ? 0.85 : 1,
        }}
      />
    </>
  );
}
