'use client';

import { FindRandomCategoriesQuery } from '@/graphql/gql/graphql';
import { useSidebar } from '@/shared/hooks/useSidebar';
import { getMediaSource } from '@/shared/utils/get-media-source.util';
import { getRandomColor } from '@/shared/utils/get-random-color';
import { cn } from '@/shared/utils/tw-merge.util';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  category: FindRandomCategoriesQuery['findRandomCategories'][0];
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { isOpen } = useSidebar();
  const randomColor = getRandomColor(category.title);

  return (
    <Link
      href={`/category/${category.slug}`}
      className='h-full w-full space-y-3'
    >
      <div
        className={cn(
          'group relative cursor-pointer rounded-xl',
          isOpen ? 'h-70' : 'h-78',
        )}
      >
        <div
          className='absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100'
          style={{ backgroundColor: randomColor }}
        />
        <Image
          src={getMediaSource(category.thumbnailUrl)}
          alt={category.title}
          fill
          className={`rounded-lg object-cover transition-transform
          group-hover:-translate-y-2 group-hover:translate-x-2`}
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
