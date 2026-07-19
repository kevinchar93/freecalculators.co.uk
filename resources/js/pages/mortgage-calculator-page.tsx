import { Head } from '@inertiajs/react';
import { Card } from '@/components/ui/card';

export default function MortgageCalculatorPage() {
  return (
    <>
      <Head title="Mortgage Calculator" />
      <div className="relative left-1/2 mx-[-50vw] w-screen bg-brand-canvas px-4 py-8 sm:px-12 md:px-8">
        <div className="mx-auto grid max-w-120 grid-cols-1 gap-6 md:max-w-240 md:grid-cols-[13fr_9fr] md:items-start">
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
