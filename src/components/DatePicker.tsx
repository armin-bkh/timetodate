import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
} from 'date-fns'

interface DatePickerProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  minDate?: Date
}

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function DatePicker({ selectedDate, onDateSelect, minDate }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [direction, setDirection] = useState(0)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const calStart = startOfWeek(monthStart)
  const calEnd = endOfWeek(monthEnd)

  const days: Date[] = []
  let day = calStart
  while (day <= calEnd) {
    days.push(day)
    day = addDays(day, 1)
  }

  const prevMonth = () => {
    setDirection(-1)
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setDirection(1)
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const isDisabled = (date: Date) => {
    if (minDate && isBefore(date, minDate) && !isSameDay(date, minDate)) return true
    return false
  }

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-100 transition-colors text-lg font-bold"
        >
          ‹
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.h3
            key={format(currentMonth, 'yyyy-MM')}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2 }}
            className="font-dancing text-xl text-pink-500"
          >
            {format(currentMonth, 'MMMM yyyy')}
          </motion.h3>
        </AnimatePresence>
        <button
          onClick={nextMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-100 transition-colors text-lg font-bold"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-pink-300 py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const inMonth = isSameMonth(d, currentMonth)
          const selected = selectedDate && isSameDay(d, selectedDate)
          const today = isToday(d)
          const disabled = isDisabled(d)

          return (
            <motion.button
              key={i}
              type="button"
              disabled={disabled || !inMonth}
              onClick={() => inMonth && !disabled && onDateSelect(d)}
              whileHover={inMonth && !disabled ? { scale: 1.15 } : {}}
              whileTap={inMonth && !disabled ? { scale: 0.9 } : {}}
              className={`
                relative w-full aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                ${!inMonth ? 'text-gray-300 cursor-default' : ''}
                ${inMonth && !disabled && !selected ? 'text-gray-600 hover:bg-pink-100 cursor-pointer' : ''}
                ${disabled ? 'text-gray-300 cursor-not-allowed line-through' : ''}
                ${selected ? 'text-white shadow-lg' : ''}
                ${today && !selected ? 'ring-2 ring-pink-300' : ''}
              `}
              style={
                selected
                  ? { background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)' }
                  : undefined
              }
            >
              {format(d, 'd')}
              {today && !selected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-400" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
