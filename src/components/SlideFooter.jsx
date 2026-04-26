import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../i18n/I18nContext';

export default function SlideFooter({ warm = false }) {
  const { theme } = useTheme();
  const { t, isAr } = useI18n();
  const useWarmBar = warm && theme === 'light';
  const gold    = useWarmBar ? 'rgba(181,133,22,0.55)' : 'rgba(235,191,91,0.35)';
  const textClr = useWarmBar ? 'rgba(100,70,0,0.55)'   : 'rgba(235,191,91,0.45)';
  const bodyFont = 'var(--font-body)';

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '12px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderTop: `1px solid ${gold}`,
    }}>
      <span style={{
        fontFamily: bodyFont,
        fontSize: 10, letterSpacing: 4, textTransform: isAr ? 'none' : 'uppercase',
        color: textClr,
      }}>
        {t('slideFooter.brand')}
      </span>
    </div>
  );
}
