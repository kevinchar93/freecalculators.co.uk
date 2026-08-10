import { Head, Link } from '@inertiajs/react';
import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { blog } from '@/routes';

type MortgageType = 'repayment' | 'interest-only';
type DepositMode = 'amount' | 'percent';
type DealType = 'fixed' | 'tracker';

interface ScheduleRow {
  period: string;
  interest: string;
  principal: string;
  balance: string;
}

function monthlyRepayment(
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

function monthlyRepaymentInterestOnly(
  principal: number,
  monthlyRate: number,
): number {
  return monthlyRate === 0 ? 0 : principal * monthlyRate;
}

function remainingBalance(
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

function addMonthsToPeriod(period: string, months: number): string {
  const [year, month] = period.split('-').map(Number);
  const total = year * 12 + (month - 1) + months;

  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, '0')}`;
}

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatMonthYear(period: string): string {
  const [year, month] = period.split('-').map(Number);

  return `${MONTH_NAMES[month - 1]} ${year}`;
}

function formatShortMonthYear(period: string): string {
  const [year, month] = period.split('-').map(Number);

  return `${MONTH_NAMES[month - 1]} '${String(year).slice(-2)}`;
}

function formatGBP(value: number): string {
  return `£${Math.round(value).toLocaleString('en-GB')}`;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function splitPercentages(principalRaw: number, totalRaw: number) {
  const principalPercent = (principalRaw / totalRaw) * 100;
  const interestPercent = 100 - principalPercent;

  return {
    principalPercent,
    interestPercent,
    principalPercentLabel: formatPercent(principalPercent),
    interestPercentLabel: formatPercent(interestPercent),
  };
}

function buildAmortisationSchedule(
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

const singleCardRepayment = {
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

const singleCardInterestOnly = {
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

const duringDealCardRepayment = {
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

const duringDealCardInterestOnly = {
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

function changeText(increase: number, percent?: number): string {
  const sign = increase >= 0 ? '+' : '−';
  const magnitude = formatGBP(Math.abs(increase));
  const suffix =
    percent === undefined
      ? ''
      : ` (${increase >= 0 ? '+' : '−'}${Math.abs(percent).toFixed(1)}%)`;

  return `${sign}${magnitude} once your deal ends${suffix}`;
}

const afterDealCardRepayment = {
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

const afterDealCardInterestOnly = {
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

const summaryCardRepayment = {
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

const summaryCardInterestOnly = {
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

function PaymentBreakdownBar({
  principalPercent,
  interestPercent,
  principalPercentLabel,
  interestPercentLabel,
  barClassName,
}: {
  principalPercent: number;
  interestPercent: number;
  principalPercentLabel: string;
  interestPercentLabel: string;
  barClassName: string;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">Payment Breakdown</h3>
      <div
        role="img"
        aria-label={`Principal ${principalPercentLabel}, Interest ${interestPercentLabel}`}
        className="flex h-2 w-full overflow-hidden rounded-full"
      >
        <span
          className={barClassName}
          style={{ width: `${principalPercent}%` }}
        />
        <span
          className="bg-neutral-300 dark:bg-neutral-600"
          style={{ width: `${interestPercent}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span>Principal {principalPercentLabel}</span>
        <span>Interest {interestPercentLabel}</span>
      </div>
    </div>
  );
}

function PaymentScheduleSection({ rows }: { rows: ScheduleRow[] }) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between"
        >
          Payment Schedule
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 max-h-85 overflow-auto rounded-md border border-brand-border">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Payment amortisation schedule</caption>
          <thead>
            <tr>
              <th scope="col" className="px-3 py-2">
                Month
              </th>
              <th scope="col" className="px-3 py-2">
                Interest
              </th>
              <th scope="col" className="px-3 py-2">
                Principal
              </th>
              <th scope="col" className="px-3 py-2">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <th
                  scope="row"
                  className="px-3 py-1 font-normal whitespace-nowrap"
                >
                  {row.period}
                </th>
                <td className="px-3 py-1">{row.interest}</td>
                <td className="px-3 py-1">{row.principal}</td>
                <td className="px-3 py-1">{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleContent>
    </Collapsible>
  );
}

function RepaymentVehicleNotice({ loanAmount }: { loanAmount: string }) {
  return (
    <div className="rounded-md bg-brand-subtle p-3 text-sm text-brand-subtle-foreground">
      With interest-only, your balance of {loanAmount} stays the same throughout
      the term. You&apos;ll need a separate repayment plan in place to repay it
      in full by the end.
    </div>
  );
}

const toggleSelectedClass =
  'data-[state=on]:border-brand data-[state=on]:bg-brand data-[state=on]:text-brand-foreground data-[state=off]:bg-background';

const frostedCardClass =
  'dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur-xl';

export default function MortgageCalculatorPage() {
  const formId = useId();

  const [mortgageType, setMortgageType] = useState<MortgageType>('repayment');
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [depositMode, setDepositMode] = useState<DepositMode>('amount');
  const [deposit, setDeposit] = useState(50000);
  const [depositPercent, setDepositPercent] = useState(20);
  const [mortgageTerm, setMortgageTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5.25);
  const [startDate, setStartDate] = useState(DEMO_START_PERIOD);
  const [hasDeal, setHasDeal] = useState(true);
  const [dealType, setDealType] = useState<DealType>('fixed');
  const [dealTerm, setDealTerm] = useState(5);
  const [svr, setSvr] = useState(7.5);
  const [baseRate, setBaseRate] = useState(4.75);
  const [margin, setMargin] = useState(0.5);

  const isInterestOnly = mortgageType === 'interest-only';
  const isTracker = dealType === 'tracker';
  const showSingleCard = !hasDeal;
  const showAfterDealCard = hasDeal && dealTerm < mortgageTerm;

  const depositAmount =
    depositMode === 'amount'
      ? deposit
      : Math.round((propertyPrice * depositPercent) / 100);
  const loanAmount = Math.max(0, propertyPrice - depositAmount);
  const loanToValue =
    propertyPrice > 0 ? (loanAmount / propertyPrice) * 100 : 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleDepositModeChange(mode: DepositMode) {
    if (mode === depositMode) {
      return;
    }

    if (mode === 'percent') {
      setDepositPercent(
        propertyPrice > 0
          ? Math.round((deposit / propertyPrice) * 1000) / 10
          : 0,
      );
    } else {
      setDeposit(Math.round((propertyPrice * depositPercent) / 100));
    }

    setDepositMode(mode);
  }

  const single = isInterestOnly ? singleCardInterestOnly : singleCardRepayment;
  const during = isInterestOnly
    ? duringDealCardInterestOnly
    : duringDealCardRepayment;
  const after = isInterestOnly
    ? afterDealCardInterestOnly
    : afterDealCardRepayment;
  const summary = isInterestOnly
    ? summaryCardInterestOnly
    : summaryCardRepayment;

  return (
    <>
      <Head title="Mortgage Calculator" />
      <div className="relative left-1/2 mx-[-50vw] w-screen bg-brand-canvas py-8">
        <div className="mx-auto max-w-120 px-4 text-center sm:px-6 md:max-w-240 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Mortgage Payment Calculator
          </h1>
          <p className="mt-4 mb-2 text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
            Calculate the monthly payment for a mortgage based on your property
            value and deposit.{' '}
          </p>
          <p>
            <Link
              href={blog()}
              className="text-brand-subtle-foreground underline underline-offset-4"
            >
              Read our guide to mortgages
            </Link>
            .
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-120 grid-cols-1 gap-6 px-4 sm:px-6 md:max-w-240 md:grid-cols-[13fr_9fr] md:items-start lg:px-8">
          {/* form */}
          <Card
            className={cn('rounded-2xl border-brand-border p-5', frostedCardClass)}
          >
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                {/* mortgage type */}
                <fieldset>
                  <legend className="mb-2 block text-sm font-medium">
                    Mortgage Type
                  </legend>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={mortgageType}
                    onValueChange={(value) => {
                      if (value) {
                        setMortgageType(value as MortgageType);
                      }
                    }}
                    className="w-full"
                  >
                    <ToggleGroupItem
                      value="repayment"
                      className={cn('flex-1', toggleSelectedClass)}
                    >
                      Repayment
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="interest-only"
                      className={cn('flex-1', toggleSelectedClass)}
                    >
                      Interest Only
                    </ToggleGroupItem>
                  </ToggleGroup>
                </fieldset>

                {/* property price */}
                <div>
                  <Label htmlFor={`${formId}-propertyPrice`}>
                    Property Price
                  </Label>
                  <div className="mt-2 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-16"
                      aria-label="Subtract £10,000"
                      onClick={() =>
                        setPropertyPrice((value) => Math.max(0, value - 10000))
                      }
                    >
                      -10k
                    </Button>
                    <div className="flex grow items-center gap-2">
                      <span aria-hidden="true">£</span>
                      <Input
                        type="number"
                        id={`${formId}-propertyPrice`}
                        name="propertyPrice"
                        className="bg-background"
                        value={propertyPrice}
                        onChange={(event) =>
                          setPropertyPrice(Number(event.target.value))
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-16"
                      aria-label="Add £10,000"
                      onClick={() => setPropertyPrice((value) => value + 10000)}
                    >
                      +10k
                    </Button>
                  </div>
                </div>

                {/* deposit */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${formId}-deposit`}>Deposit Amount</Label>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      size="sm"
                      value={depositMode}
                      onValueChange={(value) => {
                        if (value) {
                          handleDepositModeChange(value as DepositMode);
                        }
                      }}
                      className="w-16"
                    >
                      <ToggleGroupItem
                        value="amount"
                        aria-label="Enter deposit as an amount"
                        className={cn('flex-1', toggleSelectedClass)}
                      >
                        £
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="percent"
                        aria-label="Enter deposit as a percentage"
                        className={cn('flex-1', toggleSelectedClass)}
                      >
                        %
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      aria-label={
                        depositMode === 'amount'
                          ? 'Subtract £10,000'
                          : 'Subtract 5%'
                      }
                      onClick={() =>
                        depositMode === 'amount'
                          ? setDeposit((value) => Math.max(0, value - 10000))
                          : setDepositPercent((value) => Math.max(0, value - 5))
                      }
                    >
                      {depositMode === 'amount' ? '−10k' : '−5%'}
                    </Button>
                    <div className="flex grow items-center gap-2">
                      {depositMode === 'amount' && (
                        <span aria-hidden="true">£</span>
                      )}
                      <Input
                        type="number"
                        id={`${formId}-deposit`}
                        name="deposit"
                        className="bg-background"
                        value={
                          depositMode === 'amount' ? deposit : depositPercent
                        }
                        onChange={(event) =>
                          depositMode === 'amount'
                            ? setDeposit(Number(event.target.value))
                            : setDepositPercent(Number(event.target.value))
                        }
                      />
                      {depositMode === 'percent' && (
                        <span aria-hidden="true">%</span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      aria-label={
                        depositMode === 'amount' ? 'Add £10,000' : 'Add 5%'
                      }
                      onClick={() =>
                        depositMode === 'amount'
                          ? setDeposit((value) => value + 10000)
                          : setDepositPercent((value) => value + 5)
                      }
                    >
                      {depositMode === 'amount' ? '+10k' : '+5%'}
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Loan to Value (LTV) <span>{loanToValue.toFixed(1)}%</span>
                  </p>
                </div>

                {/* mortgage term + interest rate */}
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <Label htmlFor={`${formId}-mortgageTerm`}>
                      Mortgage Term
                    </Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        type="number"
                        id={`${formId}-mortgageTerm`}
                        name="mortgageTerm"
                        className="bg-background"
                        value={mortgageTerm}
                        onChange={(event) =>
                          setMortgageTerm(Number(event.target.value))
                        }
                      />
                      <span aria-hidden="true">years</span>
                    </div>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={String(mortgageTerm)}
                      onValueChange={(value) => {
                        if (value) {
                          setMortgageTerm(Number(value));
                        }
                      }}
                      className="mt-2 w-full"
                    >
                      <ToggleGroupItem
                        value="15"
                        className={cn('flex-1', toggleSelectedClass)}
                      >
                        15y
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="20"
                        className={cn('flex-1', toggleSelectedClass)}
                      >
                        20y
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="25"
                        className={cn('flex-1', toggleSelectedClass)}
                      >
                        25y
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="30"
                        className={cn('flex-1', toggleSelectedClass)}
                      >
                        30y
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <div>
                    <Label htmlFor={`${formId}-interestRate`}>
                      Interest Rate
                    </Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        id={`${formId}-interestRate`}
                        name="interestRate"
                        className="bg-background"
                        value={interestRate}
                        disabled={hasDeal && isTracker}
                        onChange={(event) =>
                          setInterestRate(Number(event.target.value))
                        }
                      />
                      <span aria-hidden="true">%</span>
                    </div>
                    {hasDeal && isTracker && (
                      <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                        Disabled — using base rate + margin below instead.
                      </p>
                    )}
                  </div>
                </div>

                {/* start date */}
                <div>
                  <Label htmlFor={`${formId}-startDate`}>Start Date</Label>
                  <Input
                    type="month"
                    id={`${formId}-startDate`}
                    name="startDate"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="mt-2 bg-background"
                  />
                </div>

                {/* has deal */}
                <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <Checkbox
                    checked={hasDeal}
                    onCheckedChange={(checked) => setHasDeal(checked === true)}
                  />
                  I have a fixed or tracker deal
                </label>

                {hasDeal && (
                  <div className="flex flex-col gap-5 rounded-md border border-brand-border bg-brand-subtle p-4">
                    <fieldset>
                      <legend className="mb-2 block text-sm font-medium">
                        Deal Type
                      </legend>
                      <ToggleGroup
                        type="single"
                        variant="outline"
                        value={dealType}
                        onValueChange={(value) => {
                          if (value) {
                            setDealType(value as DealType);
                          }
                        }}
                        className="w-full"
                      >
                        <ToggleGroupItem
                          value="fixed"
                          className={cn('flex-1', toggleSelectedClass)}
                        >
                          Fixed
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="tracker"
                          className={cn('flex-1', toggleSelectedClass)}
                        >
                          Tracker
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </fieldset>

                    {isTracker && (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor={`${formId}-baseRate`}>
                            Base Rate
                          </Label>
                          <div className="mt-2 flex items-center gap-2">
                            <Input
                              type="number"
                              step="0.01"
                              id={`${formId}-baseRate`}
                              name="baseRate"
                              className="bg-background"
                              value={baseRate}
                              onChange={(event) =>
                                setBaseRate(Number(event.target.value))
                              }
                            />
                            <span aria-hidden="true">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`${formId}-margin`}>Margin</Label>
                          <div className="mt-2 flex items-center gap-2">
                            <Input
                              type="number"
                              step="0.01"
                              id={`${formId}-margin`}
                              name="margin"
                              className="bg-background"
                              value={margin}
                              onChange={(event) =>
                                setMargin(Number(event.target.value))
                              }
                            />
                            <span aria-hidden="true">%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor={`${formId}-dealTerm`}>Deal Term</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <Input
                          type="number"
                          id={`${formId}-dealTerm`}
                          name="dealTerm"
                          className="bg-background"
                          value={dealTerm}
                          onChange={(event) =>
                            setDealTerm(Number(event.target.value))
                          }
                        />
                        <span aria-hidden="true">years</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`${formId}-svr`}>
                        Standard Variable Rate (SVR)
                      </Label>
                      <div className="mt-2 flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          id={`${formId}-svr`}
                          name="svr"
                          className="bg-background"
                          value={svr}
                          onChange={(event) =>
                            setSvr(Number(event.target.value))
                          }
                        />
                        <span aria-hidden="true">%</span>
                      </div>
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                        This is the rate your mortgage reverts to once your deal
                        period ends.
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                >
                  Calculate Payments
                </Button>
              </div>
            </form>
          </Card>

          <div className="flex flex-col gap-6">
            {/* advert */}
            <Card className="rounded-2xl border-brand-border bg-brand-subtle p-5">
              <p className="font-semibold">Get Pre-Approved Today</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Rates as low as 4.95% APR. No credit impact.
              </p>
              <p>
                <a
                  href=""
                  className="text-brand-subtle-foreground underline underline-offset-4"
                >
                  Learn More -&gt;
                </a>
              </p>
            </Card>

            {showSingleCard && (
              /* your results (no deal period) */
              <Card
                className={cn('rounded-2xl border-brand-border p-0', frostedCardClass)}
              >
                <div className="p-5">
                  <h2 className="mb-4 text-xl font-semibold">Your Results</h2>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Monthly Payment
                      </p>
                      <p className="text-4xl font-bold text-brand-subtle-foreground">
                        {single.monthly}
                      </p>
                    </div>

                    <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
                      <div className="flex justify-between">
                        <dt>House Price</dt>
                        <dd>{single.housePrice}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Deposit</dt>
                        <dd>{single.depositLine}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Loan Amount</dt>
                        <dd>{single.loan}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>{single.totalPaidLabel}</dt>
                        <dd>{single.totalPaid}</dd>
                      </div>
                      <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
                        <dt>Total Interest</dt>
                        <dd>{single.totalInterest}</dd>
                      </div>
                    </dl>

                    {single.showSplit && (
                      <PaymentBreakdownBar
                        principalPercent={single.principalPercent}
                        interestPercent={single.interestPercent}
                        principalPercentLabel={single.principalPercentLabel}
                        interestPercentLabel={single.interestPercentLabel}
                        barClassName="bg-brand-subtle-foreground"
                      />
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {single.dateLabel}
                      </span>
                      <span>{single.date}</span>
                    </div>

                    {single.showVehicleNotice && (
                      <RepaymentVehicleNotice loanAmount={single.loan} />
                    )}

                    <PaymentScheduleSection rows={single.schedule} />
                  </div>
                </div>
              </Card>
            )}

            {hasDeal && (
              <>
                {/* during your deal results */}
                <Card
                className={cn('rounded-2xl border-brand-border p-0', frostedCardClass)}
              >
                  <div className="rounded-t-2xl bg-brand-subtle-foreground px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
                    During Your Deal
                  </div>
                  <div className="flex flex-col gap-4 p-5">
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Monthly payment
                      </p>
                      <p className="text-4xl font-bold">{during.monthly}</p>
                    </div>

                    <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
                      <div className="flex justify-between">
                        <dt>{during.totalPaidLabel}</dt>
                        <dd>{during.totalPaid}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Interest payments</dt>
                        <dd>{during.totalInterest}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Principal payments</dt>
                        <dd>{during.totalPrincipal}</dd>
                      </div>
                    </dl>

                    {during.showSplit && (
                      <PaymentBreakdownBar
                        principalPercent={during.principalPercent}
                        interestPercent={during.interestPercent}
                        principalPercentLabel={during.principalPercentLabel}
                        interestPercentLabel={during.interestPercentLabel}
                        barClassName="bg-brand-subtle-foreground"
                      />
                    )}

                    <div className="flex justify-between border-t border-brand-border pt-1 text-sm font-semibold">
                      <dt>Balance at end of deal</dt>
                      <dd>{during.balanceAtEnd}</dd>
                    </div>

                    <div className="rounded-md border border-brand-border bg-brand-subtle px-3 py-2.5 text-sm">
                      Your deal will end {during.date}
                    </div>

                    <PaymentScheduleSection rows={during.schedule} />
                  </div>
                </Card>

                {/* after your deal results */}
                {showAfterDealCard && (
                  <Card
                className={cn('rounded-2xl border-brand-border p-0', frostedCardClass)}
              >
                    <div className="rounded-t-2xl bg-neutral-500 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
                      After Your Deal
                    </div>
                    <div className="flex flex-col gap-4 p-5">
                      <div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Monthly payment
                        </p>
                        <p className="text-4xl font-bold">{after.monthly}</p>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                          {after.changeText}
                        </p>
                      </div>

                      <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
                        <div className="flex justify-between">
                          <dt>{after.totalPaidLabel}</dt>
                          <dd>{after.totalPaid}</dd>
                        </div>
                        <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
                          <dt>Total Interest</dt>
                          <dd>{after.totalInterest}</dd>
                        </div>
                      </dl>

                      {after.showSplit && (
                        <PaymentBreakdownBar
                          principalPercent={after.principalPercent}
                          interestPercent={after.interestPercent}
                          principalPercentLabel={after.principalPercentLabel}
                          interestPercentLabel={after.interestPercentLabel}
                          barClassName="bg-neutral-500"
                        />
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {after.dateLabel}
                        </span>
                        <span>{after.date}</span>
                      </div>

                      <PaymentScheduleSection rows={after.schedule} />
                    </div>
                  </Card>
                )}

                {/* summary */}
                <Card
                className={cn('rounded-2xl border-brand-border p-0', frostedCardClass)}
              >
                  <div className="rounded-t-2xl bg-neutral-700 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
                    Summary
                  </div>
                  <div className="p-5">
                    <h2 className="mb-2 text-lg font-semibold">
                      Full Term Overview
                    </h2>
                    <dl className="flex flex-col gap-1 text-sm">
                      <div className="flex justify-between">
                        <dt>House Price</dt>
                        <dd>{summary.housePrice}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Deposit</dt>
                        <dd>{summary.depositLine}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Loan Amount</dt>
                        <dd>{summary.loan}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>{summary.totalPaidLabel}</dt>
                        <dd>{summary.totalPaid}</dd>
                      </div>
                      <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
                        <dt>Total Interest</dt>
                        <dd>{summary.totalInterest}</dd>
                      </div>
                    </dl>

                    {summary.showSplit && (
                      <div className="mt-4">
                        <PaymentBreakdownBar
                          principalPercent={summary.principalPercent}
                          interestPercent={summary.interestPercent}
                          principalPercentLabel={summary.principalPercentLabel}
                          interestPercentLabel={summary.interestPercentLabel}
                          barClassName="bg-neutral-700"
                        />
                      </div>
                    )}

                    {summary.showVehicleNotice && (
                      <div className="mt-4">
                        <RepaymentVehicleNotice loanAmount={summary.loan} />
                      </div>
                    )}
                  </div>
                </Card>
              </>
            )}

            {/* advert */}
            <Card className="rounded-2xl border-brand-border bg-brand-subtle p-5">
              <p className="font-semibold">Compare Mortgage Deals</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                See today&apos;s best fixed and tracker rates from UK lenders.
              </p>
              <p>
                <a
                  href=""
                  className="text-brand-subtle-foreground underline underline-offset-4"
                >
                  Compare Now -&gt;
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
