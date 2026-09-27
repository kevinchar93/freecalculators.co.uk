import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { WholeNumberInput } from './whole-number-input';

export function DealTermField() {
  const fieldId = useId();
  const dealTermYears = useMortgageStore((s) => s.dealTermYears);
  const setDealTermYears = useMortgageStore((s) => s.setDealTermYears);

  const MAX_DEAL_TERM_YEARS = 10;
  const MIN_DEAL_TERM_YEARS = 1;

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.dealTermLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <WholeNumberInput
          id={fieldId}
          name="dealTerm"
          value={dealTermYears}
          min={MIN_DEAL_TERM_YEARS}
          max={MAX_DEAL_TERM_YEARS}
          onChange={setDealTermYears}
        />
        <span aria-hidden="true">
          {copy['mortgageForm.dealTermYearsSuffix']}
        </span>
      </div>
    </div>
  );
}
