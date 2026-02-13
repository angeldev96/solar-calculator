export interface CalculatorFormData {
  monthlyBill: number;
  state: string;
}

export interface CalculatorInput {
  monthlyBill: number;
  state: string;
}

export interface CalculationResult {
  yearlyCostUtility: number[];
  yearlyCostSolar: number[];
  totalSavings: number;
  paybackPeriod: number;
  roi: number;
  systemSize: number;
  systemCost: number;
  monthlyPayment: number;
}

export interface ChartDataPoint {
  year: number;
  cfe: number;
  solar: number;
}
