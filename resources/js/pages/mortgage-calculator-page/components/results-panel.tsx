import copy from '../copy.json';
import { useMortgageStore } from '../store';
import { getResultsViewModel } from '../view-model';
import { AfterDealCard } from './after-deal-card';
import { DuringDealCard } from './during-deal-card';
import { AdvertCard } from './advert-card';
import { SingleResultCard } from './single-result-card';
import { SummaryCard } from './summary-card';

interface ResultsPanelProps {
  hasDeal: boolean;
  showAfterDealCard: boolean;
}

export function ResultsPanel({
  hasDeal,
  showAfterDealCard,
}: ResultsPanelProps) {
  const mortgageType = useMortgageStore((s) => s.mortgageType);
  const propertyPriceGbp = useMortgageStore((s) => s.propertyPriceGbp);
  const depositMode = useMortgageStore((s) => s.depositMode);
  const depositGbp = useMortgageStore((s) => s.depositGbp);
  const depositPercent = useMortgageStore((s) => s.depositPercent);
  const mortgageTermYears = useMortgageStore((s) => s.mortgageTermYears);
  const interestRatePercent = useMortgageStore((s) => s.interestRatePercent);
  const startDate = useMortgageStore((s) => s.startDate);
  const dealType = useMortgageStore((s) => s.dealType);
  const dealTermYears = useMortgageStore((s) => s.dealTermYears);
  const standardVariableRatePercent = useMortgageStore((s) => s.standardVariableRatePercent);
  const baseRatePercent = useMortgageStore((s) => s.baseRatePercent);
  const marginPercent = useMortgageStore((s) => s.marginPercent);

  const { single, during, after, summary } = getResultsViewModel({
    mortgageType,
    propertyPriceGbp,
    depositMode,
    depositGbp,
    depositPercent,
    mortgageTermYears,
    interestRatePercent,
    startDate,
    hasDeal,
    dealType,
    dealTermYears,
    standardVariableRatePercent,
    baseRatePercent,
    marginPercent,
  });

  return (
    <div className="flex flex-col gap-6">
      <AdvertCard
        heading={copy['resultsPanel.adTopHeading']}
        body={copy['resultsPanel.adTopBody']}
        linkText={copy['resultsPanel.adTopLink']}
        linkHref=""
      />

      {!hasDeal && (
        <SingleResultCard
          monthlyPayment={single.monthlyPayment}
          paymentTermText={single.paymentTermText}
          housePrice={single.housePrice}
          deposit={single.deposit}
          loan={single.loan}
          totalInterest={single.totalInterest}
          totalPaid={single.totalPaid}
          dateLabel={single.dateLabel}
          endDate={single.endDate}
          showVehicleNotice={single.showVehicleNotice}
          paymentSchedule={single.paymentSchedule}
        />
      )}

      {hasDeal && (
        <>
          <DuringDealCard
            monthlyPayment={during.monthlyPayment}
            paymentTermText={during.paymentTermText}
            loan={during.loan}
            totalPaidLabel={during.totalPaidLabel}
            totalPaid={during.totalPaid}
            totalInterest={during.totalInterest}
            totalPrincipal={during.totalPrincipal}
            balanceAtEnd={during.balanceAtEnd}
            dateLabel={during.dateLabel}
            endDate={during.endDate}
            paymentSchedule={during.paymentSchedule}
          />

          {showAfterDealCard && (
            <AfterDealCard
              monthlyPayment={after.monthlyPayment}
              paymentTermText={after.paymentTermText}
              changeText={after.changeText}
              loan={after.loan}
              totalPaidLabel={after.totalPaidLabel}
              totalPaid={after.totalPaid}
              totalInterest={after.totalInterest}
              totalPrincipal={after.totalPrincipal}
              dateLabel={after.dateLabel}
              endDate={after.endDate}
              paymentSchedule={after.paymentSchedule}
            />
          )}

          <SummaryCard
            housePrice={summary.housePrice}
            deposit={summary.deposit}
            loan={summary.loan}
            totalPaidLabel={summary.totalPaidLabel}
            totalPaid={summary.totalPaid}
            totalInterest={summary.totalInterest}
            showVehicleNotice={summary.showVehicleNotice}
          />
        </>
      )}

      <AdvertCard
        heading={copy['resultsPanel.adBottomHeading']}
        body={copy['resultsPanel.adBottomBody']}
        linkText={copy['resultsPanel.adBottomLink']}
        linkHref=""
      />
    </div>
  );
}
