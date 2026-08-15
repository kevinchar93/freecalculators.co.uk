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

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const yearsPart = years > 0 ? `${years} year${years === 1 ? '' : 's'}` : '';
  const monthsPart =
    remainingMonths > 0
      ? `${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`
      : '';

  return [yearsPart, monthsPart].filter(Boolean).join(', ');
}
