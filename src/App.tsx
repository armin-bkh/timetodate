import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './i18n'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'
import FloatingHearts from './components/FloatingHearts'
import { createDateRequest } from './api/dates'

function DateApp() {
  const location = useLocation()
  const { i18n, t } = useTranslation()
  const [step, setStep] = useState(1)
  const [dateData, setDateData] = useState({
    datetime: '',
    activity: '',
  })
  const [toast, setToast] = useState('')

  const guestName = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.get('key-name') || 'unknown'
  }, [location.search])

  const lang = location.pathname.startsWith('/fa') ? 'fa' : 'en'

  useEffect(() => {
    i18n.changeLanguage(lang)
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang, i18n])

  const nextStep = () => setStep(step + 1)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 4000)
  }

  const handleActivitySelect = async (activity: string) => {
    const newDateData = { ...dateData, activity }
    setDateData(newDateData)
    try {
      await createDateRequest({
        guestName,
        datetime: newDateData.datetime,
        activity: newDateData.activity,
      })
      nextStep()
    } catch {
      showToast(t('apiError.tryAgain'))
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <FloatingHearts />

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-rose-500 text-white py-3 px-6 rounded-xl text-sm font-medium shadow-lg whitespace-nowrap"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 1 && <StepOne key="step1" onYes={nextStep} />}
          {step === 2 && (
            <StepTwo
              key="step2"
              onNext={(datetime) => {
                setDateData({ ...dateData, datetime })
                nextStep()
              }}
            />
          )}
          {step === 3 && (
            <StepThree
              key="step3"
              onNext={handleActivitySelect}
            />
          )}
          {step === 4 && <StepFour key="step4" dateData={dateData} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<DateApp />} />
      <Route path="/en" element={<DateApp />} />
      <Route path="/fa" element={<DateApp />} />
    </Routes>
  )
}

export default App
