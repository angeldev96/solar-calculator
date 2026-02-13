"use client";

import { useState, useMemo } from "react";
import ProgressBar from "./ProgressBar";
import WelcomeStep from "./steps/WelcomeStep";
import ElectricityBillStep from "./steps/ElectricityBillStep";
import LocationStep from "./steps/LocationStep";
import ResultsStep from "./steps/ResultsStep";
import { CalculatorFormData } from "@/lib/types";
import { calculateSolarSavings } from "@/lib/calculations";

export default function SolarCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CalculatorFormData>({
    monthlyBill: 200,
    state: "",
  });

  const result = useMemo(() => {
    if (currentStep === 3 && formData.state) {
      return calculateSolarSavings({
        monthlyBill: formData.monthlyBill,
        state: formData.state,
      });
    }
    return null;
  }, [currentStep, formData.monthlyBill, formData.state]);

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const restart = () => {
    setCurrentStep(0);
    setFormData({ monthlyBill: 200, state: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl">
        {/* Progress bar - hidden on welcome and results */}
        {currentStep > 0 && currentStep < 3 && (
          <ProgressBar currentStep={currentStep} />
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-6 sm:p-10">
          {currentStep === 0 && <WelcomeStep onStart={goNext} />}

          {currentStep === 1 && (
            <ElectricityBillStep
              value={formData.monthlyBill}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, monthlyBill: v }))
              }
              onBack={goBack}
              onNext={goNext}
            />
          )}

          {currentStep === 2 && (
            <LocationStep
              value={formData.state}
              onChange={(v) =>
                setFormData((prev) => ({ ...prev, state: v }))
              }
              onBack={goBack}
              onNext={goNext}
            />
          )}

          {currentStep === 3 && result && (
            <ResultsStep result={result} onRestart={restart} />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[var(--color-grey)] mt-6">
          Results are estimates and may vary based on specific conditions.
        </p>
      </div>
    </div>
  );
}
