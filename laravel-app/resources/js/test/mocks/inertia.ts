import type * as InertiaReact from '@inertiajs/react';
import { createElement } from 'react';
import type { ReactNode } from 'react';
import { vi } from 'vitest';

vi.mock('@inertiajs/react', async () => {
  const actual = await vi.importActual<typeof InertiaReact>('@inertiajs/react');

  return {
    ...actual,
    Head: () => null,
    Link: ({
      href,
      children,
      ...props
    }: {
      href: unknown;
      children?: ReactNode;
    }) => {
      const url =
        typeof href === 'string' ? href : (href as { url?: string })?.url;

      return createElement('a', { href: url, ...props }, children);
    },
  };
});
