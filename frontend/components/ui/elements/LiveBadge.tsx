'use client';

import { useTranslations } from 'next-intl';

const LiveBadge = () => {
  const t = useTranslations('components.liveBadge');

  return (
    <div
      className={`
        rounded-full bg-rose-500 p-0.5 text-center px-2 
        text-xs font-semibold text-white tracking-wide`}
    >
      {t('text')}
    </div>
  );
};

export default LiveBadge;
