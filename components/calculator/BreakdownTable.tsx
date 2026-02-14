"use client";

import { YearData } from "@/lib/types";
import { formatCurrency } from "@/lib/calculations";

interface BreakdownTableProps {
  yearData: YearData[];
}

export default function BreakdownTable({ yearData }: BreakdownTableProps) {
  // Get Year 1 utility monthly cost
  const year1UtilityMonthly = yearData[0]?.utilityMonthly || 0;

  // Find the crossover year (when service monthly cost reaches Year 1 utility monthly cost)
  const crossoverYear = yearData.find(
    (d) => d.serviceMonthly >= year1UtilityMonthly && d.year > 1
  )?.year;

  return (
    <div className="bg-[var(--color-card)] rounded-xl p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-[var(--color-dark)] mb-2">
        Year-by-Year Breakdown
      </h2>

      {crossoverYear && (
        <div className="mb-6 p-4 rounded-lg bg-[var(--color-teal-bg)] border border-[var(--color-teal)]/20">
          <p className="text-sm text-[var(--color-teal)]">
            <span className="font-semibold">Year {crossoverYear}</span> is when
            your solar service monthly cost ({formatCurrency(yearData.find(d => d.year === crossoverYear)?.serviceMonthly || 0)})
            reaches your Year 1 utility monthly cost ({formatCurrency(year1UtilityMonthly)}).
          </p>
        </div>
      )}

      <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-input-border)]">
              <th className="text-left py-3 px-3 text-[var(--color-grey)] font-medium">
                Year
              </th>
              <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                Utility/mo
              </th>
              <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                Utility/yr
              </th>
              <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                Service/mo
              </th>
              <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                Service/yr
              </th>
              <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                Monthly Savings
              </th>
              <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                Annual Savings
              </th>
              <th className="text-right py-3 px-3 text-[var(--color-grey)] font-medium">
                Cumulative
              </th>
            </tr>
          </thead>
          <tbody>
            {yearData.map((row) => {
              const isYear1 = row.year === 1;
              const isCrossover = row.year === crossoverYear;
              const rowBg = isYear1
                ? "bg-[var(--color-gold-bg)]"
                : isCrossover
                ? "bg-[var(--color-teal-bg)]"
                : "";

              return (
                <tr
                  key={row.year}
                  className={`border-b border-[var(--color-input-border)]/50 ${rowBg}`}
                >
                  <td className="py-2.5 px-3 font-medium text-[var(--color-dark)]">
                    {row.year}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[var(--color-red)]">
                    {formatCurrency(row.utilityMonthly)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[var(--color-red)]">
                    {formatCurrency(row.utilityYearly)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[var(--color-gold)]">
                    {formatCurrency(row.serviceMonthly)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-[var(--color-gold)]">
                    {formatCurrency(row.serviceYearly)}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right ${
                      row.monthlySavings >= 0
                        ? "text-[var(--color-teal)]"
                        : "text-[var(--color-red)]"
                    }`}
                  >
                    {formatCurrency(row.monthlySavings)}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right ${
                      row.annualSavings >= 0
                        ? "text-[var(--color-teal)]"
                        : "text-[var(--color-red)]"
                    }`}
                  >
                    {formatCurrency(row.annualSavings)}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-right font-medium ${
                      row.cumulativeSavings >= 0
                        ? "text-[var(--color-teal)]"
                        : "text-[var(--color-red)]"
                    }`}
                  >
                    {formatCurrency(row.cumulativeSavings)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
