import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { formatDatePersian } from '../utils/persian'

interface StepFourProps {
  dateData: {
    datetime: string
    activity: string
  }
}

export default function StepFour({ dateData }: StepFourProps) {
  const { t, i18n } = useTranslation()
  const isFa = i18n.language === 'fa'

  const formatDateTime = (dt: string) => {
    try {
      const date = new Date(dt)
      if (isFa) {
        return formatDatePersian(date)
      }
      const parsed = parseISO(dt)
      return format(parsed, "EEEE, MMMM do 'at' h:mm a")
    } catch {
      return dt
    }
  }

  const messages = t('step4.messages', { returnObjects: true }) as string[]
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="glass-card rounded-3xl text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-7xl mb-6"
      >
        🎉
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-dancing text-4xl md:text-5xl text-pink-500 mb-4"
      >
        {t('step4.title')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-rose-400 text-lg mb-8"
      >
        {randomMessage}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/50 rounded-2xl p-6 mb-8"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">📅</span>
            <div className="text-left rtl:text-right">
              <div className="text-sm text-gray-400">{t('step4.when')}</div>
              <div className="text-gray-700 font-medium">
                {formatDateTime(dateData.datetime)}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-pink-200" />

          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">✨</span>
            <div className="text-left rtl:text-right">
              <div className="text-sm text-gray-400">{t('step4.what')}</div>
              <div className="text-gray-700 font-medium">
                {t(`step3.options.${dateData.activity}.label`)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <p className="text-gray-500 italic">
          {t('step4.quote')}
        </p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="flex justify-center gap-2 text-3xl"
        >
          {['💖', '💕', '💗', '💝', '💖'].map((heart, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {heart}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-pink-400 font-dancing text-2xl mt-6"
        >
          {t('step4.seeYou')}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
