import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface StepThreeProps {
  onNext: (activity: string) => void
  loading: boolean
}

const optionIds = ['pizza', 'pasta', 'coffee', 'sushi', 'park', 'movie', 'picnic', 'dessert']

const optionEmojis: Record<string, string> = {
  pizza: '🍕',
  pasta: '🍝',
  coffee: '☕',
  sushi: '🍣',
  park: '🌳',
  movie: '🎬',
  picnic: '🧺',
  dessert: '🍰',
}

export default function StepThree({ onNext, loading }: StepThreeProps) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('')

  const handleSelect = (id: string) => {
    setSelected(id)
  }

  const handleSubmit = () => {
    if (!selected) return
    onNext(selected)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-5xl mb-6 text-center"
      >
        🎉
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-dancing text-3xl md:text-4xl text-pink-500 mb-2 text-center"
      >
        {t('step3.title')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 mb-8 text-center"
      >
        {t('step3.subtitle')}
      </motion.p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {optionIds.map((id, index) => (
          <motion.button
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            onClick={() => handleSelect(id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`option-card rounded-2xl p-4 text-center relative overflow-hidden ${
              selected === id ? 'selected' : ''
            }`}
          >
            <div className="text-3xl mb-2">{optionEmojis[id]}</div>
            <div className="font-medium text-gray-700 text-sm">{t(`step3.options.${id}.label`)}</div>
            <div className="text-xs text-gray-400 mt-1">{t(`step3.options.${id}.description`)}</div>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={handleSubmit}
        disabled={!selected || loading}
        whileHover={selected && !loading ? { scale: 1.02 } : {}}
        whileTap={selected && !loading ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-xl text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
          selected && !loading
            ? 'btn-primary text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('step3.sending')}
          </>
        ) : (
          selected ? t('step3.perfectChoice') : t('step3.pickOne')
        )}
      </motion.button>
    </motion.div>
  )
}
