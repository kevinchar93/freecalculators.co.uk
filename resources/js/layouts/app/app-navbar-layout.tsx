import { AppContent } from '@/components/app-content';
import { NavBar } from '@/components/nav-bar';
import { NavFooter } from '@/components/nav-footer';
import {
  aboutUs,
  blog,
  calculators,
  privacyPolicy,
  termsOfService,
} from '@/routes';
import type { AppLayoutProps, NavItem } from '@/types';

const mainNavItems: NavItem[] = [
  { title: 'Calculators', href: calculators() },
  { title: 'Blog', href: blog() },
];

const footerNavItems: NavItem[] = [
  { title: 'About Us', href: aboutUs() },
  { title: 'Privacy Policy', href: privacyPolicy() },
  { title: 'Terms of Service', href: termsOfService() },
];

export default function AppNavbarLayout({
  children,
  breadcrumbs,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavBar items={mainNavItems} />
      <AppContent variant="header">{children}</AppContent>
      <NavFooter items={footerNavItems} className="mt-auto" />
    </div>
  );
}
