import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fa', label: 'FA', flag: '🇮🇷' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLang = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    document.documentElement.dir = code === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => changeLang(lang.code)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200
            ${i18n.language === lang.code
              ? 'bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg'
              : 'bg-white/70 text-gray-500 hover:bg-white hover:text-pink-500'
            }
          `}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {lang.flag}
        </motion.button>
      ))}
    </div>
  )
}
