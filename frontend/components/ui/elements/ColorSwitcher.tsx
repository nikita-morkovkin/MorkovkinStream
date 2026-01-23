'use client';

import useConfig from '@/shared/hooks/useConfig';
import { useEffect } from 'react';

const ColorSwitcher = () => {
  const { theme } = useConfig();

  useEffect(() => {
    document.body.classList.forEach(className => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className);
      }
    });

    if (theme) {
      return document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return null;
};

export default ColorSwitcher;
