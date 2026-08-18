import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

export function PropertyPriceField() {
  const fieldId = useId();
  const propertyPriceGbp = useMortgageStore((s) => s.propertyPriceGbp);
  const setPropertyPriceGbp = useMortgageStore((s) => s.setPropertyPriceGbp);

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
            setPropertyPriceGbp((value) => Math.max(0, value - 10000))
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
            value={propertyPriceGbp}
            onChange={(event) =>
              setPropertyPriceGbp(Number(event.target.value))
            }
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-16"
          aria-label={copy['mortgageForm.propertyPrice.AddAria']}
          onClick={() => setPropertyPriceGbp((value) => value + 10000)}
        >
          {copy['mortgageForm.propertyPrice.AddButtonLabel']}
        </Button>
      </div>
    </div>
  );
}
