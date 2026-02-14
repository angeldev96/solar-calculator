"use client";

import { useState, useEffect } from "react";
import { CalculatorInputs } from "@/lib/types";
import { getMoveInYears } from "@/lib/historical-rates";

interface InputsSectionProps {
  inputs: CalculatorInputs;
  updateInput: <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => void;
}

export default function InputsSection({
  inputs,
  updateInput,
}: InputsSectionProps) {
  return (
    <div className="bg-[var(--color-card)] rounded-xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[var(--color-dark)]">Calculator Inputs</h2>
        <span className="text-sm text-[var(--color-grey)]">
          Projection term: <span className="text-[var(--color-dark)] font-medium">25 years</span>
        </span>
      </div>

      {/* Customer Name */}
      <div className="mb-8">
        <label className="block text-sm text-[var(--color-grey)] mb-1.5">
          Customer Name
        </label>
        <input
          type="text"
          value={inputs.customerName}
          onChange={(e) => updateInput("customerName", e.target.value)}
          placeholder="Enter customer name"
          className="w-full sm:w-80 px-4 py-2.5 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-dark)] placeholder-[var(--color-grey-dark)] outline-none focus:border-[var(--color-primary)] transition-colors"
        />
      </div>

      {/* Sunk Cost Inputs */}
      <div className="mb-8 p-5 rounded-lg bg-[var(--color-card-alt)] border border-[var(--color-input-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-4">
          Sunk Cost Analysis
        </h3>
        <p className="text-xs text-[var(--color-grey-dark)] mb-4">
          Enter your current bill and move-in year to see how much you&apos;ve already paid to the utility.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="Current Monthly Electric Bill"
            value={inputs.currentMonthlyBill}
            onChange={(v) => updateInput("currentMonthlyBill", v)}
            prefix="$"
            step={10}
            hint="Your current monthly electricity bill"
          />
          <div>
            <label className="block text-sm text-[var(--color-grey)] mb-1.5">
              Year Moved Into Home
            </label>
            <select
              value={inputs.yearMovedIn}
              onChange={(e) => updateInput("yearMovedIn", Number(e.target.value))}
              className="w-full py-2.5 px-4 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-dark)] outline-none focus:border-[var(--color-primary)] transition-colors cursor-pointer"
            >
              {getMoveInYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <p className="text-xs text-[var(--color-grey-dark)] mt-1">
              When you first started paying utilities at this home
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Utility Details */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-teal)] uppercase tracking-wider mb-5">
            Utility Details
          </h3>
          <div className="space-y-5">
            <InputField
              label="Annual kWh Usage"
              value={inputs.annualKwhUsage}
              onChange={(v) => updateInput("annualKwhUsage", v)}
              suffix="kWh"
              step={100}
            />
            <InputField
              label="Utility Rate (per kWh)"
              value={inputs.utilityRate}
              onChange={(v) => updateInput("utilityRate", v)}
              prefix="$"
              step={0.01}
            />
            <InputField
              label="Utility Inflation Rate"
              value={inputs.utilityInflationRate}
              onChange={(v) => updateInput("utilityInflationRate", v)}
              suffix="%"
              step={0.1}
              hint="Adjust to match your local utility trends"
            />
            <InputField
              label="Monthly Connection Fee"
              value={inputs.monthlyConnectionFee}
              onChange={(v) => updateInput("monthlyConnectionFee", v)}
              prefix="$"
              step={1}
              hint="Enter if your utility charges a fixed monthly fee"
            />
          </div>
        </div>

        {/* Service Plan Details */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-teal)] uppercase tracking-wider mb-5">
            Service Plan Details
          </h3>
          <div className="space-y-5">
            {/* Calculate By toggle */}
            <div>
              <label className="block text-sm text-[var(--color-grey)] mb-2">
                Calculate payment by
              </label>
              <div className="flex gap-1 bg-[var(--color-input-bg)] rounded-lg p-1">
                <button
                  onClick={() => updateInput("calculateBy", "kwhRate")}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    inputs.calculateBy === "kwhRate"
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-grey)] hover:text-[var(--color-dark)]"
                  }`}
                >
                  kWh Rate
                </button>
                <button
                  onClick={() => updateInput("calculateBy", "monthlyPrice")}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    inputs.calculateBy === "monthlyPrice"
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-grey)] hover:text-[var(--color-dark)]"
                  }`}
                >
                  Monthly Price
                </button>
              </div>
            </div>

            <InputField
              label={
                inputs.calculateBy === "kwhRate"
                  ? "Service Price (per kWh)"
                  : "Monthly Service Price"
              }
              value={inputs.servicePrice}
              onChange={(v) => updateInput("servicePrice", v)}
              prefix="$"
              step={inputs.calculateBy === "kwhRate" ? 0.01 : 1}
            />
            <InputField
              label="Annual System Production"
              value={inputs.annualSystemProduction}
              onChange={(v) => updateInput("annualSystemProduction", v)}
              suffix="kWh"
              step={100}
              hint="Total kWh your system will produce per year"
            />
            <InputField
              label="Annual Service Escalator"
              value={inputs.annualServiceEscalator}
              onChange={(v) => updateInput("annualServiceEscalator", v)}
              suffix="%"
              step={0.1}
              hint="Adjust to match your plan structure"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  hint?: string;
}) {
  // Keep a local string state for the input to preserve intermediate typing states like "0." or "123."
  const [displayValue, setDisplayValue] = useState(String(value));

  // Sync with parent value changes
  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Allow empty string
    if (raw === "") {
      setDisplayValue("");
      onChange(0);
      return;
    }

    // Only allow valid number patterns (numbers, decimals, negative)
    if (/^-?\d*\.?\d*$/.test(raw)) {
      setDisplayValue(raw);

      // Convert to number if it's a complete valid number
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  const handleBlur = () => {
    // On blur, clean up the display value (remove trailing dots, etc.)
    const num = parseFloat(displayValue);
    if (!isNaN(num)) {
      setDisplayValue(String(num));
    } else {
      setDisplayValue(String(value));
    }
  };

  return (
    <div>
      <label className="block text-sm text-[var(--color-grey)] mb-1.5">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-grey-dark)] text-sm">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full py-2.5 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-dark)] outline-none focus:border-[var(--color-primary)] transition-colors ${
            prefix ? "pl-8 pr-4" : "px-4"
          } ${suffix ? "pr-14" : ""}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-grey-dark)] text-sm">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="text-xs text-[var(--color-grey-dark)] mt-1">{hint}</p>
      )}
    </div>
  );
}
