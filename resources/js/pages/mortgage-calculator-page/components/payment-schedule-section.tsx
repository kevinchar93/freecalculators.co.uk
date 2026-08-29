import { ChevronDownIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import type { AmortisationSchedule } from '../types';

const toneClasses = {
  brand: 'bg-brand-subtle text-brand-subtle-foreground',
  neutral:
    'bg-neutral-100 text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300',
} as const;

const EMPTY_SCHEDULE: AmortisationSchedule = { monthly: [], annual: [] };
const SCHEDULE_DEBOUNCE_MS = 300;

export function PaymentScheduleSection({
  getSchedule,
  tone = 'brand',
}: {
  getSchedule: () => AmortisationSchedule;
  tone?: keyof typeof toneClasses;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'monthly' | 'annual'>('monthly');

  const debouncedGetSchedule = useDebouncedValue(
    getSchedule,
    SCHEDULE_DEBOUNCE_MS,
  );
  const schedule = useMemo(
    () => (open ? debouncedGetSchedule() : EMPTY_SCHEDULE),
    [open, debouncedGetSchedule],
  );
  const rows = view === 'monthly' ? schedule.monthly : schedule.annual;
  const periodColumnLabel =
    view === 'monthly'
      ? copy['paymentScheduleSection.columnMonth']
      : copy['paymentScheduleSection.columnYear'];
  const toggleButtonLabel =
    view === 'monthly'
      ? copy['paymentScheduleSection.showAnnualButton']
      : copy['paymentScheduleSection.showMonthlyButton'];

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="min-w-0 border-t border-brand-border"
    >
      <div
        className={cn(
          'flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold transition-[border-radius] duration-200 hover:brightness-95',
          toneClasses[tone],
          !open && 'rounded-b-2xl',
        )}
      >
        <CollapsibleTrigger className="flex-1 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
          {copy['paymentScheduleSection.triggerButton']}
        </CollapsibleTrigger>
        <div className="flex items-center gap-3">
          {open && (
            <button
              type="button"
              onClick={() => setView(view === 'monthly' ? 'annual' : 'monthly')}
              className="rounded-md border border-current/30 px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-current/10"
            >
              {toggleButtonLabel}
            </button>
          )}
          <CollapsibleTrigger
            aria-label={copy['paymentScheduleSection.triggerButton']}
            className="outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <ChevronDownIcon
              className={cn(
                'size-4 shrink-0 transition-transform duration-200',
                open && 'rotate-180',
              )}
            />
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="min-w-0 overflow-hidden rounded-b-2xl">
        <div className="max-h-85 min-w-0 overflow-auto">
          <table className="w-full min-w-0 text-left text-xs xs:text-sm">
            <caption className="sr-only">
              {copy['paymentScheduleSection.captionSr']}
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky top-0 bg-background py-2 pr-2.5 pl-5"
                >
                  {periodColumnLabel}
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-background px-2.5 py-2"
                >
                  {copy['paymentScheduleSection.columnInterest']}
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-background px-2.5 py-2"
                >
                  {copy['paymentScheduleSection.columnPrincipal']}
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-background py-2 pr-5 pl-2.5"
                >
                  {copy['paymentScheduleSection.columnBalance']}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <th
                    scope="row"
                    className="py-1 pr-2.5 pl-5 font-normal whitespace-nowrap"
                  >
                    {row.period}
                  </th>
                  <td className="px-2.5 py-1">{row.interest}</td>
                  <td className="px-2.5 py-1">{row.principal}</td>
                  <td className="py-1 pr-5 pl-2.5">{row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
