import {
  CalculatorInputs,
  CalculationResult,
  YearData,
  SunkCostResult,
  SunkCostYearData,
} from "./types";
import { HISTORICAL_RATES, CURRENT_YEAR } from "./historical-rates";

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

/**
 * Calculate sunk cost - what the homeowner has paid historically
 * Works backwards from current bill using historical electricity rates
 */
export function calculateSunkCost(
  currentMonthlyBill: number,
  yearMovedIn: number
): SunkCostResult {
  const currentRate = HISTORICAL_RATES[CURRENT_YEAR] ?? 0.19;
  const yearData: SunkCostYearData[] = [];
  let cumulativeCost = 0;

  for (let year = yearMovedIn; year <= CURRENT_YEAR; year++) {
    const historicalRate = HISTORICAL_RATES[year] ?? currentRate;
    // Scale the current bill proportionally to the historical rate
    const monthlyBill = currentMonthlyBill * (historicalRate / currentRate);
    const annualCost = monthlyBill * 12;
    cumulativeCost += annualCost;

    yearData.push({
      year,
      estimatedRate: historicalRate,
      monthlyBill,
      annualCost,
      cumulativeCost,
    });
  }

  const firstMonthlyBill = yearData[0]?.monthlyBill ?? 0;
  const yearsInHome = CURRENT_YEAR - yearMovedIn + 1;
  const averageAnnualCost = yearsInHome > 0 ? cumulativeCost / yearsInHome : 0;

  return {
    yearData,
    firstMonthlyBill,
    totalPaidToDate: cumulativeCost,
    yearsInHome,
    averageAnnualCost,
  };
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
