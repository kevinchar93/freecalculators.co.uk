import { ChevronDownIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import copy from '../copy.json';
import type { ScheduleRow } from '../types';

const toneClasses = {
  brand: 'bg-brand-subtle text-brand-subtle-foreground',
  neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300',
} as const;

export function PaymentScheduleSection({
  rows,
  tone = 'brand',
}: {
  rows: ScheduleRow[];
  tone?: keyof typeof toneClasses;
}) {
  return (
    <Collapsible className="min-w-0 border-t border-brand-border">
      <CollapsibleTrigger
        className={cn(
          'group flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold outline-none transition-[border-radius] duration-200 hover:brightness-95 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=closed]:rounded-b-2xl',
          toneClasses[tone],
        )}
      >
        {copy['paymentScheduleSection.triggerButton']}
        <ChevronDownIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
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
                  {copy['paymentScheduleSection.columnMonth']}
                </th>
                <th scope="col" className="sticky top-0 bg-background px-2.5 py-2">
                  {copy['paymentScheduleSection.columnInterest']}
                </th>
                <th scope="col" className="sticky top-0 bg-background px-2.5 py-2">
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
