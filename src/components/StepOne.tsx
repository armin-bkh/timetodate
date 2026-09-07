import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface StepOneProps {
  onYes: () => void
}

const noMessages = [
  "Are you sure? 🥺",
  "Please say yes! 💕",
  "Don't break my heart! 💔",
  "I'll be so sad... 😢",
  "Come on, it'll be fun! 🌟",
  "I promise a good time! ✨",
  "Pretty please? 🙏",
  "With a cherry on top? 🍒",
  "My heart is melting... 🫠",
  "You're breaking my heart! 💗",
]

const noPositions = [
  { x: 100, y: -50 },
  { x: -80, y: -30 },
  { x: 120, y: 40 },
  { x: -100, y: 60 },
  { x: 80, y: -80 },
  { x: -120, y: -60 },
  { x: 60, y: 80 },
  { x: -60, y: -40 },
]

export default function StepOne({ onYes }: StepOneProps) {
  const [noClicks, setNoClicks] = useState(0)
  const [currentMessage, setCurrentMessage] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleNoClick = () => {
    const messageIndex = noClicks % noMessages.length
    setCurrentMessage(noMessages[messageIndex])

    const posIndex = noClicks % noPositions.length
    setNoPosition(noPositions[posIndex])

    setIsRunning(true)
    setNoClicks(noClicks + 1)

    setTimeout(() => {
      setIsRunning(false)
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-6xl mb-6"
      >
        💕
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-dancing text-4xl md:text-5xl text-pink-500 mb-4 leading-tight"
      >
        Will you go on a date with me?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 text-lg"
      >
        I promise it'll be special ✨
      </motion.p>

      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-rose-400 font-medium mb-6 text-lg"
          key={noClicks}
        >
          {currentMessage}
        </motion.div>
      )}

      {!currentMessage && <div className="mb-6" />}

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <motion.button
          ref={buttonRef}
          onClick={onYes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-white font-semibold py-4 px-10 rounded-full text-xl animate-pulse-glow"
        >
          Yes! 💖
        </motion.button>

        <motion.button
          onClick={handleNoClick}
          animate={isRunning ? {
            x: [0, noPosition.x, -noPosition.x / 2, noPosition.x / 3],
            y: [0, noPosition.y, -noPosition.y / 2, noPosition.y / 3],
            rotate: [0, 10, -10, 5, 0],
          } : {}}
          transition={{ duration: 0.5 }}
          className="btn-no text-gray-600 font-medium py-4 px-8 rounded-full text-lg relative"
          style={{
            transform: isRunning ? undefined : `translate(${noPosition.x * 0.1}px, ${noPosition.y * 0.1}px)`,
          }}
        >
          No 😅
        </motion.button>
      </div>

      {noClicks >= 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-pink-400 italic text-sm"
        >
          Hint: The "Yes" button has all the answers 💝
        </motion.p>
      )}
    </motion.div>
  )
}
