import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fa', label: 'FA', flag: '🇮🇷' },
]

export default function LanguageSwitcher() {
  const { lang, switchLanguage } = useLanguage()

  return (
    <div className="fixed top-4 z-50 flex gap-2" style={{ [lang === 'fa' ? 'left' : 'right']: '1rem' }}>
      {languages.map((l) => (
        <motion.button
          key={l.code}
          onClick={() => switchLanguage(l.code)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200
            ${lang === l.code
              ? 'bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg'
              : 'bg-white/70 text-gray-500 hover:bg-white hover:text-pink-500'
            }
          `}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {l.flag}
        </motion.button>
      ))}
    </div>
  )
}
