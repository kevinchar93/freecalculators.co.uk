import { useId } from 'react';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { PercentInput } from './percent-input';

export function InterestRateField() {
  const fieldId = useId();
  const interestRatePercent = useMortgageStore((s) => s.interestRatePercent);
  const setInterestRatePercent = useMortgageStore(
    (s) => s.setInterestRatePercent,
  );
  const hasDeal = useMortgageStore((s) => s.hasDeal);
  const isTracker = useMortgageStore((s) => s.dealType === 'tracker');
  const disabled = hasDeal && isTracker;

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.interestRateLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <PercentInput
          id={fieldId}
          name="interestRate"
          value={interestRatePercent}
          max={10}
          disabled={disabled}
          onChange={setInterestRatePercent}
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
