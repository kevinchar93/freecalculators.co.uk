import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { inputClass } from './field-styles';

const PERCENT_SHAPE_PATTERN = /^\d*\.?\d{0,2}$/;

type PercentInputProps = {
  id: string;
  name: string;
  value: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
};

export function PercentInput({
  id,
  name,
  value,
  max = 100,
  onChange,
  className,
  disabled,
}: PercentInputProps) {
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
      inputMode="decimal"
      id={id}
      name={name}
      className={cn(inputClass, className)}
      value={displayValue}
      disabled={disabled}
      onFocus={() => {
        setIsFocused(true);
        setDisplayValue(value === 0 ? '' : String(value));
      }}
      onChange={(event) => {
        const raw = event.target.value;

        if (!PERCENT_SHAPE_PATTERN.test(raw)) {
          return;
        }

        const isIncompleteEntry = raw === '' || raw === '.';

        if (!isIncompleteEntry && Number(raw) > max) {
          return;
        }

        setDisplayValue(raw);
        onChange(isIncompleteEntry ? 0 : Number(raw));
      }}
      onBlur={() => {
        setIsFocused(false);
        setDisplayValue(String(value));
      }}
    />
  );
}
