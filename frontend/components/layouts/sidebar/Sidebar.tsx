'use client';

import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils/tw-merge.util';
import { usePathname } from 'next/navigation';
import DashboardNav from './DashboardNav';
import SidebarHeader from './SidebarHeader';
import UserNav from './UserNav';

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  const isDashboardPage = pathname.includes('/dashboard');

  return (
    <aside
      className={cn(
        `fixed left-0 z-50 mt-[65px] flex h-full flex-col 
        border-r border-border bg-card transition-all duration-300`,
        isOpen ? 'w-64' : 'w-16',
      )}
    >
      <SidebarHeader />
      {isDashboardPage ? <DashboardNav /> : <UserNav />}
    </aside>
  );
};

export default Sidebar;
