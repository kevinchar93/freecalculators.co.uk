import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass, toggleSelectedClass } from './field-styles';

export function MortgageTermField() {
  const fieldId = useId();
  const mortgageTerm = useMortgageStore((s) => s.mortgageTerm);
  const setMortgageTerm = useMortgageStore((s) => s.setMortgageTerm);

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.mortgageTermLabel']}</Label>
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="number"
          id={fieldId}
          name="mortgageTerm"
          className={inputClass}
          value={mortgageTerm}
          onChange={(event) => setMortgageTerm(Number(event.target.value))}
        />
        <span aria-hidden="true">
          {copy['mortgageForm.mortgageTermYearsSuffix']}
        </span>
      </div>
      <ToggleGroup
        type="single"
        variant="outline"
        value={String(mortgageTerm)}
        onValueChange={(value) => {
          if (value) {
            setMortgageTerm(Number(value));
          }
        }}
        className="mt-2 w-full"
      >
        <ToggleGroupItem value="15" className={cn('flex-1', toggleSelectedClass)}>
          {copy['mortgageForm.mortgageTerm15Label']}
        </ToggleGroupItem>
        <ToggleGroupItem value="20" className={cn('flex-1', toggleSelectedClass)}>
          {copy['mortgageForm.mortgageTerm20Label']}
        </ToggleGroupItem>
        <ToggleGroupItem value="25" className={cn('flex-1', toggleSelectedClass)}>
          {copy['mortgageForm.mortgageTerm25Label']}
        </ToggleGroupItem>
        <ToggleGroupItem value="30" className={cn('flex-1', toggleSelectedClass)}>
          {copy['mortgageForm.mortgageTerm30Label']}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
