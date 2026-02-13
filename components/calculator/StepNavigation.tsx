"use client";

import { ArrowLeft, ArrowRight, Calculator } from "lucide-react";

interface StepNavigationProps {
  onBack?: () => void;
  onNext: () => void;
  showBack?: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
  isLastStep?: boolean;
}

export default function StepNavigation({
  onBack,
  onNext,
  showBack = true,
  nextLabel = "Next",
  nextDisabled = false,
  isLastStep = false,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--color-green-light)]">
      {showBack && onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 text-[var(--color-grey-dark)] hover:text-[var(--color-dark)] transition-colors rounded-full hover:bg-[var(--color-green-light)]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold transition-all duration-200 ${
          nextDisabled
            ? "bg-[var(--color-grey)] cursor-not-allowed opacity-60"
            : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 active:scale-[0.98]"
        }`}
      >
        {isLastStep ? (
          <>
            <Calculator className="w-4 h-4" />
            Calculate
          </>
        ) : (
          <>
            {nextLabel}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
