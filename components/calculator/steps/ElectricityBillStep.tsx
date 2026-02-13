"use client";

import { Zap } from "lucide-react";
import StepNavigation from "../StepNavigation";

interface ElectricityBillStepProps {
  value: number;
  onChange: (value: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function ElectricityBillStep({
  value,
  onChange,
  onBack,
  onNext,
}: ElectricityBillStepProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = Number(raw);
    if (num >= 0 && num <= 50000) {
      onChange(num);
    }
  };

  const formatDisplay = (val: number) => {
    return val.toLocaleString("en-US");
  };

  return (
    <div className="flex flex-col">
      {/* Icon + Question */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
          <Zap className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-dark)]">
          What is your monthly electricity bill?
        </h2>
      </div>

      <p className="text-[var(--color-text-secondary)] mb-8 ml-15">
        Enter the approximate amount of your monthly electricity bill.
      </p>

      {/* Amount Display */}
      <div className="flex items-center justify-center mb-8">
        <span className="text-2xl text-[var(--color-grey-dark)] mr-2">$</span>
        <input
          type="text"
          value={formatDisplay(value)}
          onChange={handleInputChange}
          className="text-5xl sm:text-6xl font-bold text-[var(--color-dark)] bg-transparent border-none outline-none text-center w-64"
        />
        <span className="text-lg text-[var(--color-grey)] ml-2 self-end mb-2">
          USD
        </span>
      </div>

      {/* Slider */}
      <div className="px-2 mb-4">
        <input
          type="range"
          min={50}
          max={1500}
          step={10}
          value={value}
          onChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-[var(--color-grey)] mt-2">
          <span>$50</span>
          <span>$1,500</span>
        </div>
      </div>

      {/* Quick select buttons */}
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {[100, 150, 200, 300, 500, 800].map((amount) => (
          <button
            key={amount}
            onClick={() => onChange(amount)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              value === amount
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-green-light)] text-[var(--color-dark)] hover:bg-[var(--color-green-lightest)]"
            }`}
          >
            ${formatDisplay(amount)}
          </button>
        ))}
      </div>

      <StepNavigation onBack={onBack} onNext={onNext} />
    </div>
  );
}
