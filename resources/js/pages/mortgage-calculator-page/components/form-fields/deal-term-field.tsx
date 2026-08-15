import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

export function DealTermField() {
  const fieldId = useId();
  const dealTerm = useMortgageStore((s) => s.dealTerm);
  const setDealTerm = useMortgageStore((s) => s.setDealTerm);

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.dealTermLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="number"
          id={fieldId}
          name="dealTerm"
          className={inputClass}
          value={dealTerm}
          onChange={(event) => setDealTerm(Number(event.target.value))}
        />
        <span aria-hidden="true">
          {copy['mortgageForm.dealTermYearsSuffix']}
        </span>
      </div>
    </div>
  );
}
