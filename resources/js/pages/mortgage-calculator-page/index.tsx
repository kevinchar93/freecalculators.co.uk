import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { blog } from '@/routes';
import {
  calcLoanAmount,
  depositPercentToAmount,
  calcLoanToValue,
  depositAmountToPercent,
} from './calculations';
import { MortgageForm } from './components/mortgage-form';
import { ResultsPanel } from './components/results-panel';
import copy from './copy.json';
import defaults from './defaults.json';
import type { DealType, DepositMode, MortgageType } from './types';

export default function MortgageCalculatorPage() {
  const [mortgageType, setMortgageType] = useState<MortgageType>(
    defaults.mortgageType as MortgageType,
  );
  const [propertyPrice, setPropertyPrice] = useState(defaults.propertyPrice);

  const [activeDepositMode, setDepositMode] = useState<DepositMode>(
    defaults.depositMode as DepositMode,
  );
  const [deposit, setDeposit] = useState(defaults.deposit);
  const [depositPercent, setDepositPercent] = useState(defaults.depositPercent);

  const [mortgageTerm, setMortgageTerm] = useState(defaults.mortgageTerm);
  const [interestRate, setInterestRate] = useState(defaults.interestRate);

  const [startDate, setStartDate] = useState(defaults.startDate);

  const [hasDeal, setHasDeal] = useState(defaults.hasDeal);
  const [dealType, setDealType] = useState<DealType>(
    defaults.dealType as DealType,
  );
  const [dealTerm, setDealTerm] = useState(defaults.dealTerm);

  const [svr, setSvr] = useState(defaults.svr);
  const [baseRate, setBaseRate] = useState(defaults.baseRate);
  const [margin, setMargin] = useState(defaults.margin);

  const isInterestOnly = mortgageType === 'interest-only';
  const isTracker = dealType === 'tracker';
  const showSingleCard = !hasDeal;
  const showAfterDealCard = hasDeal && dealTerm < mortgageTerm;

  const depositAmount =
    activeDepositMode === 'amount'
      ? deposit
      : depositPercentToAmount(propertyPrice, depositPercent);

  const loanAmount = calcLoanAmount(propertyPrice, depositAmount);
  const loanToValue = calcLoanToValue(propertyPrice, loanAmount);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleDepositModeChange(newMode: DepositMode) {
    if (newMode === activeDepositMode) {
      return;
    }

    if (newMode === 'percent') {
      setDepositPercent(depositAmountToPercent(propertyPrice, deposit));
    } else {
      setDeposit(depositPercentToAmount(propertyPrice, depositPercent));
    }

    setDepositMode(newMode);
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
            depositMode={activeDepositMode}
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
