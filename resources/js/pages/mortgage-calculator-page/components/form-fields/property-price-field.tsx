import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

export function PropertyPriceField() {
  const fieldId = useId();
  const propertyPrice = useMortgageStore((s) => s.propertyPrice);
  const setPropertyPrice = useMortgageStore((s) => s.setPropertyPrice);

  return (
    <div>
      <Label htmlFor={fieldId}>
        {copy['mortgageForm.propertyPrice.FieldLabel']}
      </Label>
      <div className="mt-2 flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-16"
          aria-label={copy['mortgageForm.propertyPrice.SubtractAria']}
          onClick={() =>
            setPropertyPrice((value) => Math.max(0, value - 10000))
          }
        >
          {copy['mortgageForm.propertyPrice.SubtractButtonLabel']}
        </Button>
        <div className="flex grow items-center gap-2">
          <span aria-hidden="true">£</span>
          <Input
            type="number"
            id={fieldId}
            name="propertyPrice"
            className={inputClass}
            value={propertyPrice}
            onChange={(event) => setPropertyPrice(Number(event.target.value))}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-16"
          aria-label={copy['mortgageForm.propertyPrice.AddAria']}
          onClick={() => setPropertyPrice((value) => value + 10000)}
        >
          {copy['mortgageForm.propertyPrice.AddButtonLabel']}
        </Button>
      </div>
    </div>
  );
}
