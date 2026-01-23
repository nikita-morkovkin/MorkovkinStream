'use client';

import { Button } from '@/components/ui/common/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/common/Form';
import { Input } from '@/components/ui/common/Input';
import { Separator } from '@/components/ui/common/Separator';
import { Textarea } from '@/components/ui/common/Textarea';
import FormWrapper from '@/components/ui/elements/FormWrapper';
import { ChangeProfileInfoDocument } from '@/graphql/gql/graphql';
import {
  changeInfoUserSchema,
  type TypeChangeInfoUserSchema,
} from '@/schemas/user/change-info-user.schema';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ChangeInfoProfileSkeleton from '../skeletons/ChangeInfoProfileSkeleton';

const ChangeInfoForm = () => {
  const t = useTranslations('dashboard.settings.profile.info');
  const { user, isLoadingProfile, refetch } = useCurrentProfile();

  const form = useForm<TypeChangeInfoUserSchema>({
    resolver: zodResolver(changeInfoUserSchema),
    values: {
      username: user?.username || '',
      displayName: user?.username || '',
      bio: user?.bio || '',
    },
  });

  const [updateUserInfo, { loading: isUserInfoLoading }] = useMutation(
    ChangeProfileInfoDocument,
    {
      onCompleted() {
        refetch();
        toast.success(t('successMessage'));
      },
      onError() {
        toast.error(t('errorMessage'));
      },
    },
  );

  const { isValid, isDirty } = form.formState;

  const handleSubmit = (data: TypeChangeInfoUserSchema) => {
    updateUserInfo({ variables: { data } });
  };

  return isLoadingProfile ? (
    <ChangeInfoProfileSkeleton />
  ) : (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='grid gap-y-6 ml-5.5 mr-[8px]'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('usernameLabel')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('usernamePlaceholder')}
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <Separator />

          <FormField
            control={form.control}
            name='displayName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('displayNameLabel')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('displayNamePlaceholder')}
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <Separator />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('bioLabel')}
                </FormLabel>
                <FormControl>
                  <Textarea placeholder={t('bioPlaceholder')} {...field} />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />

          <div className='flex justify-end pt-5 pr-0.5 pb-3'>
            <Button
              className='bg-(--primary)'
              disabled={
                !isValid || !isDirty || isLoadingProfile || isUserInfoLoading
              }
            >
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default ChangeInfoForm;
