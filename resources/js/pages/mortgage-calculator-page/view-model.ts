import {
  addMonthsToPeriod,
  annualPercentToMonthlyRate,
  buildAmortisationSchedule,
  calcLoanAmount,
  changeText,
  monthlyRepayment,
  monthlyRepaymentInterestOnly,
  remainingBalance,
  resolveDealRate,
  resolveDepositAmount,
} from './calculations';
import type { AfterDealCardProps } from './components/after-deal-card';
import type { DuringDealCardProps } from './components/during-deal-card';
import type { SingleResultCardProps } from './components/single-result-card';
import type { SummaryCardProps } from './components/summary-card';
import { formatDuration, formatGBP, formatMonthYear } from './formatters';
import type { MortgageInputs } from './store';

export interface ResultsViewModel {
  single: SingleResultCardProps;
  during: DuringDealCardProps;
  after: AfterDealCardProps;
  summary: SummaryCardProps;
}

export function getResultsViewModel(inputs: MortgageInputs): ResultsViewModel {
  const isInterestOnly = inputs.mortgageType === 'interest-only';
  const depositAmount = resolveDepositAmount(
    inputs.propertyPriceGbp,
    inputs.depositMode,
    inputs.depositGbp,
    inputs.depositPercent,
  );
  const loanAmount = calcLoanAmount(inputs.propertyPriceGbp, depositAmount);
  const termMonths = inputs.mortgageTermYears * 12;
  const dealMonths = inputs.dealTermYears * 12;
  const postDealMonths = termMonths - dealMonths;

  const single = buildSingleCard(inputs, loanAmount, depositAmount, termMonths, isInterestOnly);
  const during = buildDuringDealCard(inputs, loanAmount, termMonths, dealMonths, isInterestOnly);
  const after = buildAfterDealCard(
    inputs,
    during.balanceAtEndRaw,
    postDealMonths,
    dealMonths,
    during.monthlyPaymentRaw,
    isInterestOnly,
  );
  const summary = buildSummaryCard(
    inputs,
    loanAmount,
    depositAmount,
    during.totalPaidRaw,
    after.totalPaidRaw,
    isInterestOnly,
  );

  return { single, during: during.card, after: after.card, summary };
}

function buildSingleCard(
  inputs: MortgageInputs,
  loanAmount: number,
  depositAmount: number,
  termMonths: number,
  isInterestOnly: boolean,
): SingleResultCardProps {
  const rate = annualPercentToMonthlyRate(inputs.interestRatePercent);
  const monthlyPaymentRaw = isInterestOnly
    ? monthlyRepaymentInterestOnly(loanAmount, rate)
    : monthlyRepayment(loanAmount, rate, termMonths);
  const totalPaidRaw = monthlyPaymentRaw * termMonths;
  const totalInterestRaw = isInterestOnly ? totalPaidRaw : totalPaidRaw - loanAmount;

  return {
    monthlyPayment: formatGBP(monthlyPaymentRaw),
    paymentTermText: `for ${formatDuration(termMonths)}`,
    housePrice: formatGBP(inputs.propertyPriceGbp),
    deposit: formatGBP(depositAmount),
    loan: formatGBP(loanAmount),
    totalPaid: formatGBP(totalPaidRaw),
    totalInterest: formatGBP(totalInterestRaw),
    dateLabel: isInterestOnly ? 'Mortgage term ends' : 'Mortgage Payoff Date',
    endDate: formatMonthYear(addMonthsToPeriod(inputs.startDate, termMonths)),
    showVehicleNotice: isInterestOnly,
    paymentSchedule: buildAmortisationSchedule(
      loanAmount,
      rate,
      termMonths,
      termMonths,
      inputs.startDate,
      isInterestOnly,
    ),
  };
}

function buildDuringDealCard(
  inputs: MortgageInputs,
  loanAmount: number,
  termMonths: number,
  dealMonths: number,
  isInterestOnly: boolean,
): { card: DuringDealCardProps; balanceAtEndRaw: number; monthlyPaymentRaw: number; totalPaidRaw: number } {
  const dealRate = resolveDealRate(
    inputs.dealType,
    inputs.interestRatePercent,
    inputs.baseRatePercent,
    inputs.marginPercent,
  );
  const rate = annualPercentToMonthlyRate(dealRate);
  const monthlyPaymentRaw = isInterestOnly
    ? monthlyRepaymentInterestOnly(loanAmount, rate)
    : monthlyRepayment(loanAmount, rate, termMonths);
  const balanceAtEndRaw = isInterestOnly
    ? loanAmount
    : remainingBalance(loanAmount, rate, termMonths, dealMonths);
  const totalPaidRaw = monthlyPaymentRaw * dealMonths;
  const totalInterestRaw = isInterestOnly
    ? totalPaidRaw
    : totalPaidRaw - (loanAmount - balanceAtEndRaw);
  const totalPrincipalRaw = totalPaidRaw - totalInterestRaw;

  const card: DuringDealCardProps = {
    monthlyPayment: formatGBP(monthlyPaymentRaw),
    paymentTermText: `for ${formatDuration(dealMonths)}`,
    loan: formatGBP(loanAmount),
    totalPaidLabel: 'Total paid',
    totalPaid: formatGBP(totalPaidRaw),
    balanceAtEnd: formatGBP(balanceAtEndRaw),
    totalInterest: formatGBP(totalInterestRaw),
    totalPrincipal: formatGBP(totalPrincipalRaw),
    dateLabel: isInterestOnly ? 'Deal period ends' : 'Deal end date',
    endDate: formatMonthYear(addMonthsToPeriod(inputs.startDate, dealMonths)),
    paymentSchedule: buildAmortisationSchedule(
      loanAmount,
      rate,
      termMonths,
      dealMonths,
      inputs.startDate,
      isInterestOnly,
    ),
  };

  return { card, balanceAtEndRaw, monthlyPaymentRaw, totalPaidRaw };
}

function buildAfterDealCard(
  inputs: MortgageInputs,
  postDealBalanceRaw: number,
  postDealMonths: number,
  dealMonths: number,
  dealMonthlyPaymentRaw: number,
  isInterestOnly: boolean,
): { card: AfterDealCardProps; totalPaidRaw: number } {
  if (postDealMonths <= 0) {
    const zeroCard: AfterDealCardProps = {
      monthlyPayment: formatGBP(0),
      paymentTermText: '',
      changeText: '',
      loan: formatGBP(postDealBalanceRaw),
      totalPaidLabel: 'Total paid',
      totalPaid: formatGBP(0),
      totalInterest: formatGBP(0),
      totalPrincipal: formatGBP(0),
      dateLabel: isInterestOnly ? 'Full balance due on' : 'Mortgage payoff date',
      endDate: '',
      paymentSchedule: [],
    };

    return { card: zeroCard, totalPaidRaw: 0 };
  }

  const rate = annualPercentToMonthlyRate(inputs.standardVariableRatePercent);
  const postDealStartPeriod = addMonthsToPeriod(inputs.startDate, dealMonths);
  const monthlyPaymentRaw = isInterestOnly
    ? monthlyRepaymentInterestOnly(postDealBalanceRaw, rate)
    : monthlyRepayment(postDealBalanceRaw, rate, postDealMonths);
  const totalPaidRaw = monthlyPaymentRaw * postDealMonths;
  const totalInterestRaw = isInterestOnly ? totalPaidRaw : totalPaidRaw - postDealBalanceRaw;
  const totalPrincipalRaw = totalPaidRaw - totalInterestRaw;
  const paymentIncreaseRaw = monthlyPaymentRaw - dealMonthlyPaymentRaw;

  const card: AfterDealCardProps = {
    monthlyPayment: formatGBP(monthlyPaymentRaw),
    paymentTermText: `for ${formatDuration(postDealMonths)}`,
    changeText: changeText(paymentIncreaseRaw),
    loan: formatGBP(postDealBalanceRaw),
    totalPaidLabel: 'Total paid',
    totalPaid: formatGBP(totalPaidRaw),
    totalInterest: formatGBP(totalInterestRaw),
    totalPrincipal: formatGBP(totalPrincipalRaw),
    dateLabel: isInterestOnly ? 'Full balance due on' : 'Mortgage payoff date',
    endDate: formatMonthYear(addMonthsToPeriod(postDealStartPeriod, postDealMonths)),
    paymentSchedule: buildAmortisationSchedule(
      postDealBalanceRaw,
      rate,
      postDealMonths,
      postDealMonths,
      postDealStartPeriod,
      isInterestOnly,
    ),
  };

  return { card, totalPaidRaw };
}

function buildSummaryCard(
  inputs: MortgageInputs,
  loanAmount: number,
  depositAmount: number,
  duringTotalPaidRaw: number,
  afterTotalPaidRaw: number,
  isInterestOnly: boolean,
): SummaryCardProps {
  const totalPaidRaw = duringTotalPaidRaw + afterTotalPaidRaw;
  const totalInterestRaw = isInterestOnly ? totalPaidRaw : totalPaidRaw - loanAmount;

  return {
    housePrice: formatGBP(inputs.propertyPriceGbp),
    deposit: formatGBP(depositAmount),
    loan: formatGBP(loanAmount),
    totalPaidLabel: 'Total Paid',
    totalPaid: formatGBP(totalPaidRaw),
    totalInterest: formatGBP(totalInterestRaw),
    showVehicleNotice: isInterestOnly,
  };
}
