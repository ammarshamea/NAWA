import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, TrendingUp, Eye, Target } from 'lucide-react';
import GeoPattern from '../components/GeoPattern';
import { useI18n } from '../i18n/I18nContext';
import { fadeUp, fadeIn, fadeLeft, scaleIn, container } from '../utils/variants';
import { useRevealInView } from '../utils/useRevealInView';

const VP = { once: true, amount: 0.2 };
const VP2 = { once: true, amount: 0.22 };
const ICONS = [Building2, Globe, TrendingUp];

export default function OverviewSlide() {
  const { t, isAr, messages } = useI18n();
  const { overview } = messages;
  const bodyFont = 'var(--font-body)';
  const bodyReveal = useRevealInView(VP);
  const visionMissionReveal = useRevealInView(VP2);

  return (
    <div
      className="landing-section"
      style={{
        padding: 0,
        overflow: 'hidden',
        color: 'var(--ink)',
      }}
    >
      {/* —— من نحن / Overview —— */}
      <div style={{ position: 'relative', background: 'transparent' }}>
        <div
          style={{
            position: 'relative', zIndex: 2, padding: '100px 7vw', maxWidth: 800, margin: '0 auto', width: '100%',
          }}
        >
          <motion.div
            ref={bodyReveal.ref}
            variants={container}
            initial="hidden"
            animate={bodyReveal.inView ? 'show' : 'hidden'}
          >
            <motion.p
              variants={fadeLeft}
              style={{
                fontFamily: bodyFont, fontWeight: 700,
                fontSize: 'clamp(20px,2.2vw,28px)', letterSpacing: 0.5,
                color: 'var(--ink)', marginBottom: 12, textAlign: 'start',
              }}
            >{t('overview.infoBlockTitle')}</motion.p>
            <motion.div
              variants={fadeIn}
              style={{
                width: 44, height: 2, marginBottom: 28,
                background: 'linear-gradient(90deg,var(--gold-light),var(--gold-dark))',
                marginInlineStart: 0, marginInlineEnd: 'auto',
              }}
            />
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
            >
              {overview.info.map((row, i) => {
                const Icon = ICONS[i];
                return (
                  <motion.div key={i} variants={fadeUp} className="overview-info-row">
                    <div
                      className="overview-info-row__ic"
                      style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'var(--surface-glass)',
                        border: '1px solid var(--surface-glass-b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Icon size={18} color="var(--gold-dark)" />
                    </div>
                    <div className="overview-info-row__tx">
                      <p style={{ fontSize: 10, letterSpacing: 2.5, color: 'var(--gold-dark)', textTransform: isAr ? 'none' : 'uppercase', fontFamily: bodyFont, marginBottom: 2 }}>{row.k}</p>
                      <p style={{ fontSize: 14, color: 'var(--ink-muted)', fontFamily: bodyFont, fontWeight: 700 }}>{row.v}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* —— الرسالة يساراً + الرؤية يميناً (عمودان) —— */}
      <div
        style={{
          position: 'relative', background: 'var(--deep-surface)', color: 'var(--ink)', padding: 0,
        }}
      >
        <GeoPattern opacity={0.06} />

        {[700, 500, 320].map((s, i) => {
          const ring = `var(--deco-ring-${i})`;
          return (
            <div
              key={s}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                width: s, height: s, borderRadius: '50%',
                border: `1px solid ${ring}`,
                transform: 'translate(-50%,-50%)', pointerEvents: 'none',
              }}
            />
          );
        })}

        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold-dark), transparent)',
          }}
        />

        <motion.div
          ref={visionMissionReveal.ref}
          variants={container}
          initial="hidden"
          animate={visionMissionReveal.inView ? 'show' : 'hidden'}
          className="overview-vision-mission-grid"
          style={{
            position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', width: '100%',
            padding: '88px 7vw 100px', display: 'grid', alignItems: 'start',
          }}
        >
          <VisionMissionBlock
            key="mission"
            kind="mission"
            t={t}
            isAr={isAr}
            bodyFont={bodyFont}
            fadeUp={fadeUp}
            fadeIn={fadeIn}
            scaleIn={scaleIn}
          />
          <VisionMissionBlock
            key="vision"
            kind="vision"
            t={t}
            isAr={isAr}
            bodyFont={bodyFont}
            fadeUp={fadeUp}
            fadeIn={fadeIn}
            scaleIn={scaleIn}
          />
        </motion.div>
      </div>
    </div>
  );
}

function VisionMissionBlock({ kind, t, isAr, bodyFont, fadeUp, fadeIn, scaleIn }) {
  const isVision = kind === 'vision';
  return (
    <div
      className={isVision ? 'vm-vision' : 'vm-mission'}
      style={{ minWidth: 0, textAlign: 'center' }}
    >
      <motion.div variants={scaleIn} style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--warm-icon-bg)',
            border: '1px solid var(--warm-icon-border)',
          }}
        >
          {isVision ? <Eye size={24} color="var(--gold-light)" /> : <Target size={24} color="var(--gold-dark)" />}
        </div>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        style={{
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: isVision
            ? (isAr ? 'clamp(24px,3.2vw,44px)' : 'clamp(26px,3.2vw,46px)')
            : 'clamp(24px,3vw,42px)',
          letterSpacing: isAr ? 0 : 1,
          lineHeight: isAr ? 1.35 : 1.2,
          marginBottom: 18,
          ...(isVision && isAr ? { color: 'var(--ink)' } : {}),
        }}
      >
        {isVision ? (
          isAr ? (
            t('vision.title')
          ) : (
            <span
              className="vm-gradient-text"
              style={{
                background: 'var(--grad-h2)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >{t('vision.title')}</span>
          )
        ) : (
          <span
            className="vm-gradient-text"
            style={{
              background: 'linear-gradient(135deg,var(--gold-light),var(--gold-dark))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >{t('mission.title')}</span>
        )}
      </motion.h2>

      <motion.div
        variants={fadeIn}
        style={{
          width: 64, height: 1,
          background: 'linear-gradient(90deg,transparent,var(--gold-light),transparent)',
          margin: '0 auto 18px',
        }}
      />

      <motion.p
        variants={fadeUp}
        style={{
          fontFamily: bodyFont, fontWeight: 400, margin: 0,
          fontSize: isAr ? 'clamp(14px,1.35vw,17px)' : 'clamp(13px,1.35vw,16px)',
          lineHeight: isAr ? 1.95 : 1.85,
          color: 'var(--ink-muted)',
        }}
      >
        {isVision ? t('vision.para') : t('mission.para')}
      </motion.p>
    </div>
  );
}
