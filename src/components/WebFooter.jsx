import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import GeoPattern from './GeoPattern';
import { useI18n } from '../i18n/I18nContext';
import { publicAsset } from '../utils/publicAsset';
import { useRevealInView } from '../utils/useRevealInView';

const NAV_COLS = [
  {
    titleKey: 'footer.colCompany',
    links: [
      { id: 'overview', labelKey: 'footer.linkOverview' },
      { id: 'values', labelKey: 'footer.linkValues' },
    ],
  },
  {
    titleKey: 'footer.colBusiness',
    links: [
      { id: 'divisions', labelKey: 'footer.linkDivisions' },
      { id: 'services', labelKey: 'footer.linkServices' },
      { id: 'strategy', labelKey: 'footer.linkStrategy' },
    ],
  },
  {
    titleKey: 'footer.colConnect',
    links: [
      { id: 'contact', labelKey: 'footer.linkContact' },
    ],
  },
];

const VP = { once: true, amount: 0.2 };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function WebFooter({ onNav }) {
  const { t, isAr } = useI18n();
  const y = new Date().getFullYear();
  const bodyFont = 'var(--font-body)';
  const reveal = useRevealInView(VP);

  return (
    <footer
      className="web-footer"
      style={{
        background: 'var(--footer-bg)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(235,191,91,0.12)',
      }}
    >
      <GeoPattern opacity={0.04} />

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold-dark), transparent)',
        pointerEvents: 'none',
      }} />

      <motion.div
        ref={reveal.ref}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate={reveal.inView ? 'show' : 'hidden'}
        className="web-footer-grid"
      >
        <motion.div className="web-footer-grid__intro" variants={fadeUp}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexDirection: 'row' }}>
            <img
              src={publicAsset('nawa_logo.png')}
              alt={t('a11y.logo')}
              style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }}
            />
            <div>
              <span style={{
                fontFamily: 'var(--font-en)',
                fontSize: 16, fontWeight: 700, letterSpacing: 6,
                background: 'linear-gradient(135deg,var(--gold-light),var(--gold-dark))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                display: 'block', textTransform: 'uppercase',
              }}>NAWA</span>
              <span style={{
                fontFamily: bodyFont, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
                color: 'rgba(235,191,91,0.4)',
              }}>{t('footer.holding')}</span>
            </div>
          </div>

          <p style={{
            fontFamily: bodyFont, fontWeight: 400,
            fontSize: 13, lineHeight: 1.85, letterSpacing: 0.5,
            color: 'var(--footer-text)', marginBottom: 32,
          }}
          >
            {t('footer.tagline')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              href="mailto:info@nawaholding.com"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                flexDirection: 'row',
                textDecoration: 'none',
                color: 'var(--footer-text)',
                fontFamily: bodyFont, fontSize: 13, letterSpacing: 0.5,
              }}
            >
              <Mail size={13} color="var(--gold-light)" />
              info@nawaholding.com
              <ArrowUpRight size={11} color="rgba(235,191,91,0.4)" />
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: 'row' }}>
              <MapPin size={13} color="rgba(235,191,91,0.5)" />
              <span style={{ fontFamily: bodyFont, fontSize: 13, color: 'var(--footer-text-muted)' }}>
                {t('contact.p')}
              </span>
            </div>
          </div>
        </motion.div>

        {NAV_COLS.map((col) => (
          <motion.div key={col.titleKey} variants={fadeUp}>
            <p style={{
              fontFamily: bodyFont, fontSize: 11,
              letterSpacing: 3, textTransform: isAr ? 'none' : 'uppercase',
              color: 'var(--gold-light)', marginBottom: 14,
            }}>{t(col.titleKey)}</p>
            <div style={{ width: 24, height: 1, background: 'rgba(235,191,91,0.3)', marginBottom: 12 }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map(({ id, labelKey }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNav?.(id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: 0, textAlign: 'start', width: '100%',
                      fontFamily: bodyFont, fontSize: 12, letterSpacing: 0.5,
                      color: 'var(--footer-text)',
                    }}
                  >
                    {t(labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <div style={{
        borderTop: '1px solid rgba(235,191,91,0.08)',
        maxWidth: 1200, margin: '0 auto',
        padding: '20px 7vw',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
        flexDirection: 'row',
      }}>
        <p style={{
          fontFamily: bodyFont, fontSize: 10, letterSpacing: 2, textTransform: isAr ? 'none' : 'uppercase',
          color: 'var(--footer-text-muted)',
        }}
        >
          © {y} {t('footer.copyright')}
        </p>
        <span style={{ fontFamily: bodyFont, fontSize: 11, color: 'var(--label-muted)' }}>
          {t('footer.location')}
        </span>
      </div>
    </footer>
  );
}
