import { useConfigStore } from '@/store/config/config.store';

export default function useConfig() {
  const theme = useConfigStore(state => state.theme);
  const setTheme = useConfigStore(state => state.setTheme);

  return {
    theme,
    setTheme,
  };
}
