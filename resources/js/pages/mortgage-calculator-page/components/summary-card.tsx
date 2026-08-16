import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import { frostedCardClass } from '../styles';
import { RepaymentVehicleNotice } from './repayment-vehicle-notice';

export interface SummaryCardProps {
  housePrice: string;
  deposit: string;
  loan: string;
  totalPaidLabel: string;
  totalPaid: string;
  totalInterest: string;
  showVehicleNotice: boolean;
}

export function SummaryCard({
  housePrice,
  deposit,
  loan,
  totalPaidLabel,
  totalPaid,
  totalInterest,
  showVehicleNotice,
}: SummaryCardProps) {
  return (
    <Card
      className={cn(
        'gap-0 rounded-2xl border-brand-border p-0',
        frostedCardClass,
      )}
    >
      <div className="rounded-t-2xl bg-neutral-700 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
        {copy['summaryCard.badge']}
      </div>
      <div className="flex flex-col gap-4 p-5">
        <dl className="flex flex-col gap-1 text-sm">
          <div className="flex justify-between">
            <dt>{copy['summaryCard.housePriceLabel']}</dt>
            <dd>{housePrice}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['summaryCard.loanAmountLabel']}</dt>
            <dd>{loan}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['summaryCard.depositLabel']}</dt>
            <dd>{deposit}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{copy['summaryCard.totalInterestLabel']}</dt>
            <dd>{totalInterest}</dd>
          </div>
        </dl>

        <div className="border-t border-brand-border pt-1"></div>

        <div className="flex justify-between text-sm font-semibold">
          <dt>{totalPaidLabel}</dt>
          <dd>{totalPaid}</dd>
        </div>

        {showVehicleNotice && <RepaymentVehicleNotice loanAmount={loan} />}
      </div>
    </Card>
  );
}
