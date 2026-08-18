import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

export function DealTermField() {
  const fieldId = useId();
  const dealTermYears = useMortgageStore((s) => s.dealTermYears);
  const setDealTermYears = useMortgageStore((s) => s.setDealTermYears);

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.dealTermLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="number"
          id={fieldId}
          name="dealTerm"
          className={inputClass}
          value={dealTermYears}
          onChange={(event) => setDealTermYears(Number(event.target.value))}
        />
        <span aria-hidden="true">
          {copy['mortgageForm.dealTermYearsSuffix']}
        </span>
      </div>
    </div>
  );
}
