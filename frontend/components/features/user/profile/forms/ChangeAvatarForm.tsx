'use client';

import { Button } from '@/components/ui/common/Button';
import { Form, FormField } from '@/components/ui/common/Form';
import ChannelAvatar from '@/components/ui/elements/ChannelAvatar';
import ConfirmModal from '@/components/ui/elements/ConfirmModal';
import FormWrapper from '@/components/ui/elements/FormWrapper';
import {
  ChangeProfileAvatarDocument,
  RemoveProfileAvatarDocument,
} from '@/graphql/gql/graphql';
import {
  uploadFileSchema,
  type TypeUploadFileSchema,
} from '@/schemas/file/upload-file.schema';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { cn } from '@/shared/utils/tw-merge.util';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ChangeAvatarFormSkeleton from '../skeletons/ChangeAvatarFormSkeleton';

const ChangeAvatarForm = () => {
  const t = useTranslations('dashboard.settings.profile.avatar');
  const { user, isLoadingProfile, refetch } = useCurrentProfile();
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const inputRef = useRef<HTMLInputElement>(null);

  const [updateAvatar, { loading: isLoadingUpdate }] = useMutation(
    ChangeProfileAvatarDocument,
    {
      onCompleted() {
        refetch();
        toast.success(t('successUpdateMessage'));
      },
      onError() {
        toast.error(t('errorMessage'));
      },
    },
  );

  const [removeAvatar, { loading: isLoadingRemove }] = useMutation(
    RemoveProfileAvatarDocument,
    {
      onCompleted() {
        refetch();
        toast.success(t('successRemoveMessage'));
      },
      onError() {
        toast.error(t('errorRemoveMessage'));
      },
    },
  );

  const form = useForm<TypeUploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      // It is just for TS
      file: user?.avatar || undefined,
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      form.setValue('file', file);
      updateAvatar({ variables: { avatar: file } });
    }
  };

  return isLoadingProfile ? (
    <ChangeAvatarFormSkeleton />
  ) : (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <div className='px-5 pb-5'>
              <div className='w-full items-center lg:flex space-x-6'>
                <ChannelAvatar
                  channel={{
                    username: user?.username ?? '',
                    avatar:
                      field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : field.value,
                  }}
                  size={'xl'}
                />
                <div className='space-y-3'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      type='file'
                      className='hidden'
                      ref={inputRef}
                      onChange={handleImageChange}
                    />
                    <Button
                      className={cn(isMobile ? 'mt-5 mb-2' : '')}
                      variant={'secondary'}
                      onClick={() => inputRef.current?.click()}
                      disabled={isLoadingUpdate || isLoadingRemove}
                    >
                      <p className='font-semibold'>{t('updateButton')}</p>
                    </Button>
                    {user?.avatar && (
                      <ConfirmModal
                        heading={t('confirmModal.heading')}
                        message={t('confirmModal.message')}
                        onConfirm={() => removeAvatar()}
                      >
                        <Button
                          className={cn(isMobile ? 'mt-[12px] ml-1' : '')}
                          variant={'ghost'}
                          size={'lgIcon'}
                          disabled={isLoadingUpdate || isLoadingRemove}
                        >
                          <Trash className='size-4.5' />
                        </Button>
                      </ConfirmModal>
                    )}
                  </div>
                  <p className='text-sm ml-1 text-muted-foreground'>
                    {t('info')}
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </Form>
    </FormWrapper>
  );
};

export default ChangeAvatarForm;
