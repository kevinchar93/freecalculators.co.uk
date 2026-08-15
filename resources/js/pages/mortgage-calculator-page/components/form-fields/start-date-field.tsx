import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

export function StartDateField() {
  const fieldId = useId();
  const startDate = useMortgageStore((s) => s.startDate);
  const setStartDate = useMortgageStore((s) => s.setStartDate);

  return (
    <div>
      <Label htmlFor={fieldId}>{copy['mortgageForm.startDateLabel']}</Label>
      <Input
        type="month"
        id={fieldId}
        name="startDate"
        value={startDate}
        onChange={(event) => setStartDate(event.target.value)}
        className={cn('mt-2', inputClass)}
      />
    </div>
  );
}
