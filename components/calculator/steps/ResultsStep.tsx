"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Clock,
  Zap,
  DollarSign,
  RotateCcw,
  Sun,
} from "lucide-react";
import { CalculationResult } from "@/lib/types";
import { formatCurrency, getChartData } from "@/lib/calculations";

interface ResultsStepProps {
  result: CalculationResult;
  onRestart: () => void;
}

export default function ResultsStep({ result, onRestart }: ResultsStepProps) {
  const chartData = getChartData(result);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[var(--color-green-lightest)] flex items-center justify-center mx-auto mb-4">
          <Sun className="w-8 h-8 text-[var(--color-primary)]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-dark)] mb-2">
          Your Solar Savings
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          25-year projection comparing Utility vs Solar
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <MetricCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Total savings"
          value={formatCurrency(result.totalSavings)}
          highlight
        />
        <MetricCard
          icon={<Clock className="w-5 h-5" />}
          label="Payback period"
          value={`${result.paybackPeriod} years`}
        />
        <MetricCard
          icon={<Zap className="w-5 h-5" />}
          label="System size"
          value={`${result.systemSize} kW`}
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="ROI"
          value={`${Math.round(result.roi)}%`}
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-[var(--color-green-light)] mb-6">
        <h3 className="text-lg font-semibold text-[var(--color-dark)] mb-4">
          Cumulative Cost: Utility vs Solar
        </h3>
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ECF0E4" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: "#65776D" }}
                label={{
                  value: "Years",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#65776D",
                }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#65776D" }}
                tickFormatter={(val) =>
                  `$${(val / 1000000).toFixed(1)}M`
                }
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value as number)]}
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #ECF0E4",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cfe"
                name="Utility Cost"
                stroke="#F9593B"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#F9593B" }}
              />
              <Line
                type="monotone"
                dataKey="solar"
                name="Solar Cost"
                stroke="#28332D"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#28332D" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System details */}
      <div className="bg-[var(--color-green-lightest)] rounded-xl p-5 border border-[var(--color-green-light)] mb-8">
        <h3 className="text-base font-semibold text-[var(--color-dark)] mb-3">
          System Details
        </h3>
        <div className="space-y-2">
          <DetailRow
            label="System cost"
            value={formatCurrency(result.systemCost)}
          />
          <DetailRow
            label="Estimated monthly payment"
            value={`${formatCurrency(result.monthlyPayment)}/mo`}
          />
          <DetailRow
            label="Recommended size"
            value={`${result.systemSize} kW`}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--color-green-light)] text-[var(--color-dark)] font-medium hover:bg-[var(--color-green-light)] transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Recalculate
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 transition-all duration-200 active:scale-[0.98]">
          Request a Quote
        </button>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? "bg-[var(--color-primary-light)] border-[var(--color-primary)]/20"
          : "bg-white border-[var(--color-green-light)]"
      }`}
    >
      <div
        className={`mb-2 ${
          highlight
            ? "text-[var(--color-primary)]"
            : "text-[var(--color-grey-dark)]"
        }`}
      >
        {icon}
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-1">
        {label}
      </p>
      <p
        className={`text-xl font-bold ${
          highlight
            ? "text-[var(--color-primary)]"
            : "text-[var(--color-dark)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-[var(--color-text-secondary)]">
        {label}
      </span>
      <span className="text-sm font-semibold text-[var(--color-dark)]">
        {value}
      </span>
    </div>
  );
}
