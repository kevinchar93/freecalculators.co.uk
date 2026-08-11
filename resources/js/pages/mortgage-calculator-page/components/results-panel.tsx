import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  afterDealCardInterestOnly,
  afterDealCardRepayment,
  duringDealCardInterestOnly,
  duringDealCardRepayment,
  singleCardInterestOnly,
  singleCardRepayment,
  summaryCardInterestOnly,
  summaryCardRepayment,
} from '../demo-data';
import { PaymentBreakdownBar } from './payment-breakdown-bar';
import { PaymentScheduleSection } from './payment-schedule-section';
import { RepaymentVehicleNotice } from './repayment-vehicle-notice';

export const frostedCardClass =
  'dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur-xl';

interface ResultsPanelProps {
  isInterestOnly: boolean;
  hasDeal: boolean;
  showSingleCard: boolean;
  showAfterDealCard: boolean;
}

export function ResultsPanel({
  isInterestOnly,
  hasDeal,
  showSingleCard,
  showAfterDealCard,
}: ResultsPanelProps) {
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
          className={cn(
            'rounded-2xl border-brand-border p-0',
            frostedCardClass,
          )}
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
            className={cn(
              'rounded-2xl border-brand-border p-0',
              frostedCardClass,
            )}
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
              className={cn(
                'rounded-2xl border-brand-border p-0',
                frostedCardClass,
              )}
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
            className={cn(
              'rounded-2xl border-brand-border p-0',
              frostedCardClass,
            )}
          >
            <div className="rounded-t-2xl bg-neutral-700 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
              Summary
            </div>
            <div className="p-5">
              <h2 className="mb-2 text-lg font-semibold">Full Term Overview</h2>
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
  );
}
