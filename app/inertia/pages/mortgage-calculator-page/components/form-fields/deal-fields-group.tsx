import { useMortgageStore } from '../../store';
import { DealTermField } from './deal-term-field';
import { DealTypeField } from './deal-type-field';
import { SvrField } from './svr-field';
import { TrackerRateFields } from './tracker-rate-fields';

export function DealFieldsGroup() {
  const hasDeal = useMortgageStore((s) => s.hasDeal);
  const isTracker = useMortgageStore((s) => s.dealType === 'tracker');

  if (!hasDeal) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 rounded-md border border-brand-border bg-brand-subtle p-4">
      <DealTypeField />
      {isTracker && <TrackerRateFields />}
      <DealTermField />
      <SvrField />
    </div>
  );
}
