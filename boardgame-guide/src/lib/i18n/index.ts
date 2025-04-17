import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../../public/locales/en/translation.json';
import viTranslation from '../../../public/locales/vi/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation
            },
            vi: {
                translation: viTranslation
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n