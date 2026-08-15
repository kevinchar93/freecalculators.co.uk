import { Head, Link } from '@inertiajs/react';
import { blog } from '@/routes';
import {
  calcLoanAmount,
  depositPercentToAmount,
  calcLoanToValue,
} from './calculations';
import { MortgageForm } from './components/mortgage-form';
import { ResultsPanel } from './components/results-panel';
import copy from './copy.json';
import { useMortgageStore } from './store';

export default function MortgageCalculatorPage() {
  const {
    mortgageType,
    setMortgageType,
    propertyPrice,
    setPropertyPrice,
    depositMode,
    setDepositMode,
    deposit,
    setDeposit,
    depositPercent,
    setDepositPercent,
    mortgageTerm,
    setMortgageTerm,
    interestRate,
    setInterestRate,
    startDate,
    setStartDate,
    hasDeal,
    setHasDeal,
    dealType,
    setDealType,
    dealTerm,
    setDealTerm,
    svr,
    setSvr,
    baseRate,
    setBaseRate,
    margin,
    setMargin,
  } = useMortgageStore();

  const isInterestOnly = mortgageType === 'interest-only';
  const isTracker = dealType === 'tracker';
  const showAfterDealCard = hasDeal && dealTerm < mortgageTerm;

  const depositAmount =
    depositMode === 'amount'
      ? deposit
      : depositPercentToAmount(propertyPrice, depositPercent);

  const loanAmount = calcLoanAmount(propertyPrice, depositAmount);
  const loanToValue = calcLoanToValue(propertyPrice, loanAmount);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <Head title={copy['page.headTitle']} />
      <div className="relative left-1/2 mx-[-50vw] w-screen bg-brand-canvas py-8">
        <div className="mx-auto max-w-120 px-4 text-center sm:px-6 md:max-w-240 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            {copy['page.heading']}
          </h1>
          <p className="mt-4 mb-2 text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
            {copy['page.intro']}
          </p>
          <p>
            <Link
              href={blog()}
              className="text-brand-subtle-foreground underline underline-offset-4"
            >
              {copy['page.blogLinkText']}
            </Link>
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-120 grid-cols-1 gap-6 px-4 sm:px-6 md:max-w-240 md:grid-cols-[13fr_9fr] md:items-start lg:px-8">
          <MortgageForm
            mortgageType={mortgageType}
            setMortgageType={setMortgageType}
            propertyPrice={propertyPrice}
            setPropertyPrice={setPropertyPrice}
            depositMode={depositMode}
            onDepositModeChange={setDepositMode}
            deposit={deposit}
            setDeposit={setDeposit}
            depositPercent={depositPercent}
            setDepositPercent={setDepositPercent}
            loanToValue={loanToValue}
            mortgageTerm={mortgageTerm}
            setMortgageTerm={setMortgageTerm}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            startDate={startDate}
            setStartDate={setStartDate}
            hasDeal={hasDeal}
            setHasDeal={setHasDeal}
            isTracker={isTracker}
            dealType={dealType}
            setDealType={setDealType}
            dealTerm={dealTerm}
            setDealTerm={setDealTerm}
            svr={svr}
            setSvr={setSvr}
            baseRate={baseRate}
            setBaseRate={setBaseRate}
            margin={margin}
            setMargin={setMargin}
            onSubmit={handleSubmit}
          />

          <ResultsPanel
            isInterestOnly={isInterestOnly}
            hasDeal={hasDeal}
            showAfterDealCard={showAfterDealCard}
          />
        </div>
      </div>
    </>
  );
}
