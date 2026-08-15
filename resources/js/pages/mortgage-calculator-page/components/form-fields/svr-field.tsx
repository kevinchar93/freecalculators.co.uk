import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

export function SvrField() {
  const fieldId = useId();
  const svr = useMortgageStore((s) => s.svr);
  const setSvr = useMortgageStore((s) => s.setSvr);

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.svrLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="number"
          step="0.01"
          id={fieldId}
          name="svr"
          className={inputClass}
          value={svr}
          onChange={(event) => setSvr(Number(event.target.value))}
        />
        <span aria-hidden="true">%</span>
      </div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {copy['mortgageForm.svrNotice']}
      </p>
    </div>
  );
}
