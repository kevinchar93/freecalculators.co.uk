import type { AfterDealCardProps } from './components/after-deal-card';
import type { DuringDealCardProps } from './components/during-deal-card';
import type { SingleResultCardProps } from './components/single-result-card';
import type { SummaryCardProps } from './components/summary-card';
import {
  afterDealCardInterestOnly,
  afterDealCardRepayment,
  duringDealCardInterestOnly,
  duringDealCardRepayment,
  singleCardInterestOnly,
  singleCardRepayment,
  summaryCardInterestOnly,
  summaryCardRepayment,
} from './demo-data';

export interface ResultsViewModel {
  single: SingleResultCardProps;
  during: DuringDealCardProps;
  after: AfterDealCardProps;
  summary: SummaryCardProps;
}

// Demo-data source for now; swapping in real calculated values only
// requires changing this function, not the panels that consume it.
export function getResultsViewModel(isInterestOnly: boolean): ResultsViewModel {
  return {
    single: isInterestOnly ? singleCardInterestOnly : singleCardRepayment,
    during: isInterestOnly ? duringDealCardInterestOnly : duringDealCardRepayment,
    after: isInterestOnly ? afterDealCardInterestOnly : afterDealCardRepayment,
    summary: isInterestOnly ? summaryCardInterestOnly : summaryCardRepayment,
  };
}
