import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import type { ScheduleRow } from '../types';
import { frostedCardClass } from '../styles';
import { PaymentBreakdownBar } from './payment-breakdown-bar';
import { PaymentScheduleSection } from './payment-schedule-section';

interface AfterDealCardProps {
  monthlyPayment: string;
  changeText: string;
  totalPaidLabel: string;
  totalPaid: string;
  totalInterest: string;
  dateLabel: string;
  endDate: string;
  paymentSchedule: ScheduleRow[];
  showSplit: boolean;
  principalPercent: number;
  interestPercent: number;
  principalPercentLabel: string;
  interestPercentLabel: string;
}

export function AfterDealCard({
  monthlyPayment,
  changeText,
  totalPaidLabel,
  totalPaid,
  totalInterest,
  dateLabel,
  endDate,
  paymentSchedule,
  showSplit,
  principalPercent,
  interestPercent,
  principalPercentLabel,
  interestPercentLabel,
}: AfterDealCardProps) {
  return (
    <Card
      className={cn(
        'gap-0 rounded-2xl border-brand-border p-0',
        frostedCardClass,
      )}
    >
      <div className="rounded-t-2xl bg-neutral-500 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
        {copy['results.afterDealBadge']}
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {copy['results.deal.monthlyPaymentLabel']}
          </p>
          <p className="text-4xl font-bold">{monthlyPayment}</p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {changeText}
          </p>
        </div>

        <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt>{totalPaidLabel}</dt>
            <dd>{totalPaid}</dd>
          </div>
          <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
            <dt>{copy['results.totalInterestLabel']}</dt>
            <dd>{totalInterest}</dd>
          </div>
        </dl>

        {showSplit && (
          <PaymentBreakdownBar
            principalPercent={principalPercent}
            interestPercent={interestPercent}
            principalPercentLabel={principalPercentLabel}
            interestPercentLabel={interestPercentLabel}
            barClassName="bg-neutral-500"
          />
        )}

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            {dateLabel}
          </span>
          <span>{endDate}</span>
        </div>

        <PaymentScheduleSection rows={paymentSchedule} />
      </div>
    </Card>
  );
}
