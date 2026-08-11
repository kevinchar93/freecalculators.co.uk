import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { ScheduleRow } from '../types';

export function PaymentScheduleSection({ rows }: { rows: ScheduleRow[] }) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between"
        >
          Payment Schedule
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 max-h-85 overflow-auto rounded-md border border-brand-border">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Payment amortisation schedule</caption>
          <thead>
            <tr>
              <th scope="col" className="px-3 py-2">
                Month
              </th>
              <th scope="col" className="px-3 py-2">
                Interest
              </th>
              <th scope="col" className="px-3 py-2">
                Principal
              </th>
              <th scope="col" className="px-3 py-2">
                Balance
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
