import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fa from './locales/fa.json'

const resources = {
  en: { translation: en },
  fa: { translation: fa },
}

function getLangFromPath(): string {
  const path = window.location.pathname
  if (path.startsWith('/fa')) return 'fa'
  return 'en'
}

i18n.use(initReactI18next).init({
  resources,
  lng: getLangFromPath(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
