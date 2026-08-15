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
import { AfterDealCard } from './after-deal-card';
import { DuringDealCard } from './during-deal-card';
import { AdvertCard } from './advert-card';
import { SingleResultCard } from './single-result-card';
import { SummaryCard } from './summary-card';

interface ResultsPanelProps {
  isInterestOnly: boolean;
  hasDeal: boolean;
  showAfterDealCard: boolean;
}

export function ResultsPanel({
  isInterestOnly,
  hasDeal,
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
      <AdvertCard
        heading={copy['resultsPanel.adTopHeading']}
        body={copy['resultsPanel.adTopBody']}
        linkText={copy['resultsPanel.adTopLink']}
        linkHref=""
      />

      {!hasDeal && (
        <SingleResultCard
          monthlyPayment={single.monthly}
          paymentTermText={single.paymentTermText}
          housePrice={single.housePrice}
          deposit={single.deposit}
          loan={single.loan}
          totalInterest={single.totalInterest}
          totalPaid={single.totalPaid}
          dateLabel={single.dateLabel}
          endDate={single.date}
          showVehicleNotice={single.showVehicleNotice}
          paymentSchedule={single.schedule}
        />
      )}

      {hasDeal && (
        <>
          <DuringDealCard
            monthlyPayment={during.monthly}
            paymentTermText={during.paymentTermText}
            loan={during.loan}
            totalPaidLabel={during.totalPaidLabel}
            totalPaid={during.totalPaid}
            totalInterest={during.totalInterest}
            totalPrincipal={during.totalPrincipal}
            balanceAtEnd={during.balanceAtEnd}
            dateLabel={during.dateLabel}
            endDate={during.date}
            paymentSchedule={during.schedule}
          />

          {showAfterDealCard && (
            <AfterDealCard
              monthlyPayment={after.monthly}
              paymentTermText={after.paymentTermText}
              changeText={after.changeText}
              loan={after.loan}
              totalPaidLabel={after.totalPaidLabel}
              totalPaid={after.totalPaid}
              totalInterest={after.totalInterest}
              totalPrincipal={after.totalPrincipal}
              dateLabel={after.dateLabel}
              endDate={after.date}
              paymentSchedule={after.schedule}
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
