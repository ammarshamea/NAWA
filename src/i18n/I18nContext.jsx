import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { MESSAGES } from './messages';
import { getPath } from './getPath';

const STORAGE_KEY = 'nawa-locale';

const I18nContext = createContext(null);

function applyDocumentLocale(locale) {
  const isAr = locale === 'ar';
  const root = document.documentElement;
  const dir = isAr ? 'rtl' : 'ltr';
  root.setAttribute('lang', locale);
  root.setAttribute('dir', dir);
  root.setAttribute('data-locale', locale);
  if (document.body) {
    document.body.setAttribute('lang', locale);
    document.body.setAttribute('dir', dir);
  }
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const loc = localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en';
    applyDocumentLocale(loc);
    return loc;
  });

  const setLocale = useCallback((next) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useLayoutEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const t = useCallback(
    (path) => {
      const val = getPath(MESSAGES[locale], path);
      return val !== undefined && val !== null ? val : getPath(MESSAGES.en, path) ?? path;
    },
    [locale]
  );

  const isAr = locale === 'ar';

  const value = useMemo(
    () => ({ locale, setLocale, t, isAr, dir: locale === 'ar' ? 'rtl' : 'ltr', messages: MESSAGES[locale] }),
    [locale, setLocale, t, isAr]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
