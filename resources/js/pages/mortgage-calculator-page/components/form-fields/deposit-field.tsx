import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { calcLoanAmount, calcLoanToValue, depositPercentToAmount } from '../../calculations';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import type { DepositMode } from '../../types';
import { inputClass, toggleSelectedClass } from './field-styles';

export function DepositField() {
  const fieldId = useId();
  const propertyPrice = useMortgageStore((s) => s.propertyPrice);
  const depositMode = useMortgageStore((s) => s.depositMode);
  const setDepositMode = useMortgageStore((s) => s.setDepositMode);
  const deposit = useMortgageStore((s) => s.deposit);
  const setDeposit = useMortgageStore((s) => s.setDeposit);
  const depositPercent = useMortgageStore((s) => s.depositPercent);
  const setDepositPercent = useMortgageStore((s) => s.setDepositPercent);

  const depositAmount =
    depositMode === 'amount'
      ? deposit
      : depositPercentToAmount(propertyPrice, depositPercent);
  const loanAmount = calcLoanAmount(propertyPrice, depositAmount);
  const loanToValue = calcLoanToValue(propertyPrice, loanAmount);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor={fieldId}>{copy['mortgageForm.depositLabel']}</Label>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={depositMode}
          onValueChange={(value) => {
            if (value) {
              setDepositMode(value as DepositMode);
            }
          }}
          className="w-16"
        >
          <ToggleGroupItem
            value="amount"
            aria-label={copy['mortgageForm.depositModeAmountAria']}
            className={cn('flex-1', toggleSelectedClass)}
          >
            {copy['mortgageForm.depositModeAmountButton']}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="percent"
            aria-label={copy['mortgageForm.depositModePercentAria']}
            className={cn('flex-1', toggleSelectedClass)}
          >
            {copy['mortgageForm.depositModePercentButton']}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="mt-2 flex gap-2">
        <Button
          type="button"
          variant="outline"
          aria-label={
            depositMode === 'amount'
              ? copy['mortgageForm.depositSubtractAmountAria']
              : copy['mortgageForm.depositSubtractPercentAria']
          }
          onClick={() =>
            depositMode === 'amount'
              ? setDeposit((value) => Math.max(0, value - 10000))
              : setDepositPercent((value) => Math.max(0, value - 5))
          }
        >
          {depositMode === 'amount'
            ? copy['mortgageForm.depositSubtractAmountButton']
            : copy['mortgageForm.depositSubtractPercentButton']}
        </Button>
        <div className="flex grow items-center gap-2">
          {depositMode === 'amount' && <span aria-hidden="true">£</span>}
          <Input
            type="number"
            id={fieldId}
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
              ? copy['mortgageForm.depositAddAmountAria']
              : copy['mortgageForm.depositAddPercentAria']
          }
          onClick={() =>
            depositMode === 'amount'
              ? setDeposit((value) => value + 10000)
              : setDepositPercent((value) => value + 5)
          }
        >
          {depositMode === 'amount'
            ? copy['mortgageForm.depositAddAmountButton']
            : copy['mortgageForm.depositAddPercentButton']}
        </Button>
      </div>
      <div className="mt-3 flex">
        <div className="inline-flex items-center gap-2">
          <span className="text-sm font-medium">
            {copy['mortgageForm.loanToValueLabel']}
          </span>
          <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            {loanToValue.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
