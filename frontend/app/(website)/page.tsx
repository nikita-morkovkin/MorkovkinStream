import CategoriesList from '@/components/features/category/list/CategoriesList';
import StreamsList from '@/components/features/streams/list/StreamsList';
import {
  FindRandomCategoriesDocument,
  FindRandomCategoriesQuery,
  FindRandomStreamsDocument,
  FindRandomStreamsQuery,
} from '@/graphql/gql/graphql';
import { SERVER_URL } from '@/shared/constants/url.constants';
import { print } from 'graphql';
import { getTranslations } from 'next-intl/server';

async function findRandomStreams() {
  try {
    const query = print(FindRandomStreamsDocument);

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
      streams: data.data
        .getRandomFourStreams as FindRandomStreamsQuery['getRandomFourStreams'],
    };
  } catch (error) {
    console.error(error);
    return { streams: [] };
  }
}

async function findRandomCategories() {
  try {
    const query = print(FindRandomCategoriesDocument);

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
        .findRandomCategories as FindRandomCategoriesQuery['findRandomCategories'],
    };
  } catch (error) {
    console.error(error);
    return { categories: [] };
  }
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const [{ streams }, { categories }] = await Promise.all([
    findRandomStreams(),
    findRandomCategories(),
  ]);

  return (
    <div className='space-y-10'>
      <StreamsList heading={t('streamsHeading')} streams={streams} />
      <CategoriesList
        heading={t('categoriesHeading')}
        categories={categories}
      />
    </div>
  );
}
