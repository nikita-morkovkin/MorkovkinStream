'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Logo = () => {
  const t = useTranslations('layout.logo');

  return (
    <Link
      href={'/'}
      className='flex ml-4 items-center gap-x-4 transition-opacity hover:opacity-75'
    >
      <svg
        width={35}
        height={35}
        viewBox='0 0 512 512'
        xmlns='http://www.w3.org/2000/svg'
        className='text-(--primary) fill-current'
      >
        <g transform='translate(0,512) scale(0.1,-0.1)'>
          <path d='M278 4671 l-168 -448 0 -1776 0 -1777 613 -2 612 -3 3 -333 2 -332 333 0 332 0 335 335 335 335 500 0 500 0 668 668 667 667 0 1558 0 1557 -2282 0 -2283 0 -167 -449z m4282 -1218 l0 -1228 -387 -387 -388 -388 -610 0 -610 0 -330 -330 c-181 -182 -333 -330 -337 -330 -5 0 -8 149 -8 330 l0 330 -500 0 -500 0 0 1615 0 1615 1835 0 1835 0 0 -1227z' />
          <path d='M2110 3115 l0 -665 225 0 225 0 0 665 0 665 -225 0 -225 0 0 -665z' />
          <path d='M3340 3115 l0 -665 220 0 220 0 0 665 0 665 -220 0 -220 0 0 -665z' />
        </g>
      </svg>
      <div className='hidden leading-tight lg:block'>
        <h2 className='text-lg font-semibold tracking-wider text-accent-foreground'>
          Nexa
        </h2>
        <p className='text-sm text-muted-foreground'>{t('platform')}</p>
      </div>
    </Link>
  );
};

export default Logo;
