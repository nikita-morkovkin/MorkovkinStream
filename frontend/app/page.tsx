'use client';

import { Button } from '@/components/ui/common/Button';
import {
  FindChannelByUsernameDocument,
  FindChannelByUsernameQuery,
  FindChannelByUsernameQueryVariables,
} from '@/graphql/gql/graphql';
import { useQuery } from '@apollo/client/react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  const { data, loading, error } = useQuery<
    FindChannelByUsernameQuery,
    FindChannelByUsernameQueryVariables
  >(FindChannelByUsernameDocument, {
    variables: {
      username: 'milana',
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>GraphQL Test</h1>
      <p className='text-center text-black text-2xl'>{t('title')}</p>

      <Button>Default</Button>
      <Button variant={'ghost'}>Ghost</Button>
      <Button variant={'outline'}>Outline</Button>
      <Button variant={'secondary'}>Secondary</Button>

      {data?.findChannelByUsername ? (
        <div className='mt-4'>
          <p>Users Email: {data.findChannelByUsername.email}</p>
          <p>Username: {data.findChannelByUsername.username}</p>
          <p>Avatar: {data.findChannelByUsername.avatar ?? 'No avatar'}</p>
        </div>
      ) : (
        <p className='mt-4'>User not found</p>
      )}
    </div>
  );
}
