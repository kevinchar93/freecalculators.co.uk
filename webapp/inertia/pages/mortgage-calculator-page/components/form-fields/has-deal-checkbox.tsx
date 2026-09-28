import { Checkbox } from '@/components/ui/checkbox';
import copy from '../../copy.json';
import { useMortgageStore } from '../../store';

export function HasDealCheckbox() {
  const hasDeal = useMortgageStore((s) => s.hasDeal);
  const setHasDeal = useMortgageStore((s) => s.setHasDeal);

  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <Checkbox
        checked={hasDeal}
        onCheckedChange={(checked) => setHasDeal(checked === true)}
      />
      {copy['mortgageForm.hasDealCheckboxLabel']}
    </label>
  );
}
