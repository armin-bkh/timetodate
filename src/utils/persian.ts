const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(str: string): string {
  return str.replace(/\d/g, (d) => persianDigits[parseInt(d)])
}

const persianMonths = [
  'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
  'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
]

const persianWeekDaysShort = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']

export function formatDatePersian(date: Date): string {
  const day = toPersianDigits(String(date.getDate()))
  const month = persianMonths[date.getMonth()]
  const year = toPersianDigits(String(date.getFullYear()))
  const weekday = persianWeekDaysShort[date.getDay()]
  return `${weekday}، ${day} ${month} ${year}`
}

export function formatTimePersian(hours: number, minutes: number): string {
  const h12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  const h = toPersianDigits(String(h12))
  const m = toPersianDigits(String(minutes).padStart(2, '0'))
  const ap = hours >= 12 ? 'ب.ظ' : 'ق.ظ'
  return `${h}:${m} ${ap}`
}
