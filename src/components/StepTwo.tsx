import { useState } from 'react'
import { motion } from 'framer-motion'
import { isAfter } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { formatDatePersian, formatTimePersian } from '../utils/persian'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'

interface StepTwoProps {
  onNext: (datetime: string) => void
}

export default function StepTwo({ onNext }: StepTwoProps) {
  const { t, i18n } = useTranslation()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<{ hours: number; minutes: number } | null>(null)
  const [error, setError] = useState('')

  const isFa = i18n.language === 'fa'

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setError('')
  }

  const handleTimeSelect = (hours: number, minutes: number) => {
    setSelectedTime({ hours, minutes })
    setError('')
  }

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      setError(t('step2.errorEmpty'))
      return
    }

    const datetime = new Date(selectedDate)
    datetime.setHours(selectedTime.hours, selectedTime.minutes, 0, 0)

    if (!isAfter(datetime, new Date())) {
      setError(t('step2.errorPast'))
      return
    }

    setError('')
    const iso = datetime.toISOString().slice(0, 16)
    onNext(iso)
  }

  const formatPreview = () => {
    if (!selectedDate || !selectedTime) return ''
    if (isFa) {
      const dateStr = formatDatePersian(selectedDate)
      const timeStr = formatTimePersian(selectedTime.hours, selectedTime.minutes)
      return t('step2.preview', { date: dateStr, time: timeStr })
    }
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    const h = selectedTime.hours === 0 ? '12' : selectedTime.hours > 12 ? String(selectedTime.hours - 12) : String(selectedTime.hours)
    const m = selectedTime.minutes.toString().padStart(2, '0')
    const ap = selectedTime.hours >= 12 ? 'PM' : 'AM'
    return t('step2.preview', { date: dateStr, time: `${h}:${m} ${ap}` })
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
        📅
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-dancing text-3xl md:text-4xl text-pink-500 mb-2 text-center"
      >
        {t('step2.title')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 mb-8 text-center"
      >
        {t('step2.subtitle')}
      </motion.p>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-pink-400 font-medium mb-3">
            {t('step2.dateLabel')}
          </label>
          <div className="bg-white/50 rounded-2xl p-4">
            <DatePicker
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              minDate={new Date()}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-pink-400 font-medium mb-3">
            {t('step2.timeLabel')}
          </label>
          <div className="bg-white/50 rounded-2xl p-4">
            <TimePicker
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
            />
          </div>
        </motion.div>

        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-pink-50 rounded-xl py-3 px-4 text-center text-pink-500 font-medium"
          >
            📅 {formatPreview()}
          </motion.div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-400 text-center bg-rose-50 py-3 px-4 rounded-xl"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full text-white font-semibold rounded-xl text-lg"
        >
          {t('common.continue')} 💕
        </motion.button>
      </div>
    </motion.div>
  )
}
