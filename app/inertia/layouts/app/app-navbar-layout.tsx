import { urlFor } from '@/client';
import { AppContent } from '@/components/app-content';
import { NavBar } from '@/components/nav-bar';
import { NavFooter } from '@/components/nav-footer';
import type { AppLayoutProps, NavItem } from '@/types';

const mainNavItems: NavItem[] = [
  { title: 'Calculators', href: urlFor('calculators') },
  { title: 'Blog', href: urlFor('blog') },
];

const footerNavItems: NavItem[] = [
  { title: 'About Us', href: urlFor('about-us') },
  { title: 'Privacy Policy', href: urlFor('privacy-policy') },
  { title: 'Terms of Service', href: urlFor('terms-of-service') },
];

export default function AppNavbarLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavBar items={mainNavItems} />
      <AppContent variant="header">{children}</AppContent>
      <NavFooter items={footerNavItems} className="mt-auto" />
    </div>
  );
}
