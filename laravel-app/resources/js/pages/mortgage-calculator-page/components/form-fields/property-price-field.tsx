import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { ThousandsInput } from './thousands-input';

export function PropertyPriceField() {
  const fieldId = useId();
  const propertyPriceGbp = useMortgageStore((s) => s.propertyPriceGbp);
  const setPropertyPriceGbp = useMortgageStore((s) => s.setPropertyPriceGbp);

  const propertyPriceStepAmount = 10_000;

  const stepUpPropertyPrice = () => {
    setPropertyPriceGbp((value) => value + propertyPriceStepAmount);
  };

  const stepDownPropertyPrice = () => {
    setPropertyPriceGbp((value) =>
      Math.max(0, value - propertyPriceStepAmount),
    );
  };

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
          onClick={stepDownPropertyPrice}
        >
          {copy['mortgageForm.propertyPrice.SubtractButtonLabel']}
        </Button>
        <div className="flex grow items-center gap-2">
          <span aria-hidden="true">£</span>
          <ThousandsInput
            id={fieldId}
            name="propertyPrice"
            value={propertyPriceGbp}
            onChange={setPropertyPriceGbp}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-16"
          aria-label={copy['mortgageForm.propertyPrice.AddAria']}
          onClick={stepUpPropertyPrice}
        >
          {copy['mortgageForm.propertyPrice.AddButtonLabel']}
        </Button>
      </div>
    </div>
  );
}
