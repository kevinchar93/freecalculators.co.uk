import { useId } from 'react';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { toggleSelectedClass } from './field-styles';
import { WholeNumberInput } from './whole-number-input';

export function MortgageTermField() {
  const fieldId = useId();
  const mortgageTermYears = useMortgageStore((s) => s.mortgageTermYears);
  const setMortgageTermYears = useMortgageStore((s) => s.setMortgageTermYears);

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.mortgageTermLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <WholeNumberInput
          id={fieldId}
          name="mortgageTerm"
          value={mortgageTermYears}
          min={1}
          max={45}
          onChange={setMortgageTermYears}
        />
        <span aria-hidden="true">
          {copy['mortgageForm.mortgageTermYearsSuffix']}
        </span>
      </div>
      <ToggleGroup
        type="single"
        variant="outline"
        value={String(mortgageTermYears)}
        onValueChange={(value) => {
          if (value) {
            setMortgageTermYears(Number(value));
          }
        }}
        className="mt-2 w-full"
      >
        <ToggleGroupItem
          value="15"
          className={cn('flex-1', toggleSelectedClass)}
        >
          {copy['mortgageForm.mortgageTerm15Label']}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="20"
          className={cn('flex-1', toggleSelectedClass)}
        >
          {copy['mortgageForm.mortgageTerm20Label']}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="25"
          className={cn('flex-1', toggleSelectedClass)}
        >
          {copy['mortgageForm.mortgageTerm25Label']}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="30"
          className={cn('flex-1', toggleSelectedClass)}
        >
          {copy['mortgageForm.mortgageTerm30Label']}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
