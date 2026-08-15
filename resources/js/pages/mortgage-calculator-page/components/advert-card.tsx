import { Card } from '@/components/ui/card';

interface AdvertCardProps {
  heading: string;
  body: string;
  linkText: string;
  linkHref: string;
}

export function AdvertCard({
  heading,
  body,
  linkText,
  linkHref,
}: AdvertCardProps) {
  return (
    <Card className="rounded-2xl border-brand-border bg-brand-subtle p-5">
      <p className="font-semibold">{heading}</p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{body}</p>
      <p>
        <a
          href={linkHref}
          className="text-brand-subtle-foreground underline underline-offset-4"
        >
          {linkText}
        </a>
      </p>
    </Card>
  );
}
