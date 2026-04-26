import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export default function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n();
  const next = locale === 'en' ? 'ar' : 'en';

  return (
    <button
      type="button"
      className="lang-switch-btn"
      data-locale={next}
      onClick={() => setLocale(next)}
      aria-label={next === 'ar' ? t('a11y.toArabic') : t('a11y.toEnglish')}
      title={next === 'ar' ? t('a11y.toArabic') : t('a11y.toEnglish')}
    >
      {t(`lang.${next}`)}
    </button>
  );
}
