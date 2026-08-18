import { formatGBP, formatPercent, formatShortMonthYear } from './formatters';
import type { DealType, DepositMode, ScheduleRow } from './types';

export function annualPercentToMonthlyRate(annualPercent: number): number {
  return annualPercent / 100 / 12;
}

export function resolveDepositAmount(
  propertyPriceGbp: number,
  depositMode: DepositMode,
  depositGbp: number,
  depositPercent: number,
): number {
  return depositMode === 'amount'
    ? depositGbp
    : depositPercentToAmount(propertyPriceGbp, depositPercent);
}

export function resolveDealRate(
  dealType: DealType,
  interestRatePercent: number,
  baseRatePercent: number,
  marginPercent: number,
): number {
  return dealType === 'tracker'
    ? baseRatePercent + marginPercent
    : interestRatePercent;
}

export function monthlyRepayment(
  principal: number,
  monthlyRate: number,
  months: number,
): number {
  if (monthlyRate === 0) {
    return principal / months;
  }

  const growth = (1 + monthlyRate) ** months;

  return (principal * (monthlyRate * growth)) / (growth - 1);
}

export function monthlyRepaymentInterestOnly(
  principal: number,
  monthlyRate: number,
): number {
  return monthlyRate === 0 ? 0 : principal * monthlyRate;
}

export function remainingBalance(
  principal: number,
  monthlyRate: number,
  months: number,
  paymentsMade: number,
): number {
  if (monthlyRate === 0) {
    return principal * (1 - paymentsMade / months);
  }

  const growthTotal = (1 + monthlyRate) ** months;
  const growthPaid = (1 + monthlyRate) ** paymentsMade;

  return (principal * (growthTotal - growthPaid)) / (growthTotal - 1);
}

export function addMonthsToPeriod(period: string, months: number): string {
  const [year, month] = period.split('-').map(Number);
  const total = year * 12 + (month - 1) + months;

  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, '0')}`;
}

export function splitPercentages(principalRaw: number, totalRaw: number) {
  const principalPercent = (principalRaw / totalRaw) * 100;
  const interestPercent = 100 - principalPercent;

  return {
    principalPercent,
    interestPercent,
    principalPercentLabel: formatPercent(principalPercent),
    interestPercentLabel: formatPercent(interestPercent),
  };
}

export function buildAmortisationSchedule(
  principal: number,
  monthlyRate: number,
  amortisationMonths: number,
  rowsToShow: number,
  startPeriod: string,
  interestOnly: boolean,
): ScheduleRow[] {
  const payment = interestOnly
    ? monthlyRepaymentInterestOnly(principal, monthlyRate)
    : monthlyRepayment(principal, monthlyRate, amortisationMonths);
  let balance = principal;
  const rows: ScheduleRow[] = [];

  for (let month = 1; month <= rowsToShow; month++) {
    const interest = balance * monthlyRate;
    const principalPortion = interestOnly ? 0 : payment - interest;
    balance = interestOnly
      ? principal
      : Math.max(0, balance - principalPortion);
    rows.push({
      period: formatShortMonthYear(addMonthsToPeriod(startPeriod, month)),
      interest: formatGBP(interest),
      principal: formatGBP(principalPortion),
      balance: formatGBP(balance),
    });
  }

  return rows;
}

export function changeText(increase: number): string {
  const magnitude = formatGBP(Math.abs(increase));
  const direction = increase >= 0 ? 'An increase' : 'A decrease';

  return `${direction} of ${magnitude} when your deal ends`;
}

export function depositPercentToAmount(propertyPriceGbp: number, depositPercent: number): number {
  return Math.round((propertyPriceGbp * depositPercent) / 100)
}

export function depositAmountToPercent(propertyPriceGbp: number, depositAmount: number): number {
  return propertyPriceGbp > 0
    ? Math.round((depositAmount / propertyPriceGbp) * 1000) / 10
    : 0
}

export function calcLoanAmount(propertyPriceGbp: number, depositAmount: number) {
  return Math.max(0, propertyPriceGbp - depositAmount)
}

export function calcLoanToValue(propertyPriceGbp: number, loanAmount: number) {
  return propertyPriceGbp > 0 ? (loanAmount / propertyPriceGbp) * 100 : 0
}