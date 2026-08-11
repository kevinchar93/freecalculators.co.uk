export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatMonthYear(period: string): string {
  const [year, month] = period.split('-').map(Number);

  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function formatShortMonthYear(period: string): string {
  const [year, month] = period.split('-').map(Number);

  return `${MONTH_NAMES[month - 1]} '${String(year).slice(-2)}`;
}

export function formatGBP(value: number): string {
  return `£${Math.round(value).toLocaleString('en-GB')}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
