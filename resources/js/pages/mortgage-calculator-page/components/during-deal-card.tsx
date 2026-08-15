import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import type { ScheduleRow } from '../types';
import { frostedCardClass } from '../styles';
import { PaymentScheduleSection } from './payment-schedule-section';

interface DuringDealCardProps {
  monthlyPayment: string;
  paymentTermText: string;
  loan: string;
  totalPaidLabel: string;
  totalPaid: string;
  totalInterest: string;
  totalPrincipal: string;
  balanceAtEnd: string;
  dateLabel: string;
  endDate: string;
  paymentSchedule: ScheduleRow[];
}

export function DuringDealCard({
  monthlyPayment,
  paymentTermText,
  loan,
  totalPaidLabel,
  totalPaid,
  totalInterest,
  totalPrincipal,
  balanceAtEnd,
  dateLabel,
  endDate,
  paymentSchedule,
}: DuringDealCardProps) {
  return (
    <Card
      className={cn(
        'gap-0 rounded-2xl border-brand-border p-0',
        frostedCardClass,
      )}
    >
      <div className="rounded-t-2xl bg-brand-subtle-foreground px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
        {copy['duringDealCard.badge']}
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {copy['duringDealCard.monthlyPaymentLabel']}
          </p>
          <p className="text-5xl font-bold text-brand-subtle-foreground">
            {monthlyPayment}{' '}
            <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">
              ({paymentTermText})
            </span>
          </p>
        </div>

        <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt>{copy['duringDealCard.loanAmountLabel']}</dt>
            <dd>{loan}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['duringDealCard.interestPaymentsLabel']}</dt>
            <dd>{totalInterest}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['duringDealCard.principalPaymentsLabel']}</dt>
            <dd>{totalPrincipal}</dd>
          </div>
        </dl>

        <div className="border-t border-brand-border pt-1"></div>

        <div className="flex justify-between text-sm font-semibold">
          <dt>{totalPaidLabel}</dt>
          <dd>{totalPaid}</dd>
        </div>

        <div className="flex justify-between text-sm font-semibold">
          <dt>{copy['duringDealCard.balanceAtEndLabel']}</dt>
          <dd>{balanceAtEnd}</dd>
        </div>

        <div className="flex justify-between text-sm font-semibold">
          <span>{dateLabel}</span>
          <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            {endDate}
          </span>
        </div>

        <PaymentScheduleSection rows={paymentSchedule} />
      </div>
    </Card>
  );
}
