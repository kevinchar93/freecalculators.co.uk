import { Head, Link } from '@inertiajs/react';
import { blog } from '@/routes';
import { MortgageForm } from './components/mortgage-form';
import { ResultsPanel } from './components/results-panel';
import copy from './copy.json';
import { useMortgageStore } from './store';

export default function MortgageCalculatorPage() {
  const mortgageType = useMortgageStore((s) => s.mortgageType);
  const hasDeal = useMortgageStore((s) => s.hasDeal);
  const dealTerm = useMortgageStore((s) => s.dealTerm);
  const mortgageTerm = useMortgageStore((s) => s.mortgageTerm);

  const isInterestOnly = mortgageType === 'interest-only';
  const showAfterDealCard = hasDeal && dealTerm < mortgageTerm;

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
          <MortgageForm onSubmit={handleSubmit} />

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
