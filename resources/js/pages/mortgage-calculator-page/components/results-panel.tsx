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
          housePrice={single.housePrice}
          deposit={single.deposit}
          depositPercentage={single.depositPercentage}
          loan={single.loan}
          totalInterest={single.totalInterest}
          totalPaid={single.totalPaid}
          dateLabel={single.dateLabel}
          endDate={single.date}
          showVehicleNotice={single.showVehicleNotice}
          paymentSchedule={single.schedule}
          showSplit={single.showSplit}
          principalPercent={single.principalPercent}
          interestPercent={single.interestPercent}
          principalPercentLabel={single.principalPercentLabel}
          interestPercentLabel={single.interestPercentLabel}
        />
      )}

      {hasDeal && (
        <>
          <DuringDealCard
            monthlyPayment={during.monthly}
            totalPaidLabel={during.totalPaidLabel}
            totalPaid={during.totalPaid}
            totalInterest={during.totalInterest}
            totalPrincipal={during.totalPrincipal}
            balanceAtEnd={during.balanceAtEnd}
            endDate={during.date}
            paymentSchedule={during.schedule}
            showSplit={during.showSplit}
            principalPercent={during.principalPercent}
            interestPercent={during.interestPercent}
            principalPercentLabel={during.principalPercentLabel}
            interestPercentLabel={during.interestPercentLabel}
          />

          {showAfterDealCard && (
            <AfterDealCard
              monthlyPayment={after.monthly}
              changeText={after.changeText}
              totalPaidLabel={after.totalPaidLabel}
              totalPaid={after.totalPaid}
              totalInterest={after.totalInterest}
              dateLabel={after.dateLabel}
              endDate={after.date}
              paymentSchedule={after.schedule}
              showSplit={after.showSplit}
              principalPercent={after.principalPercent}
              interestPercent={after.interestPercent}
              principalPercentLabel={after.principalPercentLabel}
              interestPercentLabel={after.interestPercentLabel}
            />
          )}

          <SummaryCard
            housePrice={summary.housePrice}
            deposit={summary.deposit}
            depositPercentage={summary.depositPercentage}
            loan={summary.loan}
            totalPaidLabel={summary.totalPaidLabel}
            totalPaid={summary.totalPaid}
            totalInterest={summary.totalInterest}
            showVehicleNotice={summary.showVehicleNotice}
            showSplit={summary.showSplit}
            principalPercent={summary.principalPercent}
            interestPercent={summary.interestPercent}
            principalPercentLabel={summary.principalPercentLabel}
            interestPercentLabel={summary.interestPercentLabel}
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
