import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { TuyauProvider } from '@adonisjs/inertia/react';
import { createInertiaApp } from '@inertiajs/react';
import type { ResolvedComponent } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { client } from '@/client';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';

const appName = import.meta.env.VITE_APP_NAME || 'freecalculators.co.uk';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob<{ default: ResolvedComponent }>([
        './pages/**/*.tsx',
        '!./pages/**/*.test.tsx',
        '!./pages/**/components/**',
      ]),
    );

    return page.default;
  },
  layout: (name) => {
    switch (true) {
      case name === 'home':
        return null;
      default:
        return AppLayout;
    }
  },
  strictMode: true,
  setup({ el, App, props }) {
    createRoot(el!).render(
      <TuyauProvider client={client}>
        <TooltipProvider delayDuration={0}>
          <App {...props} />
          <Toaster />
        </TooltipProvider>
      </TuyauProvider>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});

// This will set light / dark mode on load...
initializeTheme();
