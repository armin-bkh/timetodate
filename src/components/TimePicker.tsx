import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimePickerProps {
  selectedTime: { hours: number; minutes: number } | null
  onTimeSelect: (hours: number, minutes: number) => void
}

function ScrollColumn({
  items,
  selected,
  onSelect,
  formatItem,
}: {
  items: number[]
  selected: number | null
  onSelect: (val: number) => void
  formatItem: (val: number) => string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected !== null && ref.current) {
      const idx = items.indexOf(selected)
      if (idx !== -1) {
        const el = ref.current.children[idx] as HTMLElement
        if (el) {
          el.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
      }
    }
  }, [selected, items])

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1 overflow-y-auto max-h-[160px] scroll-smooth time-scroll"
    >
      {items.map((item) => {
        const isActive = item === selected
        return (
          <motion.button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              py-2 px-4 rounded-xl text-center font-medium transition-all duration-200 flex-shrink-0
              ${isActive
                ? 'text-white shadow-md'
                : 'text-gray-500 hover:text-pink-400 hover:bg-pink-50'
              }
            `}
            style={
              isActive
                ? { background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)' }
                : undefined
            }
          >
            {formatItem(item)}
          </motion.button>
        )
      })}
    </div>
  )
}

export default function TimePicker({ selectedTime, onTimeSelect }: TimePickerProps) {
  const [hours, setHours] = useState<number | null>(selectedTime?.hours ?? null)
  const [minutes, setMinutes] = useState<number | null>(selectedTime?.minutes ?? null)

  const handleHours = (h: number) => {
    setHours(h)
    if (minutes !== null) onTimeSelect(h, minutes)
  }

  const handleMinutes = (m: number) => {
    setMinutes(m)
    if (hours !== null) onTimeSelect(hours, m)
  }

  const formatHour = (h: number) => {
    if (h === 0) return '12 AM'
    if (h < 12) return `${h} AM`
    if (h === 12) return '12 PM'
    return `${h - 12} PM`
  }

  const formatMinute = (m: number) => m.toString().padStart(2, '0')

  const allHours = Array.from({ length: 24 }, (_, i) => i)
  const allMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 bg-pink-50/50 rounded-2xl p-3">
        <div className="text-center text-xs text-pink-300 font-medium mb-2">Hour</div>
        <ScrollColumn
          items={allHours}
          selected={hours}
          onSelect={handleHours}
          formatItem={formatHour}
        />
      </div>
      <div className="text-2xl font-dancing text-pink-400 mt-6">:</div>
      <div className="flex-1 bg-pink-50/50 rounded-2xl p-3">
        <div className="text-center text-xs text-pink-300 font-medium mb-2">Min</div>
        <ScrollColumn
          items={allMinutes}
          selected={minutes}
          onSelect={handleMinutes}
          formatItem={formatMinute}
        />
      </div>
    </div>
  )
}
