import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import type { ScheduleRow } from '../types';
import { frostedCardClass } from '../styles';
import { PaymentBreakdownBar } from './payment-breakdown-bar';
import { PaymentScheduleSection } from './payment-schedule-section';
import { RepaymentVehicleNotice } from './repayment-vehicle-notice';

interface SingleResultCardProps {
  monthlyPayment: string;
  housePrice: string;
  deposit: string;
  depositPercentage: string;
  loan: string;
  totalInterest: string;
  totalPaid: string;
  dateLabel: string;
  endDate: string;
  showVehicleNotice: boolean;
  paymentSchedule: ScheduleRow[];
  showSplit: boolean;
  principalPercent: number;
  interestPercent: number;
  principalPercentLabel: string;
  interestPercentLabel: string;
}

export function SingleResultCard({
  monthlyPayment,
  housePrice,
  deposit,
  depositPercentage,
  loan,
  totalInterest,
  totalPaid,
  dateLabel,
  endDate,
  showVehicleNotice,
  paymentSchedule,
  showSplit,
  principalPercent,
  interestPercent,
  principalPercentLabel,
  interestPercentLabel,
}: SingleResultCardProps) {
  return (
    <Card
      className={cn('rounded-2xl border-brand-border p-0', frostedCardClass)}
    >
      <div className="p-5">
        <h2 className="mb-4 text-xl font-semibold">
          {copy['results.noDeal.yourResultsHeading']}
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {copy['results.noDeal.monthlyPaymentLabel']}
            </p>
            <p className="text-5xl font-bold text-brand-subtle-foreground">
              {monthlyPayment}
            </p>
          </div>

          <dl className="flex flex-col gap-2 border-t border-brand-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt>{copy['results.housePriceLabel']}</dt>
              <dd>{housePrice}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy['results.depositLabel']}</dt>
              <dd>
                {deposit} ({depositPercentage})
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy['results.loanAmountLabel']}</dt>
              <dd>{loan}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy['results.totalInterestLabel']}</dt>
              <dd>{totalInterest}</dd>
            </div>
            <div className="flex justify-between font-semibold">
              <dt>{copy['results.totalPaidLabel']}</dt>
              <dd>{totalPaid}</dd>
            </div>
          </dl>

          <div className="border-t border-brand-border pt-1"></div>

          {showSplit && (
            <PaymentBreakdownBar
              principalPercent={principalPercent}
              interestPercent={interestPercent}
              principalPercentLabel={principalPercentLabel}
              interestPercentLabel={interestPercentLabel}
              barClassName="bg-brand-subtle-foreground"
            />
          )}

          <div className="flex justify-between text-sm font-semibold">
            <span>{dateLabel}</span>
            <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
              {endDate}
            </span>
          </div>

          {showVehicleNotice && <RepaymentVehicleNotice loanAmount={loan} />}

          <PaymentScheduleSection rows={paymentSchedule} />
        </div>
      </div>
    </Card>
  );
}
