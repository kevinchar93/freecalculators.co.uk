import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';
import { inputClass } from './field-styles';

const now = new Date();
const MIN_MONTH = '1970-01';
const MAX_MONTH = `${now.getFullYear() + 5}-12`; // 5 years in future

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
        min={MIN_MONTH}
        max={MAX_MONTH}
        value={startDate}
        onChange={(event) => setStartDate(event.target.value)}
        onBlur={(event) => {
          const value = event.target.value;
          if (value && value < MIN_MONTH) {
            setStartDate(MIN_MONTH);
          } else if (value && value > MAX_MONTH) {
            setStartDate(MAX_MONTH);
          }
        }}
        className={cn('mt-2', inputClass)}
      />
    </div>
  );
}
