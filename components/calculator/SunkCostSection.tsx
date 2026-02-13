"use client";

import { History, DollarSign, Calendar, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { SunkCostResult } from "@/lib/types";
import { formatCurrency, formatCurrencyShort } from "@/lib/calculations";

interface SunkCostSectionProps {
  result: SunkCostResult;
  currentMonthlyBill: number;
}

export default function SunkCostSection({
  result,
  currentMonthlyBill,
}: SunkCostSectionProps) {
  if (result.yearData.length === 0) return null;

  const chartData = result.yearData.map((d) => ({
    year: d.year,
    annual: d.annualCost,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/15 flex items-center justify-center">
          <History className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-dark)]">
            Sunk Cost Analysis
          </h2>
          <p className="text-sm text-[var(--color-grey)]">
            What you&apos;ve already paid to the utility since moving in
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SunkMetricCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Total Paid to Date"
          value={formatCurrencyShort(result.totalPaidToDate)}
          variant="primary"
        />
        <SunkMetricCard
          icon={<Calendar className="w-5 h-5" />}
          label="Years in Home"
          value={`${result.yearsInHome} years`}
          variant="default"
        />
        <SunkMetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="First Monthly Bill"
          value={formatCurrency(result.firstMonthlyBill)}
          subtitle={`Year ${result.yearData[0]?.year}`}
          variant="gold"
        />
        <SunkMetricCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Current Monthly Bill"
          value={formatCurrency(currentMonthlyBill)}
          subtitle={`+${formatCurrency(currentMonthlyBill - result.firstMonthlyBill)}/mo vs move-in`}
          variant="teal"
        />
      </div>

      {/* Bar Chart */}
      <div className="bg-[var(--color-card)] rounded-xl p-6 sm:p-8">
        <h3 className="text-base font-semibold text-[var(--color-dark)] mb-6">
          Annual Electricity Cost by Year
        </h3>
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D1D8D4" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11, fill: "#65776D" }}
                axisLine={{ stroke: "#D1D8D4" }}
                tickLine={{ stroke: "#D1D8D4" }}
                interval={result.yearData.length > 20 ? 4 : result.yearData.length > 10 ? 2 : 0}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#65776D" }}
                axisLine={{ stroke: "#D1D8D4" }}
                tickLine={{ stroke: "#D1D8D4" }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value as number), "Annual Cost"]}
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D1D8D4",
                  borderRadius: "8px",
                  color: "#1F2723",
                }}
                itemStyle={{ color: "#1F2723" }}
                labelStyle={{ color: "#65776D", marginBottom: "4px" }}
              />
              <Bar dataKey="annual" radius={[3, 3, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.year}
                    fill={
                      index === 0
                        ? "#C8A951"
                        : index === chartData.length - 1
                        ? "#F9593B"
                        : "#4ECDC4"
                    }
                    fillOpacity={0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-4 text-xs text-[var(--color-grey)]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-gold)]" />
            First year
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-teal)]" />
            Historical years
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-primary)]" />
            Current year
          </span>
        </div>
      </div>

      {/* Year-by-Year Table */}
      <div className="bg-[var(--color-card)] rounded-xl p-6 sm:p-8">
        <h3 className="text-base font-semibold text-[var(--color-dark)] mb-4">
          Year-by-Year Sunk Cost
        </h3>
        <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-input-border)]">
                <th className="text-left py-3 px-3 text-[var(--color-grey)] font-medium">
                  Year
                </th>
                <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                  Est. Rate ($/kWh)
                </th>
                <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                  Monthly Bill
                </th>
                <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                  Annual Cost
                </th>
                <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                  Cumulative Paid
                </th>
              </tr>
            </thead>
            <tbody>
              {result.yearData.map((row, index) => {
                const isFirst = index === 0;
                const isLast = index === result.yearData.length - 1;
                const rowBg = isFirst
                  ? "bg-[var(--color-gold-bg)]"
                  : isLast
                  ? "bg-[var(--color-primary)]/5"
                  : "";

                return (
                  <tr
                    key={row.year}
                    className={`border-b border-[var(--color-input-border)]/50 ${rowBg}`}
                  >
                    <td className="py-2.5 px-3 font-medium text-[var(--color-dark)]">
                      {row.year}
                      {isFirst && (
                        <span className="ml-2 text-xs text-[var(--color-gold)]">
                          Move-in
                        </span>
                      )}
                      {isLast && (
                        <span className="ml-2 text-xs text-[var(--color-primary)]">
                          Current
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right text-[var(--color-grey)]">
                      ${row.estimatedRate.toFixed(3)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-[var(--color-red)]">
                      {formatCurrency(row.monthlyBill)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-[var(--color-red)]">
                      {formatCurrency(row.annualCost)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-[var(--color-primary)]">
                      {formatCurrency(row.cumulativeCost)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[var(--color-input-border)]">
                <td
                  colSpan={3}
                  className="py-3 px-3 font-semibold text-[var(--color-dark)]"
                >
                  Total Paid to Utility
                </td>
                <td className="py-3 px-3 text-right font-bold text-[var(--color-primary)] text-base">
                  {formatCurrency(result.totalPaidToDate)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

function SunkMetricCard({
  icon,
  label,
  value,
  subtitle,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  variant: "default" | "primary" | "gold" | "teal";
}) {
  const styles = {
    default: {
      bg: "bg-[var(--color-card)] border-[var(--color-input-border)]",
      icon: "text-[var(--color-grey)]",
      value: "text-[var(--color-dark)]",
    },
    primary: {
      bg: "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20",
      icon: "text-[var(--color-primary)]",
      value: "text-[var(--color-primary)]",
    },
    gold: {
      bg: "bg-[var(--color-gold-bg)] border-[var(--color-gold)]/20",
      icon: "text-[var(--color-gold)]",
      value: "text-[var(--color-gold)]",
    },
    teal: {
      bg: "bg-[var(--color-teal-bg)] border-[var(--color-teal)]/20",
      icon: "text-[var(--color-teal)]",
      value: "text-[var(--color-teal)]",
    },
  };

  const s = styles[variant];

  return (
    <div className={`rounded-xl p-5 border ${s.bg}`}>
      <div className={`mb-2 ${s.icon}`}>{icon}</div>
      <p className="text-sm text-[var(--color-grey)] mb-1">{label}</p>
      <p className={`text-2xl font-bold ${s.value}`}>{value}</p>
      {subtitle && (
        <p className="text-xs text-[var(--color-grey-dark)] mt-1">{subtitle}</p>
      )}
    </div>
  );
}
