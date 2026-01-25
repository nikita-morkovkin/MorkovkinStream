'use client';

import { Button } from '@/components/ui/common/Button';
import { DataTable } from '@/components/ui/common/DataTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/common/DropdownMenu';
import ChannelAvatar from '@/components/ui/elements/ChannelAvatar';
import ChannelVerified from '@/components/ui/elements/ChannelVerified';
import Heading from '@/components/ui/elements/Heading';
import DataTableSkeleton from '@/components/ui/skeletons/DataTableSkeleton';
import {
  FindAllMySponsorsDocument,
  type FindAllMySponsorsQuery,
} from '@/graphql/gql/graphql';
import { useFormatDateWithTranslations } from '@/shared/hooks/useFormatDateWithTranslations';
import { useQuery } from '@apollo/client/react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const SponsorsTable = () => {
  const t = useTranslations('dashboard.sponsors');
  const formatDate = useFormatDateWithTranslations();

  const { data, loading: isLoadingSponsors } = useQuery(
    FindAllMySponsorsDocument,
  );
  const sponsors = data?.findAllMySponsors ?? [];

  const sponsorsColumns: ColumnDef<
    FindAllMySponsorsQuery['findAllMySponsors'][0]
  >[] = [
    {
      accessorKey: 'expiresAt',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span className='font-semibold'>{t('columns.date')}</span>
            <ArrowUpDown className='ml-2 size-4' />
          </Button>
        );
      },
      cell: ({ row }) => formatDate(row.original.expiresAt),
    },
    {
      accessorKey: 'user',
      header: t('columns.user'),
      cell: ({ row }) => (
        <div className='flex items-center gap-x-2'>
          <ChannelAvatar channel={row.original.user} size={'sm'} />
          <h2>{row.original.user.username}</h2>
          {row.original.user.isVerified && <ChannelVerified size={'sm'} />}
        </div>
      ),
    },
    {
      accessorKey: 'plan.title',
      id: 'planTitle',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span className='font-semibold'>{t('columns.plan')}</span>
            <ArrowUpDown className='ml-2 size-4' />
          </Button>
        );
      },
      cell: ({ row }) => row.original.plan.title,
    },
    {
      accessorKey: 'actions',
      header: t('columns.actions'),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className='size-8 p-0'>
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='right'>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link target='_blank' href={`/${row.original.user.username}`}>
                <User className='mr-2 size-4' />
                {t('columns.viewChannel')}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className='lg:px-10'>
      <Heading
        title={t('header.heading')}
        description={t('header.description')}
        size={'large'}
      />
      <div className='mt-6'>
        {isLoadingSponsors ? (
          <DataTableSkeleton />
        ) : (
          <DataTable
            columns={sponsorsColumns}
            data={sponsors}
            filterKeys={[
              { id: 'expiresAt', title: t('columns.date') },
              { id: 'planTitle', title: t('columns.plan') },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default SponsorsTable;
