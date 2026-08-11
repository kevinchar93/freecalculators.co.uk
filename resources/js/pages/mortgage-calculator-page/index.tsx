import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { blog } from '@/routes';
import { MortgageForm } from './components/mortgage-form';
import { ResultsPanel } from './components/results-panel';
import { DEMO_START_PERIOD } from './demo-data';
import type { DealType, DepositMode, MortgageType } from './types';

export default function MortgageCalculatorPage() {
  const [mortgageType, setMortgageType] = useState<MortgageType>('repayment');
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [depositMode, setDepositMode] = useState<DepositMode>('amount');
  const [deposit, setDeposit] = useState(50000);
  const [depositPercent, setDepositPercent] = useState(20);
  const [mortgageTerm, setMortgageTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5.25);
  const [startDate, setStartDate] = useState(DEMO_START_PERIOD);
  const [hasDeal, setHasDeal] = useState(true);
  const [dealType, setDealType] = useState<DealType>('fixed');
  const [dealTerm, setDealTerm] = useState(5);
  const [svr, setSvr] = useState(7.5);
  const [baseRate, setBaseRate] = useState(4.75);
  const [margin, setMargin] = useState(0.5);

  const isInterestOnly = mortgageType === 'interest-only';
  const isTracker = dealType === 'tracker';
  const showSingleCard = !hasDeal;
  const showAfterDealCard = hasDeal && dealTerm < mortgageTerm;

  const depositAmount =
    depositMode === 'amount'
      ? deposit
      : Math.round((propertyPrice * depositPercent) / 100);
  const loanAmount = Math.max(0, propertyPrice - depositAmount);
  const loanToValue =
    propertyPrice > 0 ? (loanAmount / propertyPrice) * 100 : 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleDepositModeChange(mode: DepositMode) {
    if (mode === depositMode) {
      return;
    }

    if (mode === 'percent') {
      setDepositPercent(
        propertyPrice > 0
          ? Math.round((deposit / propertyPrice) * 1000) / 10
          : 0,
      );
    } else {
      setDeposit(Math.round((propertyPrice * depositPercent) / 100));
    }

    setDepositMode(mode);
  }

  return (
    <>
      <Head title="Mortgage Calculator" />
      <div className="relative left-1/2 mx-[-50vw] w-screen bg-brand-canvas py-8">
        <div className="mx-auto max-w-120 px-4 text-center sm:px-6 md:max-w-240 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Mortgage Payment Calculator
          </h1>
          <p className="mt-4 mb-2 text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
            Calculate the monthly payment for a mortgage based on your property
            value and deposit.{' '}
          </p>
          <p>
            <Link
              href={blog()}
              className="text-brand-subtle-foreground underline underline-offset-4"
            >
              Read our guide to mortgages
            </Link>
            .
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-120 grid-cols-1 gap-6 px-4 sm:px-6 md:max-w-240 md:grid-cols-[13fr_9fr] md:items-start lg:px-8">
          <MortgageForm
            mortgageType={mortgageType}
            setMortgageType={setMortgageType}
            propertyPrice={propertyPrice}
            setPropertyPrice={setPropertyPrice}
            depositMode={depositMode}
            onDepositModeChange={handleDepositModeChange}
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
            showSingleCard={showSingleCard}
            showAfterDealCard={showAfterDealCard}
          />
        </div>
      </div>
    </>
  );
}
