"use client";

import { MapPin } from "lucide-react";
import StepNavigation from "../StepNavigation";
import { US_STATES } from "@/lib/constants";

interface LocationStepProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function LocationStep({
  value,
  onChange,
  onBack,
  onNext,
}: LocationStepProps) {
  return (
    <div className="flex flex-col">
      {/* Icon + Question */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
          <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-dark)]">
          Where are you located?
        </h2>
      </div>

      <p className="text-[var(--color-text-secondary)] mb-8 ml-15">
        Your location helps us calculate the available solar radiation in your
        area.
      </p>

      {/* Select */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-5 py-4 rounded-xl border-2 text-lg transition-all duration-200 outline-none bg-white cursor-pointer ${
            value
              ? "border-[var(--color-primary)] text-[var(--color-dark)]"
              : "border-[var(--color-green-light)] text-[var(--color-grey)]"
          } hover:border-[var(--color-primary)]/50 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10`}
        >
          <option value="" disabled>
            Select your state
          </option>
          {US_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Info card */}
      {value && (
        <div className="mt-6 p-4 rounded-xl bg-[var(--color-green-lightest)] border border-[var(--color-green-light)]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-green-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <SunIcon className="w-4 h-4 text-[var(--color-dark-soft)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-dark)]">
                {value}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Great location for solar energy
              </p>
            </div>
          </div>
        </div>
      )}

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!value}
        isLastStep
      />
    </div>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
