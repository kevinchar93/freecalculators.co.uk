import copy from '../copy.json';

const toneClasses = {
  brand: 'bg-brand-subtle text-brand-subtle-foreground',
  neutral:
    'bg-neutral-100 text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300',
} as const;

export function RepaymentVehicleNotice({
  loanAmount,
  tone = 'brand',
}: {
  loanAmount: string;
  tone?: 'brand' | 'neutral';
}) {
  const [before, after] =
    copy['repaymentVehicleNotice.text'].split('{loanAmount}');

  return (
    <div className={`rounded-md p-3 text-sm ${toneClasses[tone]}`}>
      <p>
        {before}
        <span className="font-bold">{loanAmount}</span>
        {after}
      </p>
    </div>
  );
}
