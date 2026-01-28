'use client';

import { Skeleton } from '@/components/ui/common/Skeleton';
import Heading from '@/components/ui/elements/Heading';
import { type FindCategoryBySlugQuery } from '@/graphql/gql/graphql';
import { getMediaSource } from '@/shared/utils/get-media-source.util';
import { cn } from '@/shared/utils/tw-merge.util';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import StreamsList from '../../streams/list/StreamsList';

interface CategoryOverviewProps {
  category: FindCategoryBySlugQuery['findCategoryBySlug'];
}

const CategoryOverview = ({ category }: CategoryOverviewProps) => {
  const t = useTranslations('categories.overview');
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className='space-y-8'>
      <div className='gap-x-10 lg:items-center lg:flex lg:space-y-6'>
        <div className='relative h-[256px] w-[192px] shrink-0'>
          {!isLoaded && (
            <Skeleton className='absolute inset-0 h-full w-full rounded-xl' />
          )}
          <Image
            src={getMediaSource(category.thumbnailUrl)}
            alt={category.title}
            width={192}
            height={256}
            onLoad={() => setIsLoaded(true)}
            className={cn('rounded-xl object-cover', !isLoaded && 'opacity-0')}
          />
        </div>
        <div className='mb-5 lg:hidden' />
        <Heading
          title={category.title}
          description={category.description || ''}
          size={'xl'}
        />
      </div>
      <StreamsList heading={t('heading')} streams={category.streams} />
    </div>
  );
};

export default CategoryOverview;
