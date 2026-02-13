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
      <h2 className="text-lg font-semibold text-[var(--color-dark)] mb-6">
        Annual Cost Comparison
      </h2>
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D1D8D4" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: "#65776D" }}
              axisLine={{ stroke: "#D1D8D4" }}
              tickLine={{ stroke: "#D1D8D4" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#65776D" }}
              axisLine={{ stroke: "#D1D8D4" }}
              tickLine={{ stroke: "#D1D8D4" }}
              tickFormatter={(val) => {
                if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
                return `$${val}`;
              }}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(value as number)]}
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
            <Legend
              wrapperStyle={{ color: "#65776D", paddingTop: "16px" }}
            />
            <Line
              type="monotone"
              dataKey="utility"
              name="Utility Cost"
              stroke="#F9593B"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#F9593B", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="service"
              name="Service Cost"
              stroke="#0D7377"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#0D7377", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Annual Savings"
              stroke="#A07D1C"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 5, fill: "#A07D1C", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
