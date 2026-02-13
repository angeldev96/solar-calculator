import { CalculatorInputs, CalculationResult, YearData } from "./types";

const PROJECTION_YEARS = 25;

export function calculateResults(inputs: CalculatorInputs): CalculationResult {
  const {
    annualKwhUsage,
    utilityRate,
    utilityInflationRate,
    monthlyConnectionFee,
    calculateBy,
    servicePrice,
    annualSystemProduction,
    annualServiceEscalator,
  } = inputs;

  const yearData: YearData[] = [];
  let cumulativeSavings = 0;
  let totalUtility25 = 0;
  let totalService25 = 0;

  for (let year = 1; year <= PROJECTION_YEARS; year++) {
    // Utility cost with inflation
    const inflatedRate =
      utilityRate * Math.pow(1 + utilityInflationRate / 100, year - 1);
    const utilityYearly =
      annualKwhUsage * inflatedRate + monthlyConnectionFee * 12;
    const utilityMonthly = utilityYearly / 12;

    // Service cost with escalator
    let serviceMonthly: number;
    if (calculateBy === "kwhRate") {
      const escalatedServiceRate =
        servicePrice * Math.pow(1 + annualServiceEscalator / 100, year - 1);
      serviceMonthly = (annualSystemProduction * escalatedServiceRate) / 12;
    } else {
      serviceMonthly =
        servicePrice * Math.pow(1 + annualServiceEscalator / 100, year - 1);
    }

    const serviceYearly = serviceMonthly * 12;
    const monthlySavings = utilityMonthly - serviceMonthly;
    const annualSavings = utilityYearly - serviceYearly;
    cumulativeSavings += annualSavings;

    totalUtility25 += utilityYearly;
    totalService25 += serviceYearly;

    yearData.push({
      year,
      utilityMonthly,
      utilityYearly,
      serviceMonthly,
      serviceYearly,
      monthlySavings,
      annualSavings,
      cumulativeSavings,
    });
  }

  return {
    yearData,
    year1UtilityMonthly: yearData[0]?.utilityMonthly ?? 0,
    year1ServiceMonthly: yearData[0]?.serviceMonthly ?? 0,
    monthlyDifference:
      (yearData[0]?.utilityMonthly ?? 0) - (yearData[0]?.serviceMonthly ?? 0),
    totalUtility25,
    totalService25,
    lifetimeSavings: totalUtility25 - totalService25,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCurrencyShort(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
