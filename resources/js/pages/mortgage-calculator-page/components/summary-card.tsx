import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import { frostedCardClass } from '../styles';
import { PaymentBreakdownBar } from './payment-breakdown-bar';
import { RepaymentVehicleNotice } from './repayment-vehicle-notice';

interface SummaryCardProps {
  housePrice: string;
  deposit: string;
  depositPercentage: string;
  loan: string;
  totalPaidLabel: string;
  totalPaid: string;
  totalInterest: string;
  showVehicleNotice: boolean;
  showSplit: boolean;
  principalPercent: number;
  interestPercent: number;
  principalPercentLabel: string;
  interestPercentLabel: string;
}

export function SummaryCard({
  housePrice,
  deposit,
  depositPercentage,
  loan,
  totalPaidLabel,
  totalPaid,
  totalInterest,
  showVehicleNotice,
  showSplit,
  principalPercent,
  interestPercent,
  principalPercentLabel,
  interestPercentLabel,
}: SummaryCardProps) {
  return (
    <Card
      className={cn('rounded-2xl border-brand-border p-0', frostedCardClass)}
    >
      <div className="rounded-t-2xl bg-neutral-700 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
        {copy['results.summaryBadge']}
      </div>
      <div className="p-5">
        <h2 className="mb-2 text-lg font-semibold">
          {copy['results.fullTermOverviewHeading']}
        </h2>
        <dl className="flex flex-col gap-1 text-sm">
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
            <dt>{totalPaidLabel}</dt>
            <dd>{totalPaid}</dd>
          </div>
          <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
            <dt>{copy['results.totalInterestLabel']}</dt>
            <dd>{totalInterest}</dd>
          </div>
        </dl>

        {showSplit && (
          <div className="mt-4">
            <PaymentBreakdownBar
              principalPercent={principalPercent}
              interestPercent={interestPercent}
              principalPercentLabel={principalPercentLabel}
              interestPercentLabel={interestPercentLabel}
              barClassName="bg-neutral-700"
            />
          </div>
        )}

        {showVehicleNotice && (
          <div className="mt-4">
            <RepaymentVehicleNotice loanAmount={loan} />
          </div>
        )}
      </div>
    </Card>
  );
}
