import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

export function TrackerRateFields() {
  const baseRateId = useId();
  const marginId = useId();
  const baseRate = useMortgageStore((s) => s.baseRate);
  const setBaseRate = useMortgageStore((s) => s.setBaseRate);
  const margin = useMortgageStore((s) => s.margin);
  const setMargin = useMortgageStore((s) => s.setMargin);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor={baseRateId}>{copy['mortgageForm.baseRateLabel']}</Label>
        <div className="mt-2 flex items-center gap-2">
          <Input
            type="number"
            step="0.01"
            id={baseRateId}
            name="baseRate"
            className={inputClass}
            value={baseRate}
            onChange={(event) => setBaseRate(Number(event.target.value))}
          />
          <span aria-hidden="true">%</span>
        </div>
      </div>
      <div>
        <Label htmlFor={marginId}>{copy['mortgageForm.marginLabel']}</Label>
        <div className="mt-2 flex items-center gap-2">
          <Input
            type="number"
            step="0.01"
            id={marginId}
            name="margin"
            className={inputClass}
            value={margin}
            onChange={(event) => setMargin(Number(event.target.value))}
          />
          <span aria-hidden="true">%</span>
        </div>
      </div>
    </div>
  );
}
