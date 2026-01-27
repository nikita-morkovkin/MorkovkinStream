import StreamsContent from '@/components/features/streams/list/StreamsContent';
import {
  FindAllStreamsDocument,
  FindAllStreamsQueryVariables,
} from '@/graphql/gql/graphql';
import { SERVER_URL } from '@/shared/constants/url.constants';
import { print } from 'graphql';
import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

async function findAllStreams() {
  try {
    const query = print(FindAllStreamsDocument);
    const variables: FindAllStreamsQueryVariables = {
      filters: {},
    };

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

    const json = await response.json();
    const list = json?.data?.findAllStreams;

    return {
      streams: list,
    };
  } catch {
    notFound();
  }
}

export async function generateMetadata(props: {
  searchParams: Promise<{ searchTerm: string }>;
}): Promise<Metadata> {
  const t = await getTranslations('streams');
  const searchParams = await props.searchParams;

  return {
    title: searchParams.searchTerm
      ? `${t('searchHeading')} "${searchParams.searchTerm}"`
      : t('heading'),
    description: t('description'),
  };
}

export default async function StreamsPage() {
  const t = await getTranslations('streams');
  const { streams } = await findAllStreams();

  return <StreamsContent streams={streams} />;
}
