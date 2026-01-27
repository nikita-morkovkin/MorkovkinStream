'use client';

import { Skeleton } from '@/components/ui/common/Skeleton';
import {
  type FindAllCategoriesQuery,
  type FindRandomCategoriesQuery,
} from '@/graphql/gql/graphql';
import { useSidebar } from '@/shared/hooks/useSidebar';
import { getMediaSource } from '@/shared/utils/get-media-source.util';
import { getRandomColor } from '@/shared/utils/get-random-color';
import { cn } from '@/shared/utils/tw-merge.util';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface CategoryCardProps {
  category:
    | FindRandomCategoriesQuery['findRandomCategories'][0]
    | FindAllCategoriesQuery['findAllCategories'][0];
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { isOpen } = useSidebar();
  const [isLoaded, setIsLoaded] = useState(false);
  const randomColor = getRandomColor(category.title);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className='h-full w-full space-y-3'
    >
      <div
        className={cn(
          'group relative cursor-pointer rounded-xl',
          isOpen ? 'h-70' : 'h-66',
        )}
      >
        <div
          className='absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100'
          style={{ backgroundColor: randomColor }}
        />
        {!isLoaded && (
          <Skeleton className='absolute inset-0 h-full w-full rounded-lg transition-transform group-hover:-translate-y-2 group-hover:translate-x-2' />
        )}
        <Image
          src={getMediaSource(category.thumbnailUrl)}
          alt={category.title}
          fill
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'rounded-lg object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2',
            !isLoaded && 'opacity-0',
          )}
        />
      </div>
      <div>
        <h2 className='truncate text-base font-semibold text-foreground hover:text-primary'>
          {category.title}
        </h2>
      </div>
    </Link>
  );
};

export default CategoryCard;
