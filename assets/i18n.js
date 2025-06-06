import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import tr from './language/tr.json';
import en from './language/en.json';
import de from './language/de.json';
import fr from './language/fr.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'de',
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
    },
    lng: 'de',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;