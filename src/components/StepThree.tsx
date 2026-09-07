import { useState } from 'react'
import { motion } from 'framer-motion'

interface StepThreeProps {
  onNext: (activity: string) => void
}

const options = [
  { id: 'pizza', emoji: '🍕', label: 'Pizza Night', description: 'Classic Italian vibes' },
  { id: 'pasta', emoji: '🍝', label: 'Pasta Paradise', description: 'Pasta la vista, baby!' },
  { id: 'coffee', emoji: '☕', label: 'Coffee Date', description: 'Warm & cozy vibes' },
  { id: 'sushi', emoji: '🍣', label: 'Sushi Date', description: 'Something special' },
  { id: 'park', emoji: '🌳', label: 'Park Walk', description: 'Nature & fresh air' },
  { id: 'movie', emoji: '🎬', label: 'Movie Night', description: 'Cinema magic' },
  { id: 'picnic', emoji: '🧺', label: 'Picnic', description: 'Under the stars' },
  { id: 'dessert', emoji: '🍰', label: 'Dessert Only', description: 'Sweet tooth heaven' },
]

export default function StepThree({ onNext }: StepThreeProps) {
  const [selected, setSelected] = useState('')

  const handleSelect = (id: string) => {
    setSelected(id)
  }

  const handleSubmit = () => {
    if (!selected) return
    const option = options.find(o => o.id === selected)
    onNext(option?.label || selected)
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
        What should we do?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 mb-8 text-center"
      >
        Pick something you'd love 💝
      </motion.p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            onClick={() => handleSelect(option.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`option-card rounded-2xl p-4 text-center relative overflow-hidden ${
              selected === option.id ? 'selected' : ''
            }`}
          >
            <div className="text-3xl mb-2">{option.emoji}</div>
            <div className="font-medium text-gray-700 text-sm">{option.label}</div>
            <div className="text-xs text-gray-400 mt-1">{option.description}</div>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={handleSubmit}
        disabled={!selected}
        whileHover={selected ? { scale: 1.02 } : {}}
        whileTap={selected ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${
          selected
            ? 'btn-primary text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {selected ? 'Perfect Choice! 💕' : 'Pick one above ✨'}
      </motion.button>
    </motion.div>
  )
}
