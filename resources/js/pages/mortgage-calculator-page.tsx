import { Head, Link } from '@inertiajs/react';
import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { blog } from '@/routes';

type MortgageType = 'repayment' | 'interest-only';

export default function MortgageCalculatorPage() {
  const formId = useId();

  const [mortgageType, setMortgageType] = useState<MortgageType>('repayment');
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [deposit, setDeposit] = useState(50000);
  const [mortgageTerm, setMortgageTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5.25);
  const [dealTerm, setDealTerm] = useState(5);
  const [standardVariableRate, setStandardVariableRate] = useState(7.5);

  const loanToValue =
    propertyPrice > 0 ? Math.round((100 * (propertyPrice - deposit)) / propertyPrice) : 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

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
          {/* form */}
          <Card className="rounded-2xl border-brand-border p-5">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                {/* mortgage type */}
                <fieldset>
                  <legend className="mb-2 block text-sm font-medium">
                    Mortgage Type
                  </legend>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={mortgageType}
                    onValueChange={(value) => {
                      if (value) {
                        setMortgageType(value as MortgageType);
                      }
                    }}
                    className="w-full"
                  >
                    <ToggleGroupItem value="repayment" className="flex-1">
                      Repayment
                    </ToggleGroupItem>
                    <ToggleGroupItem value="interest-only" className="flex-1">
                      Interest Only
                    </ToggleGroupItem>
                  </ToggleGroup>
                </fieldset>

                {/* property price */}
                <div>
                  <Label htmlFor={`${formId}-propertyPrice`}>Property Price</Label>
                  <div className="mt-2 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      aria-label="Subtract £25,000"
                      onClick={() =>
                        setPropertyPrice((value) => Math.max(0, value - 25000))
                      }
                    >
                      -25k
                    </Button>
                    <div className="flex grow items-center gap-2">
                      <span aria-hidden="true">£</span>
                      <Input
                        type="number"
                        id={`${formId}-propertyPrice`}
                        name="propertyPrice"
                        value={propertyPrice}
                        onChange={(event) =>
                          setPropertyPrice(Number(event.target.value))
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      aria-label="Add £25,000"
                      onClick={() => setPropertyPrice((value) => value + 25000)}
                    >
                      +25k
                    </Button>
                  </div>
                  <input
                    type="range"
                    aria-label="Property price"
                    min={0}
                    max={2000000}
                    step={1000}
                    value={propertyPrice}
                    onChange={(event) => setPropertyPrice(Number(event.target.value))}
                    className="mt-3 w-full"
                  />
                </div>

                {/* deposit */}
                <div>
                  <Label htmlFor={`${formId}-deposit`}>Deposit Amount</Label>
                  <div className="mt-2 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      aria-label="Subtract £25,000"
                      onClick={() => setDeposit((value) => Math.max(0, value - 25000))}
                    >
                      -25k
                    </Button>
                    <div className="flex grow items-center gap-2">
                      <span aria-hidden="true">£</span>
                      <Input
                        type="number"
                        id={`${formId}-deposit`}
                        name="deposit"
                        value={deposit}
                        onChange={(event) => setDeposit(Number(event.target.value))}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      aria-label="Add £25,000"
                      onClick={() => setDeposit((value) => value + 25000)}
                    >
                      +25k
                    </Button>
                  </div>
                  <input
                    type="range"
                    aria-label="Deposit amount"
                    min={0}
                    max={propertyPrice}
                    step={1000}
                    value={deposit}
                    onChange={(event) => setDeposit(Number(event.target.value))}
                    className="mt-3 w-full"
                  />
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Loan to Value (LTV) <span>{loanToValue.toFixed(1)}%</span>
                  </p>
                </div>

                {/* mortgage term + interest rate */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor={`${formId}-mortgageTerm`}>Mortgage Term</Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        type="number"
                        id={`${formId}-mortgageTerm`}
                        name="mortgageTerm"
                        value={mortgageTerm}
                        onChange={(event) => setMortgageTerm(Number(event.target.value))}
                      />
                      <span aria-hidden="true">years</span>
                    </div>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      value={String(mortgageTerm)}
                      onValueChange={(value) => {
                        if (value) {
                          setMortgageTerm(Number(value));
                        }
                      }}
                      className="mt-2 w-full"
                    >
                      <ToggleGroupItem value="15" className="flex-1">
                        15y
                      </ToggleGroupItem>
                      <ToggleGroupItem value="20" className="flex-1">
                        20y
                      </ToggleGroupItem>
                      <ToggleGroupItem value="25" className="flex-1">
                        25y
                      </ToggleGroupItem>
                      <ToggleGroupItem value="30" className="flex-1">
                        30y
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <div>
                    <Label htmlFor={`${formId}-interestRate`}>Interest Rate</Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        id={`${formId}-interestRate`}
                        name="interestRate"
                        value={interestRate}
                        onChange={(event) => setInterestRate(Number(event.target.value))}
                      />
                      <span aria-hidden="true">%</span>
                    </div>
                  </div>
                </div>

                {/* deal term */}
                <div>
                  <Label htmlFor={`${formId}-dealTerm`}>Deal Term (Optional)</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      type="number"
                      id={`${formId}-dealTerm`}
                      name="dealTerm"
                      value={dealTerm}
                      onChange={(event) => setDealTerm(Number(event.target.value))}
                    />
                    <span aria-hidden="true">years</span>
                  </div>
                </div>

                {/* standard variable rate */}
                <div>
                  <Label htmlFor={`${formId}-standardVariableRate`}>
                    Standard variable rate (Optional)
                  </Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      id={`${formId}-standardVariableRate`}
                      name="standardVariableRate"
                      value={standardVariableRate}
                      onChange={(event) =>
                        setStandardVariableRate(Number(event.target.value))
                      }
                    />
                    <span aria-hidden="true">%</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    This is the rate that their mortgage will revert to once their deal
                    period ends. Entering a deal term will show you how payments change
                    after your initial fixed period ends.
                  </p>
                </div>

                {/* advanced options */}
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button type="button" variant="outline" className="w-full">
                      Advanced Options
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 flex flex-col gap-4">
                    {/* additional advanced fields go here */}
                  </CollapsibleContent>
                </Collapsible>

                <Button type="submit" size="lg">
                  Calculate Payments
                </Button>
              </div>
            </form>
          </Card>

          <div className="flex flex-col gap-6">
            {/* advert */}
            <Card className="rounded-2xl border-brand-border bg-brand-subtle p-5">
              <p className="font-semibold">Get Pre-Approved Today</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Rates as low as 4.95% APR. No credit impact.
              </p>
              <p>
                <a href="" className="text-brand-subtle-foreground underline underline-offset-4">
                  Learn More -&gt;
                </a>
              </p>
            </Card>

            {/* during your deal results */}
            <Card className="rounded-2xl border-brand-border p-0">
              <div className="rounded-t-2xl bg-brand-subtle-foreground px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
                During Your Deal
              </div>
              <div className="flex flex-col gap-4 p-5">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Monthly payment
                  </p>
                  <p className="text-4xl font-bold">£1,198</p>
                </div>

                <dl className="flex flex-col gap-1 border-t border-brand-border pt-4">
                  <div className="flex justify-between">
                    <dt>Loan Amount</dt>
                    <dd>£200,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Total Interest Payable</dt>
                    <dd>£159,549</dd>
                  </div>
                  <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
                    <dt>Total Repaid</dt>
                    <dd>£359,549</dd>
                  </div>
                </dl>

                <div>
                  <h3 className="mb-2 text-sm font-semibold">Payment Breakdown</h3>
                  <div
                    role="img"
                    aria-label="Principal 56%, Interest 44%"
                    className="flex h-2 w-full overflow-hidden rounded-full"
                  >
                    <span className="bg-brand-subtle-foreground" style={{ width: '56%' }} />
                    <span className="bg-neutral-300 dark:bg-neutral-600" style={{ width: '44%' }} />
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>Principal 56%</span>
                    <span>Interest 44%</span>
                  </div>
                </div>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-between">
                      Payment Schedule
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <caption className="sr-only">Payment amortization schedule</caption>
                      <thead>
                        <tr>
                          <th scope="col">Year</th>
                          <th scope="col">Interest</th>
                          <th scope="col">Principal</th>
                          <th scope="col">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1 (2026)</th>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                        </tr>
                        <tr>
                          <th scope="row">2 (2027)</th>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                        </tr>
                        <tr>
                          <th scope="row">3 (2028)</th>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                        </tr>
                      </tbody>
                    </table>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </Card>

            {/* after your deal results */}
            <Card className="rounded-2xl border-brand-border p-0">
              <div className="rounded-t-2xl bg-neutral-500 px-5 py-3 text-center text-sm font-semibold tracking-wide text-white uppercase">
                After Your Deal
              </div>
              <div className="flex flex-col gap-4 p-5">
                <div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Monthly payment
                  </p>
                  <p className="text-4xl font-bold">£1,452</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    This is the rate that you would pay once your mortgage deal ends in{' '}
                    {dealTerm} years
                  </p>
                </div>

                <dl className="flex flex-col gap-1 border-t border-brand-border pt-4">
                  <div className="flex justify-between">
                    <dt>Loan Amount</dt>
                    <dd>£192,045</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Total Interest Payable</dt>
                    <dd>£243,120</dd>
                  </div>
                  <div className="flex justify-between border-t border-brand-border pt-1 font-semibold">
                    <dt>Total Repaid</dt>
                    <dd>£435,165</dd>
                  </div>
                </dl>

                <div>
                  <h3 className="mb-2 text-sm font-semibold">Payment Breakdown</h3>
                  <div
                    role="img"
                    aria-label="Principal 40%, Interest 60%"
                    className="flex h-2 w-full overflow-hidden rounded-full"
                  >
                    <span className="bg-neutral-500" style={{ width: '40%' }} />
                    <span className="bg-neutral-300 dark:bg-neutral-600" style={{ width: '60%' }} />
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>Principal 40%</span>
                    <span>Interest 60%</span>
                  </div>
                </div>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-between">
                      Payment Schedule
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <caption className="sr-only">Payment amortization schedule</caption>
                      <thead>
                        <tr>
                          <th scope="col">Year</th>
                          <th scope="col">Interest</th>
                          <th scope="col">Principal</th>
                          <th scope="col">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1 (2026)</th>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                        </tr>
                        <tr>
                          <th scope="row">2 (2027)</th>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                        </tr>
                        <tr>
                          <th scope="row">3 (2028)</th>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                          <td>£xx,xxx</td>
                        </tr>
                      </tbody>
                    </table>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </Card>

            {/* advert */}
            <Card className="rounded-2xl border-brand-border bg-brand-subtle p-5">
              <p className="font-semibold">Get Pre-Approved Today</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Rates as low as 4.95% APR. No credit impact.
              </p>
              <p>
                <a href="" className="text-brand-subtle-foreground underline underline-offset-4">
                  Learn More -&gt;
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
