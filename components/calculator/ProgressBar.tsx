"use client";

const STEPS = ["Start", "Bill", "Location", "Results"];

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mb-8">
      {STEPS.map((label, index) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                index < currentStep
                  ? "bg-[var(--color-primary)] text-white"
                  : index === currentStep
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                  : "bg-[var(--color-green-light)] text-[var(--color-grey-dark)]"
              }`}
            >
              {index < currentStep ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`text-xs mt-1.5 transition-colors duration-300 hidden sm:block ${
                index <= currentStep
                  ? "text-[var(--color-dark)] font-medium"
                  : "text-[var(--color-grey)]"
              }`}
            >
              {label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`w-12 sm:w-16 h-0.5 mx-1.5 transition-colors duration-300 ${
                index < currentStep
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-green-light)]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
