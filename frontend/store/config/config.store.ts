import { type TypeBaseColor } from '@/shared/constants/colors.constants';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type ConfigStore } from './config.types';

export const useConfigStore = create<ConfigStore>()(
  persist(
    set => ({
      theme: 'turquoise',
      setTheme: (newTheme: TypeBaseColor) => set({ theme: newTheme }),
    }),
    {
      name: 'config',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
