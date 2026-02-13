import { CalculatorInput, CalculationResult, ChartDataPoint } from "./types";
import { PEAK_SUN_HOURS, CALC_CONSTANTS } from "./constants";

/**
 * Main calculation function - placeholder logic.
 * Update with real formulas when provided.
 */
export function calculateSolarSavings(
  input: CalculatorInput
): CalculationResult {
  const { monthlyBill, state } = input;
  const sunHours = PEAK_SUN_HOURS[state] || 5.0;

  // Estimate monthly consumption in kWh
  const monthlyConsumption = monthlyBill / CALC_CONSTANTS.AVERAGE_UTILITY_RATE;

  // Calculate system size needed (kW)
  const dailyConsumption = (monthlyConsumption * 12) / 365;
  const systemSize = Math.ceil((dailyConsumption / sunHours) * 1.1); // 10% oversize

  // System cost
  const systemCost = systemSize * 1000 * CALC_CONSTANTS.COST_PER_WATT;

  // Monthly payment (assuming financed over 20 years at ~5% annual)
  const monthlyRate = 0.05 / 12;
  const months = 240;
  const monthlyPayment =
    (systemCost * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);

  // Project costs over 25 years
  const yearlyCostUtility: number[] = [];
  const yearlyCostSolar: number[] = [];

  let cumulativeUtility = 0;
  let cumulativeSolar = systemCost;

  for (let year = 1; year <= CALC_CONSTANTS.PROJECTION_YEARS; year++) {
    // Utility cost grows with inflation
    const yearlyUtilityCost =
      monthlyBill *
      12 *
      Math.pow(1 + CALC_CONSTANTS.ANNUAL_ELECTRICITY_INFLATION, year - 1);
    cumulativeUtility += yearlyUtilityCost;
    yearlyCostUtility.push(Math.round(cumulativeUtility));

    // Solar has minimal ongoing costs (maintenance ~1% of system cost per year)
    const maintenanceCost = systemCost * 0.01;
    cumulativeSolar += maintenanceCost;
    yearlyCostSolar.push(Math.round(cumulativeSolar));
  }

  // Total savings
  const totalSavings =
    yearlyCostUtility[CALC_CONSTANTS.PROJECTION_YEARS - 1] -
    yearlyCostSolar[CALC_CONSTANTS.PROJECTION_YEARS - 1];

  // Payback period (find year where utility cumulative > solar cumulative)
  let paybackPeriod = CALC_CONSTANTS.PROJECTION_YEARS;
  for (let i = 0; i < yearlyCostUtility.length; i++) {
    if (yearlyCostUtility[i] >= yearlyCostSolar[i]) {
      paybackPeriod = i + 1;
      break;
    }
  }

  // ROI
  const roi = (totalSavings / systemCost) * 100;

  return {
    yearlyCostUtility,
    yearlyCostSolar,
    totalSavings,
    paybackPeriod,
    roi,
    systemSize,
    systemCost,
    monthlyPayment,
  };
}

/**
 * Transform calculation results into chart-friendly data
 */
export function getChartData(result: CalculationResult): ChartDataPoint[] {
  return result.yearlyCostUtility.map((cfe, index) => ({
    year: index + 1,
    cfe,
    solar: result.yearlyCostSolar[index],
  }));
}

/**
 * Format number as US Dollar currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
