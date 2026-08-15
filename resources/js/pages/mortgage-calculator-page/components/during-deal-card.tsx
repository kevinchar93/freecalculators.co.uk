import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import type { ScheduleRow } from '../types';
import { frostedCardClass } from '../styles';
import { PaymentBreakdownBar } from './payment-breakdown-bar';
import { PaymentScheduleSection } from './payment-schedule-section';

interface DuringDealCardProps {
  monthlyPayment: string;
  totalPaidLabel: string;
  totalPaid: string;
  totalInterest: string;
  totalPrincipal: string;
  balanceAtEnd: string;
  endDate: string;
  paymentSchedule: ScheduleRow[];
  showSplit: boolean;
  principalPercent: number;
  interestPercent: number;
  principalPercentLabel: string;
  interestPercentLabel: string;
}

export function DuringDealCard({
  monthlyPayment,
  totalPaidLabel,
  totalPaid,
  totalInterest,
  totalPrincipal,
  balanceAtEnd,
  endDate,
  paymentSchedule,
  showSplit,
  principalPercent,
  interestPercent,
  principalPercentLabel,
  interestPercentLabel,
}: DuringDealCardProps) {
  return (
    <Card
      className={cn(
        'gap-0 rounded-2xl border-brand-border p-0',
        frostedCardClass,
      )}
    >
      <div className="rounded-t-2xl bg-brand-subtle-foreground px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
        {copy['results.duringDealBadge']}
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {copy['results.deal.monthlyPaymentLabel']}
          </p>
          <p className="text-5xl font-bold text-brand-subtle-foreground">
            {monthlyPayment}
          </p>
        </div>

        <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt>{totalPaidLabel}</dt>
            <dd>{totalPaid}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['results.interestPaymentsLabel']}</dt>
            <dd>{totalInterest}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['results.principalPaymentsLabel']}</dt>
            <dd>{totalPrincipal}</dd>
          </div>
        </dl>

        {showSplit && (
          <PaymentBreakdownBar
            principalPercent={principalPercent}
            interestPercent={interestPercent}
            principalPercentLabel={principalPercentLabel}
            interestPercentLabel={interestPercentLabel}
            barClassName="bg-brand-subtle-foreground"
          />
        )}

        <div className="flex justify-between border-t border-brand-border pt-1 text-sm font-semibold">
          <dt>{copy['results.balanceAtEndLabel']}</dt>
          <dd>{balanceAtEnd}</dd>
        </div>

        <div className="rounded-md border border-brand-border bg-brand-subtle px-3 py-2.5 text-sm">
          {copy['results.dealEndNoticePrefix']} {endDate}
        </div>

        <PaymentScheduleSection rows={paymentSchedule} />
      </div>
    </Card>
  );
}
