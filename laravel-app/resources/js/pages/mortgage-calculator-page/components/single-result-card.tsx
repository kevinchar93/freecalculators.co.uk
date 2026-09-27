import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import { frostedCardClass } from '../styles';
import type { AmortisationSchedule } from '../types';
import { PaymentScheduleSection } from './payment-schedule-section';
import { RepaymentVehicleNotice } from './repayment-vehicle-notice';

export interface SingleResultCardProps {
  monthlyPayment: string;
  paymentTermText: string;
  housePrice: string;
  deposit: string;
  loan: string;
  totalInterest: string;
  totalPaid: string;
  dateLabel: string;
  endDate: string;
  showVehicleNotice: boolean;
  getPaymentSchedule: () => AmortisationSchedule;
}

export function SingleResultCard({
  monthlyPayment,
  paymentTermText,
  housePrice,
  deposit,
  loan,
  totalInterest,
  totalPaid,
  dateLabel,
  endDate,
  showVehicleNotice,
  getPaymentSchedule,
}: SingleResultCardProps) {
  return (
    <Card
      id="single-result-card"
      className={cn(
        'gap-0 rounded-2xl border-brand-border p-0',
        frostedCardClass,
      )}
    >
      <div className="p-5">
        <div className="flex flex-col gap-4">
          <h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              {copy['singleResultCard.monthlyPaymentLabel']}
            </p>
            <p className="text-5xl font-bold text-brand-subtle-foreground">
              {monthlyPayment}{' '}
              <span className="text-lg font-normal text-neutral-500 dark:text-neutral-400">
                ({paymentTermText})
              </span>
            </p>
          </h3>

          <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt>{copy['singleResultCard.propertyPriceLabel']}</dt>
              <dd>{housePrice}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy['singleResultCard.depositLabel']}</dt>
              <dd>{deposit}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy['singleResultCard.loanAmountLabel']}</dt>
              <dd>{loan}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{copy['singleResultCard.totalInterestLabel']}</dt>
              <dd>{totalInterest}</dd>
            </div>
          </dl>

          <div className="border-t border-brand-border pt-1"></div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm font-semibold">
              <span>{copy['singleResultCard.totalPaidLabel']}</span>
              <span>{totalPaid}</span>
            </div>

            <div className="flex justify-between text-sm font-semibold">
              <span>{dateLabel}</span>
              <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {endDate}
              </span>
            </div>
          </div>

          {showVehicleNotice && <RepaymentVehicleNotice loanAmount={loan} />}
        </div>
      </div>

      <PaymentScheduleSection getSchedule={getPaymentSchedule} tone="brand" />
    </Card>
  );
}
