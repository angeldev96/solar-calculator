export interface CalculatorInputs {
  customerName: string;
  // Utility details
  annualKwhUsage: number;
  utilityRate: number;
  utilityInflationRate: number;
  monthlyConnectionFee: number;
  // Service plan details
  calculateBy: "kwhRate" | "monthlyPrice";
  servicePrice: number;
  annualSystemProduction: number;
  annualServiceEscalator: number;
}

export interface YearData {
  year: number;
  utilityMonthly: number;
  utilityYearly: number;
  serviceMonthly: number;
  serviceYearly: number;
  monthlySavings: number;
  annualSavings: number;
  cumulativeSavings: number;
}

export interface CalculationResult {
  yearData: YearData[];
  year1UtilityMonthly: number;
  year1ServiceMonthly: number;
  monthlyDifference: number;
  totalUtility25: number;
  totalService25: number;
  lifetimeSavings: number;
}
