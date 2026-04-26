import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import GeoPattern from '../components/GeoPattern';
import { useI18n } from '../i18n/I18nContext';
import { fadeUp, fadeIn, container } from '../utils/variants';
import { useRevealInView } from '../utils/useRevealInView';

const VP = { once: true, amount: 0.15 };

/* ─── shared input style (injected once) ────────────────────────────────── */
const inputBase = {
  width: '100%',
  background: 'var(--surface-glass)',
  border: '1px solid var(--surface-glass-b)',
  borderRadius: 10,
  padding: '13px 16px',
  fontSize: 14,
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'inherit',
};

export default function ContactSlide() {
  const { t, isAr, messages } = useI18n();
  const { contact } = messages;
  const f = contact?.form ?? {};
  const bodyFont = 'var(--font-body)';
  const reveal = useRevealInView(VP);

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [focused, setFocused] = useState(null);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    /* simulate send — replace with real endpoint */
    await new Promise(r => setTimeout(r, 1400));
    setStatus('success');
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }, 4000);
  };

  const fieldStyle = (name) => ({
    ...inputBase,
    fontFamily: bodyFont,
    borderColor: focused === name ? 'var(--gold-dark)' : 'var(--surface-glass-b)',
    boxShadow: focused === name ? '0 0 0 3px rgba(181,133,22,0.12)' : 'none',
    textAlign: 'start',
  });

  return (
    <div className="landing-section" style={{ background: 'var(--deep-surface-3)' }}>
      <GeoPattern opacity={0.07} />

      {[600, 380].map((s, i) => (
        <div key={s} style={{
          position: 'absolute',
          ...(i === 0
            ? { bottom: -200, insetInlineStart: -200 }
            : { top: -150, insetInlineEnd: -150 }),
          width: s, height: s, borderRadius: '50%',
          border: `1px solid var(--deco-ring-${i})`,
          pointerEvents: 'none',
        }} />
      ))}

      <motion.div
        ref={reveal.ref}
        variants={container}
        initial="hidden"
        animate={reveal.inView ? 'show' : 'hidden'}
        style={{ position: 'relative', zIndex: 2, padding: '0 7vw', maxWidth: 860, margin: '0 auto', width: '100%' }}
      >
        {/* Title */}
        <motion.h2 variants={fadeUp} style={{
          fontFamily: bodyFont, fontWeight: 700,
          fontSize: 'clamp(24px,4vw,52px)', letterSpacing: isAr ? 0 : 1,
          background: 'var(--grad-h2-alt)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: 16, lineHeight: 1.3, textAlign: 'center',
        }}>
          {t('contact.h2')}
        </motion.h2>

        <motion.p variants={fadeIn} style={{
          fontFamily: bodyFont, fontSize: 15, lineHeight: 1.75, color: 'var(--ink-muted)',
          textAlign: 'center', maxWidth: 520, margin: '0 auto 24px', padding: '0 8px',
        }}>
          {t('contact.intro')}
        </motion.p>

        {/* Location */}
        <motion.div variants={fadeIn} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, flexDirection: 'row', marginBottom: 40,
        }}>
          <MapPin size={14} color="rgba(235,191,91,0.55)" />
          <span style={{ fontFamily: bodyFont, fontSize: 14, color: 'var(--ink-faint)' }}>
            {t('contact.p')}
          </span>
        </motion.div>

        <motion.div variants={fadeIn} style={{
          width: 72, height: 1,
          background: 'linear-gradient(90deg,transparent,var(--gold-light),transparent)',
          margin: '0 auto 44px',
        }} />

        {/* ── Form ── */}
        <motion.form
          variants={fadeUp}
          onSubmit={submit}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {/* Row 1: name + email */}
          <div className="contact-form-row">
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: bodyFont, fontSize: 11, letterSpacing: isAr ? 0 : 2.5, textTransform: isAr ? 'none' : 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
                {f.name}
              </span>
              <input
                name="name" value={form.name} onChange={handle}
                placeholder={f.namePh} required
                style={fieldStyle('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: bodyFont, fontSize: 11, letterSpacing: isAr ? 0 : 2.5, textTransform: isAr ? 'none' : 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
                {f.email}
              </span>
              <input
                name="email" type="email" value={form.email} onChange={handle}
                placeholder={f.emailPh} required
                style={fieldStyle('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </label>
          </div>

          {/* Row 2: phone + subject */}
          <div className="contact-form-row">
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: bodyFont, fontSize: 11, letterSpacing: isAr ? 0 : 2.5, textTransform: isAr ? 'none' : 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
                {f.phone}
              </span>
              <input
                name="phone" type="tel" value={form.phone} onChange={handle}
                placeholder={f.phonePh}
                className="input-ltr"
                style={fieldStyle('phone')}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: bodyFont, fontSize: 11, letterSpacing: isAr ? 0 : 2.5, textTransform: isAr ? 'none' : 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
                {f.subject}
              </span>
              <input
                name="subject" value={form.subject} onChange={handle}
                placeholder={f.subjectPh}
                style={fieldStyle('subject')}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
              />
            </label>
          </div>

          {/* Message */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: bodyFont, fontSize: 11, letterSpacing: isAr ? 0 : 2.5, textTransform: isAr ? 'none' : 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
              {f.message}
            </span>
            <textarea
              name="message" value={form.message} onChange={handle}
              placeholder={f.messagePh} rows={5} required
              style={{ ...fieldStyle('message'), resize: 'vertical', minHeight: 120 }}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
            />
          </label>

          {/* Submit + status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                flexDirection: 'row',
                padding: '14px 36px',
                background: status === 'success'
                  ? 'linear-gradient(135deg,#2e7d32,#388e3c)'
                  : 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))',
                border: 'none', borderRadius: 50, cursor: status === 'sending' ? 'wait' : 'pointer',
                fontFamily: bodyFont, fontWeight: 700, fontSize: 14,
                letterSpacing: isAr ? 0 : 1.5,
                textTransform: isAr ? 'none' : 'uppercase',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(181,133,22,0.28)',
                transition: 'opacity 0.2s, transform 0.15s',
                opacity: status === 'sending' ? 0.7 : 1,
              }}
            >
              {status === 'success' ? (
                <CheckCircle size={17} />
              ) : (
                <Send size={15} style={{ transform: isAr ? 'scaleX(-1)' : 'none' }} />
              )}
              {status === 'sending' ? f.sending : status === 'success' ? f.success.split('!')[0] + '!' : f.send}
            </button>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: 'row' }}
              >
                <AlertCircle size={16} color="#e53935" />
                <span style={{ fontFamily: bodyFont, fontSize: 13, color: '#e53935' }}>{f.error}</span>
              </motion.div>
            )}
          </div>

          {/* Email / address row below form */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, flexDirection: 'row',
            marginTop: 24, paddingTop: 24,
            borderTop: '1px solid var(--surface-glass-b)',
          }}>
            <Mail size={14} color="rgba(235,191,91,0.5)" />
            <a
              href="mailto:info@nawaholding.com"
              style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 0.5, color: 'var(--ink-faint)', textDecoration: 'none' }}
            >
              info@nawaholding.com
            </a>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}
