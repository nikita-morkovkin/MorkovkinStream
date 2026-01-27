import CategoryOverview from '@/components/features/category/overview/CategoryOverview';
import {
  FindCategoryBySlugDocument,
  FindCategoryBySlugQuery,
  FindCategoryBySlugQueryVariables,
} from '@/graphql/gql/graphql';
import { SERVER_URL } from '@/shared/constants/url.constants';
import { getMediaSource } from '@/shared/utils/get-media-source.util';
import { print } from 'graphql';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

async function findCategoryBySlug(slug: string) {
  try {
    const query = print(FindCategoryBySlugDocument);
    const variables: FindCategoryBySlugQueryVariables = { slug };

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: 30,
      },
    });

    const data = await response.json();

    return {
      category: data.data
        .findCategoryBySlug as FindCategoryBySlugQuery['findCategoryBySlug'],
    };
  } catch {
    notFound();
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await findCategoryBySlug(params.slug);

  return {
    title: data.category.title,
    description: data.category.description,
    openGraph: {
      images: {
        url: getMediaSource(data.category.thumbnailUrl),
        alt: data.category.title,
      },
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const data = await findCategoryBySlug(params.slug);

  return <CategoryOverview category={data.category} />;
}
