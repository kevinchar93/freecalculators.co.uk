import copy from '../copy.json';

export function PaymentBreakdownBar({
  principalPercent,
  interestPercent,
  principalPercentLabel,
  interestPercentLabel,
  barClassName,
}: {
  principalPercent: number;
  interestPercent: number;
  principalPercentLabel: string;
  interestPercentLabel: string;
  barClassName: string;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">
        {copy['paymentBreakdown.heading']}
      </h3>
      <div
        role="img"
        aria-label={`${copy['paymentBreakdown.principalPrefix']} ${principalPercentLabel}, ${copy['paymentBreakdown.interestPrefix']} ${interestPercentLabel}`}
        className="flex h-2 w-full overflow-hidden rounded-full"
      >
        <span
          className={barClassName}
          style={{ width: `${principalPercent}%` }}
        />
        <span
          className="bg-neutral-300 dark:bg-neutral-600"
          style={{ width: `${interestPercent}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span>
          {copy['paymentBreakdown.principalPrefix']} {principalPercentLabel}
        </span>
        <span>
          {copy['paymentBreakdown.interestPrefix']} {interestPercentLabel}
        </span>
      </div>
    </div>
  );
}
