import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import {
  calculateLoanAmount,
  calculateLoanToValuePercentage,
  resolveDepositAmount,
} from '../../calculations';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import type { DepositMode } from '../../types';
import { toggleSelectedClass } from './field-styles';
import { PercentInput } from './percent-input';
import { ThousandsInput } from './thousands-input';

export function DepositField() {
  const fieldId = useId();
  const propertyPriceGbp = useMortgageStore((s) => s.propertyPriceGbp);

  const depositMode = useMortgageStore((s) => s.depositMode);
  const setDepositMode = useMortgageStore((s) => s.setDepositMode);

  const depositGbp = useMortgageStore((s) => s.depositGbp);
  const setDepositGbp = useMortgageStore((s) => s.setDepositGbp);

  const depositPercent = useMortgageStore((s) => s.depositPercent);
  const setDepositPercent = useMortgageStore((s) => s.setDepositPercent);

  const depositAmount = resolveDepositAmount({
    propertyPriceGbp,
    depositMode,
    depositGbp,
    depositPercent,
  });

  const loanAmount = calculateLoanAmount(propertyPriceGbp, depositAmount);
  const loanToValue = calculateLoanToValuePercentage(
    propertyPriceGbp,
    loanAmount,
  );

  const depositAmountStepAmount = 10_000;
  const depositPercentStepAmount = 5;

  const stepUpDeposit = () => {
    depositMode === 'amount'
      ? setDepositGbp((value) =>
          Math.min(propertyPriceGbp, value + depositAmountStepAmount),
        )
      : setDepositPercent((value) => {
          const newValue = value + depositPercentStepAmount;
          const newValue2DecimalPlaces = Math.round(newValue * 100) / 100;
          return Math.min(100, newValue2DecimalPlaces);
        });
  };

  const stepDownDeposit = () => {
    depositMode === 'amount'
      ? setDepositGbp((value) => Math.max(0, value - depositAmountStepAmount))
      : setDepositPercent((value) => {
          const newValue = value - depositPercentStepAmount;
          const newValue2DecimalPlaces = Math.round(newValue * 100) / 100;
          return Math.max(0, newValue2DecimalPlaces);
        });
  };

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
          onClick={stepDownDeposit}
        >
          {depositMode === 'amount'
            ? copy['mortgageForm.depositSubtractAmountButton']
            : copy['mortgageForm.depositSubtractPercentButton']}
        </Button>
        <div className="flex grow items-center gap-2">
          {depositMode === 'amount' && <span aria-hidden="true">£</span>}
          {depositMode === 'amount' ? (
            <ThousandsInput
              id={fieldId}
              name="deposit"
              value={depositGbp}
              onChange={setDepositGbp}
            />
          ) : (
            <PercentInput
              id={fieldId}
              name="deposit"
              value={depositPercent}
              onChange={setDepositPercent}
            />
          )}
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
          onClick={stepUpDeposit}
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
