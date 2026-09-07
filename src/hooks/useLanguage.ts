import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useLanguage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  const lang = location.pathname.startsWith('/fa') ? 'fa' : 'en'

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang, i18n])

  const switchLanguage = (newLang: string) => {
    const path = location.pathname
    let newPath: string

    if (newLang === 'fa') {
      newPath = path.startsWith('/fa') ? path : `/fa${path === '/' ? '' : path}`
    } else {
      newPath = path.replace(/^\/fa/, '') || '/'
    }

    navigate(newPath)
  }

  return { lang, switchLanguage }
}
