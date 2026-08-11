import copy from '../copy.json';

export function RepaymentVehicleNotice({ loanAmount }: { loanAmount: string }) {
  const [before, after] =
    copy['repaymentVehicleNotice.text'].split('{loanAmount}');

  return (
    <div className="rounded-md bg-brand-subtle p-3 text-sm text-brand-subtle-foreground">
      {before}
      {loanAmount}
      {after}
    </div>
  );
}
