import { ChevronDownIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import copy from '../copy.json';
import type { ScheduleRow } from '../types';

export function PaymentScheduleSection({ rows }: { rows: ScheduleRow[] }) {
  return (
    <Collapsible className="overflow-hidden rounded-md border border-brand-border">
      <CollapsibleTrigger className="group flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50">
        {copy['paymentScheduleSection.triggerButton']}
        <ChevronDownIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="max-h-85 overflow-auto border-t border-brand-border">
        <table className="w-full text-left text-xs xs:text-sm">
          <caption className="sr-only">
            {copy['paymentScheduleSection.captionSr']}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="sticky top-0 bg-background px-3 py-2">
                {copy['paymentScheduleSection.columnMonth']}
              </th>
              <th scope="col" className="sticky top-0 bg-background px-3 py-2">
                {copy['paymentScheduleSection.columnInterest']}
              </th>
              <th scope="col" className="sticky top-0 bg-background px-3 py-2">
                {copy['paymentScheduleSection.columnPrincipal']}
              </th>
              <th scope="col" className="sticky top-0 bg-background px-3 py-2">
                {copy['paymentScheduleSection.columnBalance']}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <th
                  scope="row"
                  className="px-3 py-1 font-normal whitespace-nowrap"
                >
                  {row.period}
                </th>
                <td className="px-3 py-1">{row.interest}</td>
                <td className="px-3 py-1">{row.principal}</td>
                <td className="px-3 py-1">{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleContent>
    </Collapsible>
  );
}
