import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';

i18n.use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: 'es',
    resources: {
        en: { translation: enTranslation },
        es: { translation: esTranslation }
    },
    interpolation: {
        escapeValue: false
    }
});