import { useEffect, useState } from 'react'

interface Heart {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = []
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 10,
        })
      }
      setHearts(newHearts)
    }
    generateHearts()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-20"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
            animation: `float ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  )
}
