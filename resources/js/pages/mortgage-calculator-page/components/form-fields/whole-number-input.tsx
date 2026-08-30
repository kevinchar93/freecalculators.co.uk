import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { inputClass } from './field-styles';

const WHOLE_NUMBER_SHAPE_PATTERN = /^\d*$/;

type WholeNumberInputProps = {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  className?: string;
};

export function WholeNumberInput({
  id,
  name,
  value,
  min,
  max,
  onChange,
  className,
}: WholeNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(() => String(value));

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(String(value));
    }
  }, [value, isFocused]);

  return (
    <Input
      type="text"
      inputMode="numeric"
      id={id}
      name={name}
      className={cn(inputClass, className)}
      value={displayValue}
      onFocus={() => {
        setIsFocused(true);
        setDisplayValue(value === 0 ? '' : String(value));
      }}
      onChange={(event) => {
        const raw = event.target.value;

        if (!WHOLE_NUMBER_SHAPE_PATTERN.test(raw)) {
          return;
        }

        if (raw !== '' && Number(raw) > max) {
          return;
        }

        setDisplayValue(raw);
        onChange(raw === '' ? 0 : Number(raw));
      }}
      onBlur={() => {
        setIsFocused(false);
        const clampedValue = Math.max(min, Math.min(max, value));

        setDisplayValue(String(clampedValue));

        if (clampedValue !== value) {
          onChange(clampedValue);
        }
      }}
    />
  );
}
