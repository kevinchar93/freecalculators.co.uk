export type MortgageType = 'repayment' | 'interest-only';
export type DepositMode = 'amount' | 'percent';
export type DealType = 'fixed' | 'tracker';

export interface ScheduleRow {
  period: string;
  interest: string;
  principal: string;
  balance: string;
}

export interface AmortisationSchedule {
  monthly: ScheduleRow[];
  annual: ScheduleRow[];
}
