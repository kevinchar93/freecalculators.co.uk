import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import { frostedCardClass } from '../styles';
import { DealFieldsGroup } from './form-fields/deal-fields-group';
import { DepositField } from './form-fields/deposit-field';
import { HasDealCheckbox } from './form-fields/has-deal-checkbox';
import { InterestRateField } from './form-fields/interest-rate-field';
import { MortgageTermField } from './form-fields/mortgage-term-field';
import { MortgageTypeField } from './form-fields/mortgage-type-field';
import { PropertyPriceField } from './form-fields/property-price-field';
import { StartDateField } from './form-fields/start-date-field';

interface MortgageFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function MortgageForm({ onSubmit }: MortgageFormProps) {
  return (
    <Card
      className={cn('rounded-2xl border-brand-border p-5', frostedCardClass)}
    >
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          <MortgageTypeField />
          <PropertyPriceField />
          <DepositField />
          <MortgageTermField />
          <InterestRateField />
          <StartDateField />
          <HasDealCheckbox />
          <DealFieldsGroup />

          <Button
            type="submit"
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            {copy['mortgageForm.submitButton']}
          </Button>
        </div>
      </form>
    </Card>
  );
}
