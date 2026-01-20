import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type SidebarStore } from './sidebar.types';

export const useSidebarStore = create<SidebarStore>()(
  persist(
    set => ({
      isOpen: true,
      setIsOpen: (value: boolean) => set({ isOpen: value }),
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
