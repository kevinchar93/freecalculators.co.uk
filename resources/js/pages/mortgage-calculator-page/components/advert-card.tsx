import { Card } from '@/components/ui/card';

interface AdvertCardProps {
  heading: string;
  body: string;
  linkText: string;
  linkHref: string;
}

export function AdvertCard({}: AdvertCardProps) {
  return (
    <Card className="flex min-h-40 items-center justify-center rounded-2xl border-brand-border bg-brand-subtle p-5 text-center">
      <p className="text-lg text-neutral-400 italic dark:text-neutral-500">
        Advert
      </p>
    </Card>
  );
}
