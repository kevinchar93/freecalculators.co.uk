import { Head, Link } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { blog } from '@/routes';

export default function MortgageCalculatorPage() {
  return (
    <>
      <Head title="Mortgage Calculator" />
      <div className="relative left-1/2 mx-[-50vw] w-screen bg-brand-canvas px-4 py-8 sm:px-12 md:px-8">
        <div className="mx-auto max-w-120 text-center md:max-w-240">
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
        <div className="mx-auto mt-8 grid max-w-120 grid-cols-1 gap-6 md:max-w-240 md:grid-cols-[13fr_9fr] md:items-start">
          <Card className="h-150 rounded-2xl border-brand-border" />
          <div className="flex flex-col gap-6">
            <Card className="h-32 rounded-2xl border-brand-border" />
            <Card className="h-64 rounded-2xl border-brand-border" />
            <Card className="h-64 rounded-2xl border-brand-border" />
          </div>
        </div>
      </div>
    </>
  );
}
