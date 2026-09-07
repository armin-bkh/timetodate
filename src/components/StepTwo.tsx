import { useState } from 'react'
import { motion } from 'framer-motion'
import { isAfter } from 'date-fns'

interface StepTwoProps {
  onNext: (datetime: string) => void
}

export default function StepTwo({ onNext }: StepTwoProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!date || !time) {
      setError('Please select both date and time 💕')
      return
    }

    const selectedDateTime = new Date(`${date}T${time}`)
    const now = new Date()

    if (!isAfter(selectedDateTime, now)) {
      setError('Please choose a future date and time 🕐')
      return
    }

    setError('')
    onNext(`${date}T${time}`)
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
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
        When shall we meet?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 mb-8 text-center"
      >
        Pick a date and time for our special day 🌸
      </motion.p>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-pink-400 font-medium mb-3">
            📆 Date
          </label>
          <input
            type="date"
            value={date}
            min={getMinDate()}
            onChange={(e) => {
              setDate(e.target.value)
              setError('')
            }}
            className="input-love w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-pink-400 font-medium mb-3">
            🕐 Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value)
              setError('')
            }}
            className="input-love w-full"
          />
        </motion.div>

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
          className="btn-primary w-full text-white font-semibold py-4 rounded-xl text-lg"
        >
          Continue 💕
        </motion.button>
      </div>
    </motion.div>
  )
}
