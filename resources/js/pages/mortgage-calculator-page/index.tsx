import { Head, Link } from '@inertiajs/react';
import { assumptions } from '@/routes/mortgage-calculator';
import FullBleedSection from '@/components/full-bleed-section';
import { MortgageForm } from './components/mortgage-form';
import { ResultsPanel } from './components/results-panel';
import copy from './copy.json';
import { useMortgageStore } from './store';

export default function MortgageCalculatorPage() {
  const hasDeal = useMortgageStore((s) => s.hasDeal);
  const dealTermYears = useMortgageStore((s) => s.dealTermYears);
  const mortgageTermYears = useMortgageStore((s) => s.mortgageTermYears);

  const hasAfterDealPeriod = hasDeal && dealTermYears < mortgageTermYears;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const resultCardId = hasDeal ? 'during-deal-card' : 'single-result-card';
    const resultCard = document.getElementById(resultCardId);

    if (resultCard) {
      const pxAbove = 120;
      const top =
        resultCard.getBoundingClientRect().top + window.scrollY - pxAbove;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  return (
    <>
      <Head title={copy['page.headTitle']} />
      <FullBleedSection className="">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
          {copy['page.heading']}
        </h1>
        <p className="sm:text-md mt-4 mb-2 text-base text-neutral-600 dark:text-neutral-400">
          {copy['page.introBeforeLink']}
          <Link
            href={assumptions()}
            className="text-brand-subtle-foreground underline underline-offset-4"
          >
            {copy['page.introLinkText']}
          </Link>
          {copy['page.introAfterLink']}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:px-0 md:grid-cols-[13fr_9fr] md:items-start">
          <MortgageForm onSubmit={handleSubmit} />

          <ResultsPanel
            hasDeal={hasDeal}
            showAfterDealCard={hasAfterDealPeriod}
          />
        </div>
      </FullBleedSection>
    </>
  );
}
