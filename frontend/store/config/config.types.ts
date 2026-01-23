import { type TypeBaseColor } from '@/shared/constants/colors.constants';

export interface ConfigStore {
  theme: TypeBaseColor;
  setTheme: (newTheme: TypeBaseColor) => void;
}
