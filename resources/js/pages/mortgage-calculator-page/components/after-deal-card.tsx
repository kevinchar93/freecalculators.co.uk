import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import { frostedCardClass } from '../styles';
import type { AmortisationSchedule } from '../types';
import { PaymentScheduleSection } from './payment-schedule-section';

export interface AfterDealCardProps {
  monthlyPayment: string;
  paymentTermText: string;
  changeText: string;
  loan: string;
  totalPaid: string;
  totalInterest: string;
  totalPrincipal: string;
  dateLabel: string;
  endDate: string;
  getPaymentSchedule: () => AmortisationSchedule;
}

export function AfterDealCard({
  monthlyPayment,
  paymentTermText,
  changeText,
  loan,
  totalPaid,
  totalInterest,
  totalPrincipal,
  dateLabel,
  endDate,
  getPaymentSchedule,
}: AfterDealCardProps) {
  return (
    <Card
      className={cn(
        'gap-0 rounded-2xl border-brand-border p-0',
        frostedCardClass,
      )}
    >
      <div className="rounded-t-2xl bg-neutral-500 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
        <h2 className="text-xl font-semibold">{copy['afterDealCard.badge']}</h2>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h3>
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            {copy['afterDealCard.monthlyPaymentLabel']}
          </p>
          <p className="text-4xl font-bold">
            {monthlyPayment}{' '}
            <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">
              ({paymentTermText})
            </span>
          </p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {changeText}
          </p>
        </h3>

        <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt>{copy['afterDealCard.loanAmountLabel']}</dt>
            <dd>{loan}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['afterDealCard.interestPaymentsLabel']}</dt>
            <dd>{totalInterest}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['afterDealCard.principalPaymentsLabel']}</dt>
            <dd>{totalPrincipal}</dd>
          </div>
        </dl>

        <div className="border-t border-brand-border pt-1"></div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm font-semibold">
            <dt>{copy['afterDealCard.totalPaidLabel']}</dt>
            <dd>{totalPaid}</dd>
          </div>

          <div className="flex justify-between text-sm font-semibold">
            <span>{dateLabel}</span>
            <span className="-mr-3 rounded-lg bg-neutral-200 px-3 py-1 text-sm font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              {endDate}
            </span>
          </div>
        </div>
      </div>

      <PaymentScheduleSection getSchedule={getPaymentSchedule} tone="neutral" />
    </Card>
  );
}
