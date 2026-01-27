import CategoriesList from '@/components/features/category/list/CategoriesList';
import {
  FindAllCategoriesDocument,
  FindAllCategoriesQuery,
} from '@/graphql/gql/graphql';
import { SERVER_URL } from '@/shared/constants/url.constants';
import { print } from 'graphql';
import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

async function findAllCategories() {
  try {
    const query = print(FindAllCategoriesDocument);

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();

    return {
      categories: data.data
        .findAllCategories as FindAllCategoriesQuery['findAllCategories'],
    };
  } catch {
    return {
      categories: [],
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('categories');

  return {
    title: t('heading'),
    description: t('description'),
  };
}

export default async function CategoriesPage() {
  const t = await getTranslations('userNav');
  const { categories } = await findAllCategories();

  return (
    <div className=''>
      <CategoriesList heading={t('categories')} categories={categories} />
    </div>
  );
}
