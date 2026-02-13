"use client";

import { Sun, TrendingDown, Shield, Leaf } from "lucide-react";

interface WelcomeStepProps {
  onStart: () => void;
}

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Hero icon */}
      <div className="w-20 h-20 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center mb-6">
        <Sun className="w-10 h-10 text-[var(--color-primary)]" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-dark)] mb-4">
        Solar Savings
        <br />
        <span className="text-[var(--color-primary)]">Calculator</span>
      </h1>

      <p className="text-[var(--color-text-secondary)] text-lg mb-8 max-w-md leading-relaxed">
        Discover how much you can save with solar panels. Compare your current
        electricity costs with solar energy over 25 years.
      </p>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full max-w-lg">
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-green-lightest)]">
          <TrendingDown className="w-6 h-6 text-[var(--color-dark-soft)]" />
          <span className="text-sm text-[var(--color-dark)] font-medium">
            Lower your bill
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-green-lightest)]">
          <Shield className="w-6 h-6 text-[var(--color-dark-soft)]" />
          <span className="text-sm text-[var(--color-dark)] font-medium">
            Rate increase protection
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-green-lightest)]">
          <Leaf className="w-6 h-6 text-[var(--color-dark-soft)]" />
          <span className="text-sm text-[var(--color-dark)] font-medium">
            Clean energy
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="px-10 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-lg rounded-full shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 transition-all duration-200 active:scale-[0.98]"
      >
        Get Started
      </button>

      <p className="text-sm text-[var(--color-grey)] mt-4">
        Takes only 1 minute
      </p>
    </div>
  );
}
