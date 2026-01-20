'use client';

import { Button } from '@/components/ui/common/Button';
import Hint from '@/components/ui/elements/Hint';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils/tw-merge.util';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RouteItem } from './types/route.interface';

interface SidebarItemProps {
  route: RouteItem;
}

const SidebarItem = ({ route }: SidebarItemProps) => {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  const isActive = pathname === route.href;

  if (isOpen) {
    return (
      <Button
        asChild
        className={cn(
          'h-11 w-full justify-start px-4',
          isActive && 'bg-accent text-accent-foreground',
        )}
        variant={'ghost'}
      >
        <Link href={route.href} className='flex items-center gap-x-3'>
          <route.icon className='size-5' />
          <span className='truncate font-semibold'>{route.label}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Hint label={route.label} side='right' asChild>
      <Button
        asChild
        className={cn(
          'h-11 w-full justify-center',
          isActive && 'bg-accent text-accent-foreground',
        )}
        variant={'ghost'}
      >
        <Link href={route.href}>
          <route.icon className='size-5' />
        </Link>
      </Button>
    </Hint>
  );
};

export default SidebarItem;
