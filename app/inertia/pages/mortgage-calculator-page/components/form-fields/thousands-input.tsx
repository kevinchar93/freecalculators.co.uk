import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { inputClass } from './field-styles';

function formatWithCommas(value: number): string {
  return Number.isFinite(value) ? value.toLocaleString('en-GB') : '';
}

type ThousandsInputProps = {
  id: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

export function ThousandsInput({
  id,
  name,
  value,
  onChange,
  className,
}: ThousandsInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(() =>
    formatWithCommas(value),
  );

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatWithCommas(value));
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
        const digitsOnly = event.target.value.replace(/[^0-9]/g, '');
        setDisplayValue(digitsOnly);
        onChange(digitsOnly === '' ? 0 : Number(digitsOnly));
      }}
      onBlur={() => {
        setIsFocused(false);
        setDisplayValue(formatWithCommas(value));
      }}
    />
  );
}
