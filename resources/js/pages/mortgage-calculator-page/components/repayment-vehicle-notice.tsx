export function RepaymentVehicleNotice({ loanAmount }: { loanAmount: string }) {
  return (
    <div className="rounded-md bg-brand-subtle p-3 text-sm text-brand-subtle-foreground">
      With interest-only, your balance of {loanAmount} stays the same throughout
      the term. You&apos;ll need a separate repayment plan in place to repay it
      in full by the end.
    </div>
  );
}
