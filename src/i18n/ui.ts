import { siteDataEs } from '../data/siteDataEs';
import { siteDataEn } from '../data/siteDataEn';

export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: siteDataEs.ui as Record<string, string>,
  en: siteDataEn.ui as Record<string, string>
};

export function useTranslations(lang: 'es' | 'en') {
  return function t(key: string) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
