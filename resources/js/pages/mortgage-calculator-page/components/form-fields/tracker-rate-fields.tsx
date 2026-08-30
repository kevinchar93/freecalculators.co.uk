import { useId } from 'react';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { PercentInput } from './percent-input';

export function TrackerRateFields() {
  const baseRateId = useId();
  const marginId = useId();
  const baseRatePercent = useMortgageStore((s) => s.baseRatePercent);
  const setBaseRatePercent = useMortgageStore((s) => s.setBaseRatePercent);
  const marginPercent = useMortgageStore((s) => s.marginPercent);
  const setMarginPercent = useMortgageStore((s) => s.setMarginPercent);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor={baseRateId}>{copy['mortgageForm.baseRateLabel']}</Label>
        <div className="mt-2 flex items-center gap-2">
          <PercentInput
            id={baseRateId}
            name="baseRate"
            value={baseRatePercent}
            max={15}
            onChange={setBaseRatePercent}
          />
          <span aria-hidden="true">%</span>
        </div>
      </div>
      <div>
        <Label htmlFor={marginId}>{copy['mortgageForm.marginLabel']}</Label>
        <div className="mt-2 flex items-center gap-2">
          <PercentInput
            id={marginId}
            name="margin"
            value={marginPercent}
            max={10}
            onChange={setMarginPercent}
          />
          <span aria-hidden="true">%</span>
        </div>
      </div>
    </div>
  );
}
