import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

export function InterestRateField() {
  const fieldId = useId();
  const interestRate = useMortgageStore((s) => s.interestRate);
  const setInterestRate = useMortgageStore((s) => s.setInterestRate);
  const hasDeal = useMortgageStore((s) => s.hasDeal);
  const isTracker = useMortgageStore((s) => s.dealType === 'tracker');
  const disabled = hasDeal && isTracker;

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.interestRateLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="number"
          step="0.01"
          id={fieldId}
          name="interestRate"
          className={inputClass}
          value={interestRate}
          disabled={disabled}
          onChange={(event) => setInterestRate(Number(event.target.value))}
        />
        <span aria-hidden="true">%</span>
      </div>
      {disabled && (
        <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400">
          {copy['mortgageForm.interestRateDisabledNotice']}
        </p>
      )}
    </div>
  );
}
