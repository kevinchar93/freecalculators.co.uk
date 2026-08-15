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
  monthly: formatGBP(noDealMonthlyRepay),
  paymentTermText: DEMO_TERM_DURATION_TEXT,
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  deposit: DEMO_DEPOSIT_FORMATTED,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: `Total Paid (${DEMO_TERM_MONTHS} months)`,
  totalPaid: formatGBP(noDealTotalPaidRepay),
  totalInterest: formatGBP(noDealTotalInterestRepay),
  dateLabel: 'Mortgage Payoff Date',
  date: formatMonthYear(addMonthsToPeriod(DEMO_START_PERIOD, DEMO_TERM_MONTHS)),
  showVehicleNotice: false,
  schedule: buildAmortisationSchedule(
    DEMO_LOAN_AMOUNT,
    DEMO_WHOLE_TERM_RATE,
    DEMO_TERM_MONTHS,
    DEMO_TERM_MONTHS,
    DEMO_START_PERIOD,
    false,
  ),
};

export const singleCardInterestOnly = {
  monthly: formatGBP(noDealMonthlyIO),
  paymentTermText: DEMO_TERM_DURATION_TEXT,
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  deposit: DEMO_DEPOSIT_FORMATTED,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: `Total Paid (${DEMO_TERM_MONTHS} months)`,
  totalPaid: formatGBP(noDealTotalPaidIO),
  totalInterest: formatGBP(noDealTotalPaidIO),
  dateLabel: 'Mortgage term ends',
  date: formatMonthYear(addMonthsToPeriod(DEMO_START_PERIOD, DEMO_TERM_MONTHS)),
  showVehicleNotice: true,
  schedule: buildAmortisationSchedule(
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
  monthly: formatGBP(dealMonthlyRepay),
  paymentTermText: DEMO_DEAL_DURATION_TEXT,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: 'Total paid',
  totalPaid: formatGBP(dealTotalPaidRepay),
  balanceAtEnd: formatGBP(dealBalanceAtEnd),
  totalInterest: formatGBP(dealTotalInterestRepay),
  totalPrincipal: formatGBP(dealTotalPrincipalRepay),
  dateLabel: 'Deal end date',
  date: formatMonthYear(addMonthsToPeriod(DEMO_START_PERIOD, DEMO_DEAL_MONTHS)),
  schedule: buildAmortisationSchedule(
    DEMO_LOAN_AMOUNT,
    DEMO_WHOLE_TERM_RATE,
    DEMO_TERM_MONTHS,
    DEMO_DEAL_MONTHS,
    DEMO_START_PERIOD,
    false,
  ),
};

export const duringDealCardInterestOnly = {
  monthly: formatGBP(dealMonthlyIO),
  paymentTermText: DEMO_DEAL_DURATION_TEXT,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: 'Total paid',
  totalPaid: formatGBP(dealTotalPaidIO),
  balanceAtEnd: formatGBP(DEMO_LOAN_AMOUNT),
  totalInterest: formatGBP(dealTotalPaidIO),
  totalPrincipal: formatGBP(0),
  dateLabel: 'Deal period ends',
  date: formatMonthYear(addMonthsToPeriod(DEMO_START_PERIOD, DEMO_DEAL_MONTHS)),
  schedule: buildAmortisationSchedule(
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
  monthly: formatGBP(postMonthlyRepay),
  paymentTermText: DEMO_POST_DEAL_DURATION_TEXT,
  changeText: changeText(paymentIncreaseRepay),
  loan: formatGBP(dealBalanceAtEnd),
  totalPaidLabel: 'Total paid',
  totalPaid: formatGBP(postTotalPaidRepay),
  totalInterest: formatGBP(postTotalInterestRepay),
  totalPrincipal: formatGBP(postTotalPrincipalRepay),
  dateLabel: 'Mortgage payoff date',
  date: formatMonthYear(
    addMonthsToPeriod(postDealPeriod, DEMO_POST_DEAL_MONTHS),
  ),
  schedule: buildAmortisationSchedule(
    dealBalanceAtEnd,
    DEMO_SVR_RATE,
    DEMO_POST_DEAL_MONTHS,
    DEMO_POST_DEAL_MONTHS,
    postDealPeriod,
    false,
  ),
};

export const afterDealCardInterestOnly = {
  monthly: formatGBP(postMonthlyIO),
  paymentTermText: DEMO_POST_DEAL_DURATION_TEXT,
  changeText: changeText(paymentIncreaseIO),
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: 'Total paid',
  totalPaid: formatGBP(postTotalPaidIO),
  totalInterest: formatGBP(postTotalPaidIO),
  totalPrincipal: formatGBP(0),
  dateLabel: 'Full balance due on',
  date: formatMonthYear(
    addMonthsToPeriod(postDealPeriod, DEMO_POST_DEAL_MONTHS),
  ),
  schedule: buildAmortisationSchedule(
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
