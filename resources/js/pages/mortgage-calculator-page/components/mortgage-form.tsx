import { useId } from 'react';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import type { DealType, DepositMode, MortgageType } from '../types';
import { frostedCardClass } from '../styles';

const toggleSelectedClass =
  'data-[state=on]:border-brand data-[state=on]:bg-brand data-[state=on]:text-brand-foreground data-[state=off]:bg-background';
const inputClass = 'bg-background focus-visible:ring-brand';

interface MortgageFormProps {
  mortgageType: MortgageType;
  setMortgageType: Dispatch<SetStateAction<MortgageType>>;
  propertyPrice: number;
  setPropertyPrice: Dispatch<SetStateAction<number>>;
  depositMode: DepositMode;
  onDepositModeChange: (mode: DepositMode) => void;
  deposit: number;
  setDeposit: Dispatch<SetStateAction<number>>;
  depositPercent: number;
  setDepositPercent: Dispatch<SetStateAction<number>>;
  loanToValue: number;
  mortgageTerm: number;
  setMortgageTerm: Dispatch<SetStateAction<number>>;
  interestRate: number;
  setInterestRate: Dispatch<SetStateAction<number>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  hasDeal: boolean;
  setHasDeal: Dispatch<SetStateAction<boolean>>;
  isTracker: boolean;
  dealType: DealType;
  setDealType: Dispatch<SetStateAction<DealType>>;
  dealTerm: number;
  setDealTerm: Dispatch<SetStateAction<number>>;
  svr: number;
  setSvr: Dispatch<SetStateAction<number>>;
  baseRate: number;
  setBaseRate: Dispatch<SetStateAction<number>>;
  margin: number;
  setMargin: Dispatch<SetStateAction<number>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function MortgageForm({
  mortgageType,
  setMortgageType,
  propertyPrice,
  setPropertyPrice,
  depositMode,
  onDepositModeChange,
  deposit,
  setDeposit,
  depositPercent,
  setDepositPercent,
  loanToValue,
  mortgageTerm,
  setMortgageTerm,
  interestRate,
  setInterestRate,
  startDate,
  setStartDate,
  hasDeal,
  setHasDeal,
  isTracker,
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
  onSubmit,
}: MortgageFormProps) {
  const formId = useId();

  return (
    <Card
      className={cn('rounded-2xl border-brand-border p-5', frostedCardClass)}
    >
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          {/* mortgage type */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              {copy['form.mortgageType.FieldLabel']}
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
              <ToggleGroupItem
                value="repayment"
                className={cn('flex-1', toggleSelectedClass)}
              >
                {copy['form.mortgageType.RepaymentOptionLabel']}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="interest-only"
                className={cn('flex-1', toggleSelectedClass)}
              >
                {copy['form.mortgageType.InterestOnlyOptionLabel']}
              </ToggleGroupItem>
            </ToggleGroup>
          </fieldset>

          {/* property price */}
          <div>
            <Label htmlFor={`${formId}-propertyPrice`}>
              {copy['form.propertyPrice.FieldLabel']}
            </Label>
            <div className="mt-2 flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-16"
                aria-label={copy['form.propertyPrice.SubtractAria']}
                onClick={() =>
                  setPropertyPrice((value) => Math.max(0, value - 10000))
                }
              >
                {copy['form.propertyPrice.SubtractButtonLabel']}
              </Button>
              <div className="flex grow items-center gap-2">
                <span aria-hidden="true">£</span>
                <Input
                  type="number"
                  id={`${formId}-propertyPrice`}
                  name="propertyPrice"
                  className={inputClass}
                  value={propertyPrice}
                  onChange={(event) =>
                    setPropertyPrice(Number(event.target.value))
                  }
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-16"
                aria-label={copy['form.propertyPrice.AddAria']}
                onClick={() => setPropertyPrice((value) => value + 10000)}
              >
                {copy['form.propertyPrice.AddButtonLabel']}
              </Button>
            </div>
          </div>

          {/* deposit */}
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor={`${formId}-deposit`}>
                {copy['form.depositLabel']}
              </Label>
              <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                value={depositMode}
                onValueChange={(value) => {
                  if (value) {
                    onDepositModeChange(value as DepositMode);
                  }
                }}
                className="w-16"
              >
                <ToggleGroupItem
                  value="amount"
                  aria-label={copy['form.depositModeAmountAria']}
                  className={cn('flex-1', toggleSelectedClass)}
                >
                  {copy['form.depositModeAmountButton']}
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="percent"
                  aria-label={copy['form.depositModePercentAria']}
                  className={cn('flex-1', toggleSelectedClass)}
                >
                  {copy['form.depositModePercentButton']}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="mt-2 flex gap-2">
              <Button
                type="button"
                variant="outline"
                aria-label={
                  depositMode === 'amount'
                    ? copy['form.depositSubtractAmountAria']
                    : copy['form.depositSubtractPercentAria']
                }
                onClick={() =>
                  depositMode === 'amount'
                    ? setDeposit((value) => Math.max(0, value - 10000))
                    : setDepositPercent((value) => Math.max(0, value - 5))
                }
              >
                {depositMode === 'amount'
                  ? copy['form.depositSubtractAmountButton']
                  : copy['form.depositSubtractPercentButton']}
              </Button>
              <div className="flex grow items-center gap-2">
                {depositMode === 'amount' && <span aria-hidden="true">£</span>}
                <Input
                  type="number"
                  id={`${formId}-deposit`}
                  name="deposit"
                  className={inputClass}
                  value={depositMode === 'amount' ? deposit : depositPercent}
                  onChange={(event) =>
                    depositMode === 'amount'
                      ? setDeposit(Number(event.target.value))
                      : setDepositPercent(Number(event.target.value))
                  }
                />
                {depositMode === 'percent' && <span aria-hidden="true">%</span>}
              </div>
              <Button
                type="button"
                variant="outline"
                aria-label={
                  depositMode === 'amount'
                    ? copy['form.depositAddAmountAria']
                    : copy['form.depositAddPercentAria']
                }
                onClick={() =>
                  depositMode === 'amount'
                    ? setDeposit((value) => value + 10000)
                    : setDepositPercent((value) => value + 5)
                }
              >
                {depositMode === 'amount'
                  ? copy['form.depositAddAmountButton']
                  : copy['form.depositAddPercentButton']}
              </Button>
            </div>
            <div className="mt-3 flex">
              <div className="inline-flex items-center gap-2">
                <span className="text-sm font-medium">
                  {copy['form.loanToValueLabel']}
                </span>
                <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {loanToValue.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* mortgage term + interest rate */}
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Label htmlFor={`${formId}-mortgageTerm`}>
                {copy['form.mortgageTermLabel']}
              </Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  type="number"
                  id={`${formId}-mortgageTerm`}
                  name="mortgageTerm"
                  className={inputClass}
                  value={mortgageTerm}
                  onChange={(event) =>
                    setMortgageTerm(Number(event.target.value))
                  }
                />
                <span aria-hidden="true">
                  {copy['form.mortgageTermYearsSuffix']}
                </span>
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
                <ToggleGroupItem
                  value="15"
                  className={cn('flex-1', toggleSelectedClass)}
                >
                  {copy['form.mortgageTerm15Label']}
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="20"
                  className={cn('flex-1', toggleSelectedClass)}
                >
                  {copy['form.mortgageTerm20Label']}
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="25"
                  className={cn('flex-1', toggleSelectedClass)}
                >
                  {copy['form.mortgageTerm25Label']}
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="30"
                  className={cn('flex-1', toggleSelectedClass)}
                >
                  {copy['form.mortgageTerm30Label']}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div>
              <Label htmlFor={`${formId}-interestRate`}>
                {copy['form.interestRateLabel']}
              </Label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  type="number"
                  step="0.01"
                  id={`${formId}-interestRate`}
                  name="interestRate"
                  className={inputClass}
                  value={interestRate}
                  disabled={hasDeal && isTracker}
                  onChange={(event) =>
                    setInterestRate(Number(event.target.value))
                  }
                />
                <span aria-hidden="true">%</span>
              </div>
              {hasDeal && isTracker && (
                <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                  {copy['form.interestRateDisabledNotice']}
                </p>
              )}
            </div>
          </div>

          {/* start date */}
          <div>
            <Label htmlFor={`${formId}-startDate`}>
              {copy['form.startDateLabel']}
            </Label>
            <Input
              type="month"
              id={`${formId}-startDate`}
              name="startDate"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className={cn('mt-2', inputClass)}
            />
          </div>

          {/* has deal */}
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <Checkbox
              checked={hasDeal}
              onCheckedChange={(checked) => setHasDeal(checked === true)}
            />
            {copy['form.hasDealCheckboxLabel']}
          </label>

          {hasDeal && (
            <div className="flex flex-col gap-5 rounded-md border border-brand-border bg-brand-subtle p-4">
              <fieldset>
                <legend className="mb-2 block text-sm font-medium">
                  {copy['form.dealTypeLegend']}
                </legend>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={dealType}
                  onValueChange={(value) => {
                    if (value) {
                      setDealType(value as DealType);
                    }
                  }}
                  className="w-full"
                >
                  <ToggleGroupItem
                    value="fixed"
                    className={cn('flex-1', toggleSelectedClass)}
                  >
                    {copy['form.dealTypeFixed']}
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="tracker"
                    className={cn('flex-1', toggleSelectedClass)}
                  >
                    {copy['form.dealTypeTracker']}
                  </ToggleGroupItem>
                </ToggleGroup>
              </fieldset>

              {isTracker && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor={`${formId}-baseRate`}>
                      {copy['form.baseRateLabel']}
                    </Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        id={`${formId}-baseRate`}
                        name="baseRate"
                        className={inputClass}
                        value={baseRate}
                        onChange={(event) =>
                          setBaseRate(Number(event.target.value))
                        }
                      />
                      <span aria-hidden="true">%</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`${formId}-margin`}>
                      {copy['form.marginLabel']}
                    </Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        id={`${formId}-margin`}
                        name="margin"
                        className={inputClass}
                        value={margin}
                        onChange={(event) =>
                          setMargin(Number(event.target.value))
                        }
                      />
                      <span aria-hidden="true">%</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor={`${formId}-dealTerm`}>
                  {copy['form.dealTermLabel']}
                </Label>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    type="number"
                    id={`${formId}-dealTerm`}
                    name="dealTerm"
                    className={inputClass}
                    value={dealTerm}
                    onChange={(event) =>
                      setDealTerm(Number(event.target.value))
                    }
                  />
                  <span aria-hidden="true">
                    {copy['form.dealTermYearsSuffix']}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor={`${formId}-svr`}>{copy['form.svrLabel']}</Label>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.01"
                    id={`${formId}-svr`}
                    name="svr"
                    className={inputClass}
                    value={svr}
                    onChange={(event) => setSvr(Number(event.target.value))}
                  />
                  <span aria-hidden="true">%</span>
                </div>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {copy['form.svrNotice']}
                </p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            {copy['form.submitButton']}
          </Button>
        </div>
      </form>
    </Card>
  );
}
