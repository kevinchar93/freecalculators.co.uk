import {
  addMonthsToPeriod,
  buildAmortisationSchedule,
  changeText,
  monthlyRepayment,
  monthlyRepaymentInterestOnly,
  remainingBalance,
} from './calculations';
import { formatDuration, formatGBP, formatMonthYear } from './formatters';

// Illustrative example figures used to give the result cards realistic shape.
// These are not recalculated from the form inputs above.
const DEMO_HOUSE_PRICE = 250000;
const DEMO_DEPOSIT = 50000;
const DEMO_LOAN_AMOUNT = DEMO_HOUSE_PRICE - DEMO_DEPOSIT;
const DEMO_START_PERIOD = '2026-09';
const DEMO_TERM_MONTHS = 300;
const DEMO_DEAL_MONTHS = 60;
const DEMO_POST_DEAL_MONTHS = DEMO_TERM_MONTHS - DEMO_DEAL_MONTHS;
const DEMO_WHOLE_TERM_RATE = 5.25 / 100 / 12;
const DEMO_SVR_RATE = 7.5 / 100 / 12;
const DEMO_DEPOSIT_FORMATTED = formatGBP(DEMO_DEPOSIT);
const DEMO_TERM_DURATION_TEXT = `for ${formatDuration(DEMO_TERM_MONTHS)}`;
const DEMO_DEAL_DURATION_TEXT = `for ${formatDuration(DEMO_DEAL_MONTHS)}`;
const DEMO_POST_DEAL_DURATION_TEXT = `for ${formatDuration(DEMO_POST_DEAL_MONTHS)}`;

// "Your Results" (no deal period)
const noDealMonthlyRepay = monthlyRepayment(
  DEMO_LOAN_AMOUNT,
  DEMO_WHOLE_TERM_RATE,
  DEMO_TERM_MONTHS,
);
const noDealTotalPaidRepay = noDealMonthlyRepay * DEMO_TERM_MONTHS;
const noDealTotalInterestRepay = noDealTotalPaidRepay - DEMO_LOAN_AMOUNT;

const noDealMonthlyIO = monthlyRepaymentInterestOnly(
  DEMO_LOAN_AMOUNT,
  DEMO_WHOLE_TERM_RATE,
);
const noDealTotalPaidIO = noDealMonthlyIO * DEMO_TERM_MONTHS;

export const singleCardRepayment = {
  monthlyPayment: formatGBP(noDealMonthlyRepay),
  paymentTermText: DEMO_TERM_DURATION_TEXT,
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  deposit: DEMO_DEPOSIT_FORMATTED,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaid: formatGBP(noDealTotalPaidRepay),
  totalInterest: formatGBP(noDealTotalInterestRepay),
  dateLabel: 'Mortgage Payoff Date',
  endDate: formatMonthYear(addMonthsToPeriod(DEMO_START_PERIOD, DEMO_TERM_MONTHS)),
  showVehicleNotice: false,
  paymentSchedule: buildAmortisationSchedule(
    DEMO_LOAN_AMOUNT,
    DEMO_WHOLE_TERM_RATE,
    DEMO_TERM_MONTHS,
    DEMO_TERM_MONTHS,
    DEMO_START_PERIOD,
    false,
  ),
};

export const singleCardInterestOnly = {
  monthlyPayment: formatGBP(noDealMonthlyIO),
  paymentTermText: DEMO_TERM_DURATION_TEXT,
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  deposit: DEMO_DEPOSIT_FORMATTED,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaid: formatGBP(noDealTotalPaidIO),
  totalInterest: formatGBP(noDealTotalPaidIO),
  dateLabel: 'Mortgage term ends',
  endDate: formatMonthYear(addMonthsToPeriod(DEMO_START_PERIOD, DEMO_TERM_MONTHS)),
  showVehicleNotice: true,
  paymentSchedule: buildAmortisationSchedule(
    DEMO_LOAN_AMOUNT,
    DEMO_WHOLE_TERM_RATE,
    DEMO_TERM_MONTHS,
    DEMO_TERM_MONTHS,
    DEMO_START_PERIOD,
    true,
  ),
};

// Card 1 — "During Your Deal"
const dealMonthlyRepay = monthlyRepayment(
  DEMO_LOAN_AMOUNT,
  DEMO_WHOLE_TERM_RATE,
  DEMO_TERM_MONTHS,
);
const dealBalanceAtEnd = remainingBalance(
  DEMO_LOAN_AMOUNT,
  DEMO_WHOLE_TERM_RATE,
  DEMO_TERM_MONTHS,
  DEMO_DEAL_MONTHS,
);
const dealTotalPaidRepay = dealMonthlyRepay * DEMO_DEAL_MONTHS;
const dealTotalInterestRepay =
  dealTotalPaidRepay - (DEMO_LOAN_AMOUNT - dealBalanceAtEnd);
const dealTotalPrincipalRepay = dealTotalPaidRepay - dealTotalInterestRepay;

const dealMonthlyIO = monthlyRepaymentInterestOnly(
  DEMO_LOAN_AMOUNT,
  DEMO_WHOLE_TERM_RATE,
);
const dealTotalPaidIO = dealMonthlyIO * DEMO_DEAL_MONTHS;

export const duringDealCardRepayment = {
  monthlyPayment: formatGBP(dealMonthlyRepay),
  paymentTermText: DEMO_DEAL_DURATION_TEXT,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: 'Total paid',
  totalPaid: formatGBP(dealTotalPaidRepay),
  balanceAtEnd: formatGBP(dealBalanceAtEnd),
  totalInterest: formatGBP(dealTotalInterestRepay),
  totalPrincipal: formatGBP(dealTotalPrincipalRepay),
  dateLabel: 'Deal end date',
  endDate: formatMonthYear(addMonthsToPeriod(DEMO_START_PERIOD, DEMO_DEAL_MONTHS)),
  paymentSchedule: buildAmortisationSchedule(
    DEMO_LOAN_AMOUNT,
    DEMO_WHOLE_TERM_RATE,
    DEMO_TERM_MONTHS,
    DEMO_DEAL_MONTHS,
    DEMO_START_PERIOD,
    false,
  ),
};

export const duringDealCardInterestOnly = {
  monthlyPayment: formatGBP(dealMonthlyIO),
  paymentTermText: DEMO_DEAL_DURATION_TEXT,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: 'Total paid',
  totalPaid: formatGBP(dealTotalPaidIO),
  balanceAtEnd: formatGBP(DEMO_LOAN_AMOUNT),
  totalInterest: formatGBP(dealTotalPaidIO),
  totalPrincipal: formatGBP(0),
  dateLabel: 'Deal period ends',
  endDate: formatMonthYear(addMonthsToPeriod(DEMO_START_PERIOD, DEMO_DEAL_MONTHS)),
  paymentSchedule: buildAmortisationSchedule(
    DEMO_LOAN_AMOUNT,
    DEMO_WHOLE_TERM_RATE,
    DEMO_TERM_MONTHS,
    DEMO_DEAL_MONTHS,
    DEMO_START_PERIOD,
    true,
  ),
};

// Card 2 — "After Your Deal"
const postDealPeriod = addMonthsToPeriod(DEMO_START_PERIOD, DEMO_DEAL_MONTHS);
const postMonthlyRepay = monthlyRepayment(
  dealBalanceAtEnd,
  DEMO_SVR_RATE,
  DEMO_POST_DEAL_MONTHS,
);
const postTotalPaidRepay = postMonthlyRepay * DEMO_POST_DEAL_MONTHS;
const postTotalInterestRepay = postTotalPaidRepay - dealBalanceAtEnd;
const postTotalPrincipalRepay = postTotalPaidRepay - postTotalInterestRepay;
const paymentIncreaseRepay = postMonthlyRepay - dealMonthlyRepay;

const postMonthlyIO = monthlyRepaymentInterestOnly(
  DEMO_LOAN_AMOUNT,
  DEMO_SVR_RATE,
);
const postTotalPaidIO = postMonthlyIO * DEMO_POST_DEAL_MONTHS;
const paymentIncreaseIO = postMonthlyIO - dealMonthlyIO;

export const afterDealCardRepayment = {
  monthlyPayment: formatGBP(postMonthlyRepay),
  paymentTermText: DEMO_POST_DEAL_DURATION_TEXT,
  changeText: changeText(paymentIncreaseRepay),
  loan: formatGBP(dealBalanceAtEnd),
  totalPaidLabel: 'Total paid',
  totalPaid: formatGBP(postTotalPaidRepay),
  totalInterest: formatGBP(postTotalInterestRepay),
  totalPrincipal: formatGBP(postTotalPrincipalRepay),
  dateLabel: 'Mortgage payoff date',
  endDate: formatMonthYear(
    addMonthsToPeriod(postDealPeriod, DEMO_POST_DEAL_MONTHS),
  ),
  paymentSchedule: buildAmortisationSchedule(
    dealBalanceAtEnd,
    DEMO_SVR_RATE,
    DEMO_POST_DEAL_MONTHS,
    DEMO_POST_DEAL_MONTHS,
    postDealPeriod,
    false,
  ),
};

export const afterDealCardInterestOnly = {
  monthlyPayment: formatGBP(postMonthlyIO),
  paymentTermText: DEMO_POST_DEAL_DURATION_TEXT,
  changeText: changeText(paymentIncreaseIO),
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: 'Total paid',
  totalPaid: formatGBP(postTotalPaidIO),
  totalInterest: formatGBP(postTotalPaidIO),
  totalPrincipal: formatGBP(0),
  dateLabel: 'Full balance due on',
  endDate: formatMonthYear(
    addMonthsToPeriod(postDealPeriod, DEMO_POST_DEAL_MONTHS),
  ),
  paymentSchedule: buildAmortisationSchedule(
    DEMO_LOAN_AMOUNT,
    DEMO_SVR_RATE,
    DEMO_POST_DEAL_MONTHS,
    DEMO_POST_DEAL_MONTHS,
    postDealPeriod,
    true,
  ),
};

// Card 3 — "Summary"
const summaryTotalPaidRepay = dealTotalPaidRepay + postTotalPaidRepay;
const summaryTotalInterestRepay = summaryTotalPaidRepay - DEMO_LOAN_AMOUNT;

const summaryTotalPaidIO = dealTotalPaidIO + postTotalPaidIO;

export const summaryCardRepayment = {
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  deposit: DEMO_DEPOSIT_FORMATTED,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: 'Total Paid',
  totalPaid: formatGBP(summaryTotalPaidRepay),
  totalInterest: formatGBP(summaryTotalInterestRepay),
  showVehicleNotice: false,
};

export const summaryCardInterestOnly = {
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  deposit: DEMO_DEPOSIT_FORMATTED,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: 'Total Paid',
  totalPaid: formatGBP(summaryTotalPaidIO),
  totalInterest: formatGBP(summaryTotalPaidIO),
  showVehicleNotice: true,
};
