'use client';

import { useSidebarStore } from '@/store/sidebar/sidebar.store';

export function useSidebar() {
  const isOpen = useSidebarStore(state => state.isOpen);
  const setIsOpen = useSidebarStore(state => state.setIsOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
  };
}
