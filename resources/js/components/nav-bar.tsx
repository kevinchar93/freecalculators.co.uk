import { Link } from '@inertiajs/react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useAppearance } from '@/hooks/use-appearance';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import type { NavItem } from '@/types';

type Props = {
  items?: NavItem[];
  searchPlaceholder?: string;
  className?: string;
};

export function NavBar({
  items = [],
  searchPlaceholder = 'Search calculators...',
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { isCurrentUrl } = useCurrentUrl();
  const { resolvedAppearance, updateAppearance } = useAppearance();

  return (
    <nav
      className={cn(
        'border-b border-sidebar-border/80 bg-white dark:bg-neutral-950',
        className,
      )}
    >
      <div className="mx-auto max-w-240 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo */}
          <Link href={home()} prefetch className="flex items-center font-logo">
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              freecalculators
            </span>
            <span className="text-lg font-bold text-brand">.co.uk</span>
          </Link>

          {/* Desktop Navigation + Search + Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden gap-8 md:flex">
              <div className="flex items-stretch gap-6">
                {items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      '-mb-px inline-flex items-center border-b-2 text-sm font-medium transition-colors',
                      isCurrentUrl(item.href)
                        ? 'border-brand text-brand'
                        : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-white',
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <div className="relative flex items-center">
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="w-64 rounded-full bg-neutral-100 pr-9 pl-4 focus-visible:ring-brand dark:bg-neutral-900"
                />
                <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() =>
                updateAppearance(
                  resolvedAppearance === 'dark' ? 'light' : 'dark',
                )
              }
              className="hidden items-center text-neutral-600 hover:text-neutral-900 md:flex dark:text-neutral-400 dark:hover:text-white"
            >
              <span className="sr-only">
                {resolvedAppearance === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'}
              </span>
              {resolvedAppearance === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                <span className="sr-only">
                  {isOpen ? 'Close menu' : 'Open menu'}
                </span>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isOpen && (
          <div className="-mx-4 border-t border-sidebar-border/80 py-4 sm:-mx-6 md:hidden lg:-mx-8">
            <div className="flex items-center gap-2 px-4 sm:px-6 lg:px-8">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-full rounded-full bg-neutral-100 pr-9 pl-4 focus-visible:ring-brand dark:bg-neutral-900"
                />
                <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              </div>

              <button
                type="button"
                onClick={() =>
                  updateAppearance(
                    resolvedAppearance === 'dark' ? 'light' : 'dark',
                  )
                }
                className="flex shrink-0 items-center text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                <span className="sr-only">
                  {resolvedAppearance === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'}
                </span>
                {resolvedAppearance === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'border-l-4 px-4 py-2 text-base font-medium transition-colors sm:px-6 lg:px-8',
                    isCurrentUrl(item.href)
                      ? 'border-brand bg-brand-subtle text-brand'
                      : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-900 dark:hover:text-white',
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
