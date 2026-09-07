import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./i18n";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import FloatingHearts from "./components/FloatingHearts";

function DateApp() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [dateData, setDateData] = useState({
    datetime: "",
    activity: "",
  });

  const lang = location.pathname.startsWith("/fa") ? "fa" : "en";

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 1 && <StepOne key="step1" onYes={nextStep} />}
          {step === 2 && (
            <StepTwo
              key="step2"
              onNext={(datetime) => {
                setDateData({ ...dateData, datetime });
                nextStep();
              }}
            />
          )}
          {step === 3 && (
            <StepThree
              key="step3"
              onNext={(activity) => {
                setDateData({ ...dateData, activity });
                nextStep();
              }}
            />
          )}
          {step === 4 && (
            <StepFour key="step4" dateData={dateData} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<DateApp />} />
      <Route path="/en" element={<DateApp />} />
      <Route path="/fa" element={<DateApp />} />
    </Routes>
  );
}

export default App;
