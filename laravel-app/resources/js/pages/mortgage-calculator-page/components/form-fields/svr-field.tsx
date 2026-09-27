import { useId } from 'react';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { PercentInput } from './percent-input';

export function SvrField() {
  const fieldId = useId();
  const standardVariableRatePercent = useMortgageStore(
    (s) => s.standardVariableRatePercent,
  );
  const setStandardVariableRatePercent = useMortgageStore(
    (s) => s.setStandardVariableRatePercent,
  );

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.svrLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <PercentInput
          id={fieldId}
          name="svr"
          value={standardVariableRatePercent}
          max={15}
          onChange={setStandardVariableRatePercent}
        />
        <span aria-hidden="true">%</span>
      </div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {copy['mortgageForm.svrNotice']}
      </p>
    </div>
  );
}
