import {
  Banknote,
  DollarSign,
  KeyRound,
  Medal,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import SidebarItem from './SidebarItem';
import { type RouteItem } from './types/route.interface';

const DashboardNav = () => {
  const t = useTranslations('dashboardNav');
  const routes: RouteItem[] = [
    {
      label: t('settings'),
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      label: t('keys'),
      href: '/dashboard/keys',
      icon: KeyRound,
    },
    {
      label: t('chatSettings'),
      href: '/dashboard/chat',
      icon: MessageSquare,
    },
    {
      label: t('followers'),
      href: '/dashboard/followers',
      icon: Users,
    },
    {
      label: t('sponsors'),
      href: '/dashboard/sponsors',
      icon: Medal,
    },
    {
      label: t('premium'),
      href: '/dashboard/plans',
      icon: DollarSign,
    },
    {
      label: t('transactions'),
      href: '/dashboard/transactions',
      icon: Banknote,
    },
  ];

  return (
    <div className='space-y-2 px-2 pt-4 lg:pt-0'>
      {routes.map(route => (
        <SidebarItem key={route.href} route={route} />
      ))}
    </div>
  );
};

export default DashboardNav;
