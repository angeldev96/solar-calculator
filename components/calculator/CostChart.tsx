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
import { YearData } from "@/lib/types";
import { formatCurrency } from "@/lib/calculations";

interface CostChartProps {
  yearData: YearData[];
}

export default function CostChart({ yearData }: CostChartProps) {
  const chartData = yearData.map((d) => ({
    year: d.year,
    utility: d.utilityYearly,
    service: d.serviceYearly,
    savings: d.annualSavings,
  }));

  return (
    <div className="bg-[var(--color-card)] rounded-xl p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-white mb-6">
        Annual Cost Comparison
      </h2>
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3A4A43" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: "#A7B1B0" }}
              axisLine={{ stroke: "#3A4A43" }}
              tickLine={{ stroke: "#3A4A43" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#A7B1B0" }}
              axisLine={{ stroke: "#3A4A43" }}
              tickLine={{ stroke: "#3A4A43" }}
              tickFormatter={(val) => {
                if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
                return `$${val}`;
              }}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(value as number)]}
              labelFormatter={(label) => `Year ${label}`}
              contentStyle={{
                backgroundColor: "#2A3631",
                border: "1px solid #4A5E55",
                borderRadius: "8px",
                color: "#E8EDE9",
              }}
              itemStyle={{ color: "#E8EDE9" }}
              labelStyle={{ color: "#A7B1B0", marginBottom: "4px" }}
            />
            <Legend
              wrapperStyle={{ color: "#A7B1B0", paddingTop: "16px" }}
            />
            <Line
              type="monotone"
              dataKey="utility"
              name="Utility Cost"
              stroke="#F9593B"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#F9593B", stroke: "#1F2723", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="service"
              name="Service Cost"
              stroke="#4ECDC4"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#4ECDC4", stroke: "#1F2723", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Annual Savings"
              stroke="#C8A951"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 5, fill: "#C8A951", stroke: "#1F2723", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
