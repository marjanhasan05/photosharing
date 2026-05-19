import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import nlNLTranslation from './locales/nl-NL/translation.json';
import nlBETranslation from './locales/nl-BE/translation.json';
import nlSRTranslation from './locales/nl-SR/translation.json';
import nlCWTranslation from './locales/nl-CW/translation.json';
import plTranslation from './locales/pl/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  'nl-NL': {
    translation: nlNLTranslation,
  },
  'nl-BE': {
    translation: nlBETranslation,
  },
  'nl-SR': {
    translation: nlSRTranslation,
  },
  'nl-CW': {
    translation: nlCWTranslation,
  },
  pl: {
    translation: plTranslation,
  },
};

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'pl';
  
  const storedLng = localStorage.getItem('i18nextLng');
  const storedTimestamp = localStorage.getItem('i18nextLngTimestamp');
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  
  if (storedLng && storedTimestamp) {
    const lastVisit = parseInt(storedTimestamp, 10);
    const now = Date.now();
    
    if (now - lastVisit > SEVEN_DAYS_MS) {
      // Preference expired after 7 days of inactivity
      localStorage.removeItem('i18nextLng');
      localStorage.removeItem('i18nextLngTimestamp');
      return 'pl';
    }
    
    // Update timestamp on visit to slide the 7-day window
    localStorage.setItem('i18nextLngTimestamp', now.toString());
    return storedLng;
  }
  
  return 'pl';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Prioritizing local storage but NOT automatically saving to it
      order: ['localStorage', 'querystring', 'cookie', 'path', 'subdomain'],
      caches: [], // Empty array means don't automatically store the language
    },
  });

export default i18n;
