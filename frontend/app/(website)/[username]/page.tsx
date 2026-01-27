import StreamOverview from '@/components/features/streams/overview/StreamOverview';
import {
  FindChannelByUsernameDocument,
  type FindChannelByUsernameQuery,
} from '@/graphql/gql/graphql';
import { SERVER_URL } from '@/shared/constants/url.constants';
import { getMediaSource } from '@/shared/utils/get-media-source.util';
import { LiveKitRoom } from '@livekit/components-react';
import { print } from 'graphql';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

async function findChannelByUsername(params: { username: string }) {
  try {
    const query = print(FindChannelByUsernameDocument);
    const variables = { username: params.username };

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
      channel: data.data
        .findChannelByUsername as FindChannelByUsernameQuery['findChannelByUsername'],
    };
  } catch {
    notFound();
  }
}

export async function generateMetadata(props: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { channel } = await findChannelByUsername(params);

  return {
    title: channel.username,
    openGraph: {
      images: [
        {
          url: getMediaSource(channel.avatar),
          alt: channel.displayName,
        },
      ],
    },
  };
}

export default async function ChannelPage(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;

  const { channel } = await findChannelByUsername(params);

  return (
    <StreamOverview channel={channel}/>
  );
}
