import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
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
        <p className="font-semibold">{copy['results.adTopHeading']}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {copy['results.adTopBody']}
        </p>
        <p>
          <a
            href=""
            className="text-brand-subtle-foreground underline underline-offset-4"
          >
            {copy['results.adTopLink']}
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
            <h2 className="mb-4 text-xl font-semibold">
              {copy['results.yourResultsHeading']}
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {copy['results.monthlyPaymentLabel']}
                </p>
                <p className="text-4xl font-bold text-brand-subtle-foreground">
                  {single.monthly}
                </p>
              </div>

              <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
                <div className="flex justify-between">
                  <dt>{copy['results.housePriceLabel']}</dt>
                  <dd>{single.housePrice}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{copy['results.depositLabel']}</dt>
                  <dd>{single.depositLine}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{copy['results.loanAmountLabel']}</dt>
                  <dd>{single.loan}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{single.totalPaidLabel}</dt>
                  <dd>{single.totalPaid}</dd>
                </div>
                <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
                  <dt>{copy['results.totalInterestLabel']}</dt>
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
              {copy['results.duringDealBadge']}
            </div>
            <div className="flex flex-col gap-4 p-5">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {copy['results.monthlyPaymentLowerLabel']}
                </p>
                <p className="text-4xl font-bold">{during.monthly}</p>
              </div>

              <dl className="flex flex-col gap-1 border-t border-brand-border pt-4 text-sm">
                <div className="flex justify-between">
                  <dt>{during.totalPaidLabel}</dt>
                  <dd>{during.totalPaid}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{copy['results.interestPaymentsLabel']}</dt>
                  <dd>{during.totalInterest}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{copy['results.principalPaymentsLabel']}</dt>
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
                <dt>{copy['results.balanceAtEndLabel']}</dt>
                <dd>{during.balanceAtEnd}</dd>
              </div>

              <div className="rounded-md border border-brand-border bg-brand-subtle px-3 py-2.5 text-sm">
                {copy['results.dealEndNoticePrefix']} {during.date}
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
                {copy['results.afterDealBadge']}
              </div>
              <div className="flex flex-col gap-4 p-5">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {copy['results.monthlyPaymentLowerLabel']}
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
                    <dt>{copy['results.totalInterestLabel']}</dt>
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
              {copy['results.summaryBadge']}
            </div>
            <div className="p-5">
              <h2 className="mb-2 text-lg font-semibold">
                {copy['results.fullTermOverviewHeading']}
              </h2>
              <dl className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between">
                  <dt>{copy['results.housePriceLabel']}</dt>
                  <dd>{summary.housePrice}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{copy['results.depositLabel']}</dt>
                  <dd>{summary.depositLine}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{copy['results.loanAmountLabel']}</dt>
                  <dd>{summary.loan}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{summary.totalPaidLabel}</dt>
                  <dd>{summary.totalPaid}</dd>
                </div>
                <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
                  <dt>{copy['results.totalInterestLabel']}</dt>
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
        <p className="font-semibold">{copy['results.adBottomHeading']}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {copy['results.adBottomBody']}
        </p>
        <p>
          <a
            href=""
            className="text-brand-subtle-foreground underline underline-offset-4"
          >
            {copy['results.adBottomLink']}
          </a>
        </p>
      </Card>
    </div>
  );
}
