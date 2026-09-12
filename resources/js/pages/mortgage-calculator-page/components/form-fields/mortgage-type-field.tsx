import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import type { MortgageType } from '../../types';
import { toggleGroupItemSelectedBrandClass } from './field-styles';

export function MortgageTypeField() {
  const mortgageType = useMortgageStore((s) => s.mortgageType);
  const setMortgageType = useMortgageStore((s) => s.setMortgageType);

  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium">
        {copy['mortgageForm.mortgageType.FieldLabel']}
      </legend>
      <ToggleGroup
        type="single"
        variant="outline"
        value={mortgageType}
        onValueChange={(value) => {
          if (value) {
            setMortgageType(value as MortgageType);
          }
        }}
        className="w-full"
      >
        <ToggleGroupItem
          value="repayment"
          className={cn('flex-1', toggleGroupItemSelectedBrandClass)}
        >
          {copy['mortgageForm.mortgageType.RepaymentOptionLabel']}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="interest-only"
          className={cn('flex-1', toggleGroupItemSelectedBrandClass)}
        >
          {copy['mortgageForm.mortgageType.InterestOnlyOptionLabel']}
        </ToggleGroupItem>
      </ToggleGroup>
    </fieldset>
  );
}
