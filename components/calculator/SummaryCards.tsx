"use client";

import { CalculationResult } from "@/lib/types";
import { formatCurrency } from "@/lib/calculations";

interface SummaryCardsProps {
  result: CalculationResult;
}

export default function SummaryCards({ result }: SummaryCardsProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--color-dark)] mb-4">Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Row 1 */}
        <SummaryCard
          label="Year 1 Utility/mo"
          value={formatCurrency(result.year1UtilityMonthly)}
          variant="default"
        />
        <SummaryCard
          label="Year 1 Service/mo"
          value={formatCurrency(result.year1ServiceMonthly)}
          variant="gold"
        />
        <SummaryCard
          label="Monthly Difference"
          value={formatCurrency(result.monthlyDifference)}
          variant="teal"
        />

        {/* Row 2 */}
        <SummaryCard
          label="Total Utility (25 yrs)"
          value={formatCurrency(result.totalUtility25)}
          variant="default"
        />
        <SummaryCard
          label="Total Service (25 yrs)"
          value={formatCurrency(result.totalService25)}
          variant="gold"
        />
        <SummaryCard
          label="Lifetime Savings"
          value={formatCurrency(result.lifetimeSavings)}
          subtitle="Over 25 years"
          variant="teal"
        />
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  subtitle,
  variant,
}: {
  label: string;
  value: string;
  subtitle?: string;
  variant: "default" | "gold" | "teal";
}) {
  const bgClass =
    variant === "gold"
      ? "bg-[var(--color-gold-bg)] border-[var(--color-gold)]/20"
      : variant === "teal"
      ? "bg-[var(--color-teal-bg)] border-[var(--color-teal)]/20"
      : "bg-[var(--color-card)] border-[var(--color-input-border)]";

  const valueClass =
    variant === "gold"
      ? "text-[var(--color-gold)]"
      : variant === "teal"
      ? "text-[var(--color-teal)]"
      : "text-[var(--color-dark)]";

  return (
    <div className={`rounded-xl p-5 border ${bgClass}`}>
      <p className="text-sm text-[var(--color-grey)] mb-2">{label}</p>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
      {subtitle && (
        <p className="text-xs text-[var(--color-grey-dark)] mt-1">{subtitle}</p>
      )}
    </div>
  );
}
