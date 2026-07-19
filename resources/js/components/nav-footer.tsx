import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

type Props = {
    items: NavItem[];
    className?: string;
};

export function NavFooter({ items, className }: Props) {
    return (
        <footer
            className={cn(
                'border-t border-brand-border bg-brand-subtle',
                className,
            )}
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-4 text-center sm:px-6 md:flex-row md:items-start md:justify-between md:text-left lg:px-8">
                <span className="font-logo text-lg font-bold text-neutral-900 dark:text-white">
                    freecalculators<span className="text-brand">.co.uk</span>
                </span>

                <div className="flex flex-col items-center gap-2 md:items-end">
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {items.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="text-sm text-neutral-600 transition-colors hover:text-brand dark:text-neutral-400"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">
                        &copy; {new Date().getFullYear()} freecalculators.co.uk.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
