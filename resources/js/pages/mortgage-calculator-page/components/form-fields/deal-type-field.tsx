import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import type { DealType } from '../../types';
import { toggleSelectedClass } from './field-styles';

export function DealTypeField() {
  const dealType = useMortgageStore((s) => s.dealType);
  const setDealType = useMortgageStore((s) => s.setDealType);

  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium">
        {copy['mortgageForm.dealTypeLegend']}
      </legend>
      <ToggleGroup
        type="single"
        variant="outline"
        value={dealType}
        onValueChange={(value) => {
          if (value) {
            setDealType(value as DealType);
          }
        }}
        className="w-full"
      >
        <ToggleGroupItem value="fixed" className={cn('flex-1', toggleSelectedClass)}>
          {copy['mortgageForm.dealTypeFixed']}
        </ToggleGroupItem>
        <ToggleGroupItem value="tracker" className={cn('flex-1', toggleSelectedClass)}>
          {copy['mortgageForm.dealTypeTracker']}
        </ToggleGroupItem>
      </ToggleGroup>
    </fieldset>
  );
}
