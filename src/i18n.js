// src/i18n.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import { Platform } from 'react-native';
import en from './locales/en.json';
import hi from './locales/hi.json';
import pa from './locales/pa.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import kn from './locales/kn.json';
import mr from './locales/mr.json';
import gu from './locales/gu.json';
import bn from './locales/bn.json';


const LANGUAGE_PREFERENCE = 'APP_LANGUAGE';

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
     try {
      if (Platform.OS === 'web') {
        const lang = localStorage.getItem(LANGUAGE_PREFERENCE) || Localization.getLocales()[0]?.languageTag || 'en';
        callback(lang);
      } else {
        const lang = await AsyncStorage.getItem(LANGUAGE_PREFERENCE);
        callback(lang || Localization.getLocales()[0]?.languageTag || 'en');
      }
    } catch (err) {
      console.error('Language detection error:', err);
      callback('en');
    }
  },
  init: () => {},
 cacheUserLanguage: async (lang) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(LANGUAGE_PREFERENCE, lang);
      } else {
        await AsyncStorage.setItem(LANGUAGE_PREFERENCE, lang);
      }
    } catch (err) {
      console.error('Error saving language:', err);
    }
  },
};

i18n
.use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      pa: { translation: pa },
      ta: { translation: ta },
      te: { translation: te },
      kn: { translation: kn },
      mr: { translation: mr },
      gu: { translation: gu },
      bn: { translation: bn },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
