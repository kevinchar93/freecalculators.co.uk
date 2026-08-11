import {
  addMonthsToPeriod,
  buildAmortisationSchedule,
  changeText,
  monthlyRepayment,
  monthlyRepaymentInterestOnly,
  remainingBalance,
  splitPercentages,
} from './calculations';
import { formatGBP, formatMonthYear, formatPercent } from './formatters';

// Illustrative example figures used to give the result cards realistic shape.
// These are not recalculated from the form inputs above.
const DEMO_HOUSE_PRICE = 250000;
const DEMO_DEPOSIT = 50000;
const DEMO_DEPOSIT_PERCENT = 20;
const DEMO_LOAN_AMOUNT = DEMO_HOUSE_PRICE - DEMO_DEPOSIT;
const DEMO_START_PERIOD = '2026-09';
const DEMO_TERM_MONTHS = 300;
const DEMO_DEAL_MONTHS = 60;
const DEMO_POST_DEAL_MONTHS = DEMO_TERM_MONTHS - DEMO_DEAL_MONTHS;
const DEMO_WHOLE_TERM_RATE = 5.25 / 100 / 12;
const DEMO_SVR_RATE = 7.5 / 100 / 12;
const DEMO_DEPOSIT_LINE = `${formatGBP(DEMO_DEPOSIT)} (${formatPercent(DEMO_DEPOSIT_PERCENT)})`;

// "Your Results" (no deal period)
const noDealMonthlyRepay = monthlyRepayment(
  DEMO_LOAN_AMOUNT,
  DEMO_WHOLE_TERM_RATE,
  DEMO_TERM_MONTHS,
);
const noDealTotalPaidRepay = noDealMonthlyRepay * DEMO_TERM_MONTHS;
const noDealTotalInterestRepay = noDealTotalPaidRepay - DEMO_LOAN_AMOUNT;
const noDealSplitRepay = splitPercentages(
  DEMO_LOAN_AMOUNT,
  noDealTotalPaidRepay,
);

const noDealMonthlyIO = monthlyRepaymentInterestOnly(
  DEMO_LOAN_AMOUNT,
  DEMO_WHOLE_TERM_RATE,
);
const noDealTotalPaidIO = noDealMonthlyIO * DEMO_TERM_MONTHS;

export const singleCardRepayment = {
  monthly: formatGBP(noDealMonthlyRepay),
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  depositLine: DEMO_DEPOSIT_LINE,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: `Total Paid (${DEMO_TERM_MONTHS} monthly payments)`,
  totalPaid: formatGBP(noDealTotalPaidRepay),
  totalInterest: formatGBP(noDealTotalInterestRepay),
  showSplit: true,
  ...noDealSplitRepay,
  dateLabel: 'Payoff date',
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
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  depositLine: DEMO_DEPOSIT_LINE,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: `Total Paid (${DEMO_TERM_MONTHS} monthly payments)`,
  totalPaid: formatGBP(noDealTotalPaidIO),
  totalInterest: formatGBP(noDealTotalPaidIO),
  showSplit: false,
  principalPercent: 0,
  interestPercent: 0,
  principalPercentLabel: '',
  interestPercentLabel: '',
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
const dealSplitRepay = splitPercentages(
  dealTotalPrincipalRepay,
  dealTotalPaidRepay,
);

const dealMonthlyIO = monthlyRepaymentInterestOnly(
  DEMO_LOAN_AMOUNT,
  DEMO_WHOLE_TERM_RATE,
);
const dealTotalPaidIO = dealMonthlyIO * DEMO_DEAL_MONTHS;

export const duringDealCardRepayment = {
  monthly: formatGBP(dealMonthlyRepay),
  totalPaidLabel: `Total Paid (${DEMO_DEAL_MONTHS} monthly payments)`,
  totalPaid: formatGBP(dealTotalPaidRepay),
  balanceAtEnd: formatGBP(dealBalanceAtEnd),
  totalInterest: formatGBP(dealTotalInterestRepay),
  totalPrincipal: formatGBP(dealTotalPrincipalRepay),
  showSplit: true,
  ...dealSplitRepay,
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
  totalPaidLabel: `Total Paid (${DEMO_DEAL_MONTHS} monthly payments)`,
  totalPaid: formatGBP(dealTotalPaidIO),
  balanceAtEnd: formatGBP(DEMO_LOAN_AMOUNT),
  totalInterest: formatGBP(dealTotalPaidIO),
  totalPrincipal: formatGBP(0),
  showSplit: false,
  principalPercent: 0,
  interestPercent: 0,
  principalPercentLabel: '',
  interestPercentLabel: '',
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
const paymentIncreaseRepay = postMonthlyRepay - dealMonthlyRepay;
const paymentIncreasePercentRepay =
  (postMonthlyRepay / dealMonthlyRepay - 1) * 100;
const postSplitRepay = splitPercentages(dealBalanceAtEnd, postTotalPaidRepay);

const postMonthlyIO = monthlyRepaymentInterestOnly(
  DEMO_LOAN_AMOUNT,
  DEMO_SVR_RATE,
);
const postTotalPaidIO = postMonthlyIO * DEMO_POST_DEAL_MONTHS;
const paymentIncreaseIO = postMonthlyIO - dealMonthlyIO;

export const afterDealCardRepayment = {
  monthly: formatGBP(postMonthlyRepay),
  changeText: changeText(paymentIncreaseRepay, paymentIncreasePercentRepay),
  totalPaidLabel: `Total Paid (${DEMO_POST_DEAL_MONTHS} monthly payments)`,
  totalPaid: formatGBP(postTotalPaidRepay),
  totalInterest: formatGBP(postTotalInterestRepay),
  showSplit: true,
  ...postSplitRepay,
  dateLabel: 'End date',
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
  changeText: changeText(paymentIncreaseIO),
  totalPaidLabel: `Total Paid (${DEMO_POST_DEAL_MONTHS} monthly payments)`,
  totalPaid: formatGBP(postTotalPaidIO),
  totalInterest: formatGBP(postTotalPaidIO),
  showSplit: false,
  principalPercent: 0,
  interestPercent: 0,
  principalPercentLabel: '',
  interestPercentLabel: '',
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
const summarySplitRepay = splitPercentages(
  DEMO_LOAN_AMOUNT,
  summaryTotalPaidRepay,
);

const summaryTotalPaidIO = dealTotalPaidIO + postTotalPaidIO;

export const summaryCardRepayment = {
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  depositLine: DEMO_DEPOSIT_LINE,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: `Total Paid (${DEMO_TERM_MONTHS} monthly payments)`,
  totalPaid: formatGBP(summaryTotalPaidRepay),
  totalInterest: formatGBP(summaryTotalInterestRepay),
  showSplit: true,
  ...summarySplitRepay,
  showVehicleNotice: false,
};

export const summaryCardInterestOnly = {
  housePrice: formatGBP(DEMO_HOUSE_PRICE),
  depositLine: DEMO_DEPOSIT_LINE,
  loan: formatGBP(DEMO_LOAN_AMOUNT),
  totalPaidLabel: `Total Paid (${DEMO_TERM_MONTHS} monthly payments)`,
  totalPaid: formatGBP(summaryTotalPaidIO),
  totalInterest: formatGBP(summaryTotalPaidIO),
  showSplit: false,
  principalPercent: 0,
  interestPercent: 0,
  principalPercentLabel: '',
  interestPercentLabel: '',
  showVehicleNotice: true,
};
