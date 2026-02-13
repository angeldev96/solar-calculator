"use client";

import { useState, useMemo, useRef } from "react";
import { Printer, RotateCcw, Share2, Sun } from "lucide-react";
import { CalculatorInputs } from "@/lib/types";
import { calculateResults, calculateSunkCost } from "@/lib/calculations";
import InputsSection from "./InputsSection";
import SummaryCards from "./SummaryCards";
import CostChart from "./CostChart";
import BreakdownTable from "./BreakdownTable";
import SunkCostSection from "./SunkCostSection";

const DEFAULT_INPUTS: CalculatorInputs = {
  customerName: "",
  annualKwhUsage: 10000,
  utilityRate: 0.15,
  utilityInflationRate: 6,
  monthlyConnectionFee: 0,
  calculateBy: "kwhRate",
  servicePrice: 0.1,
  annualSystemProduction: 10000,
  annualServiceEscalator: 2.9,
  currentMonthlyBill: 200,
  yearMovedIn: 2010,
};

export default function SolarCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const printRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => calculateResults(inputs), [inputs]);
  const sunkCostResult = useMemo(
    () => calculateSunkCost(inputs.currentMonthlyBill, inputs.yearMovedIn),
    [inputs.currentMonthlyBill, inputs.yearMovedIn]
  );

  const updateInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setInputs(DEFAULT_INPUTS);

  const handlePrint = () => window.print();

  const handleShare = async () => {
    const params = new URLSearchParams();
    params.set("kwh", inputs.annualKwhUsage.toString());
    params.set("rate", inputs.utilityRate.toString());
    params.set("inf", inputs.utilityInflationRate.toString());
    params.set("fee", inputs.monthlyConnectionFee.toString());
    params.set("by", inputs.calculateBy);
    params.set("sp", inputs.servicePrice.toString());
    params.set("prod", inputs.annualSystemProduction.toString());
    params.set("esc", inputs.annualServiceEscalator.toString());
    params.set("bill", inputs.currentMonthlyBill.toString());
    params.set("yr", inputs.yearMovedIn.toString());
    if (inputs.customerName) params.set("name", inputs.customerName);

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch {
      prompt("Copy this link:", url);
    }
  };

  return (
    <div className="min-h-screen" ref={printRef}>
      {/* Header */}
      <header className="border-b border-[var(--color-input-border)] no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--color-dark)]">
                Solar Savings Calculator
              </h1>
              <p className="text-sm text-[var(--color-grey)]">
                Compare utility costs vs. solar service plan over 25 years
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-card)] text-[var(--color-grey)] hover:text-[var(--color-dark)] hover:bg-[var(--color-card-alt)] transition-colors text-sm"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Inputs */}
        <InputsSection inputs={inputs} updateInput={updateInput} />

        {/* Actions */}
        <div className="flex gap-3 no-print">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-card)] text-[var(--color-grey)] hover:text-[var(--color-dark)] hover:bg-[var(--color-card-alt)] transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors text-sm font-medium"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Sunk Cost */}
        <SunkCostSection
          result={sunkCostResult}
          currentMonthlyBill={inputs.currentMonthlyBill}
        />

        {/* Summary */}
        <SummaryCards result={result} />

        {/* Chart */}
        <CostChart yearData={result.yearData} />

        {/* Table */}
        <BreakdownTable yearData={result.yearData} />
      </main>
    </div>
  );
}
