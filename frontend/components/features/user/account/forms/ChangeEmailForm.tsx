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
import FormWrapper from '@/components/ui/elements/FormWrapper';
import { ChangeEmailUserDocument } from '@/graphql/gql/graphql';
import {
  changeEmailUserSchema,
  type TypeChangeEmailUserSchema,
} from '@/schemas/user/change-email.schema';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ChangeEmailSkeleton from '../skeletons/ChangeEmailSkeleton';

const ChangeEmailForm = () => {
  const t = useTranslations('dashboard.settings.account.email');
  const { user, isLoadingProfile, refetch } = useCurrentProfile();

  const [changeEmail, { loading: isLoadingChange }] = useMutation(
    ChangeEmailUserDocument,
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

  const form = useForm<TypeChangeEmailUserSchema>({
    resolver: zodResolver(changeEmailUserSchema),
    values: {
      email: user?.email || '',
    },
  });

  const { isValid, isDirty } = form.formState;

  const handleSubmit = (data: TypeChangeEmailUserSchema) => {
    changeEmail({ variables: { data: data } });
  };

  return isLoadingProfile ? (
    <ChangeEmailSkeleton />
  ) : (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='grid gap-y-6 ml-5.5 mr-[8px]'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('emailLabel')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='nikitamorkovkin@gmail.com'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <Separator />
          <div className='flex justify-end pt-2 pr-0.5 pb-3'>
            <Button
              className='bg-(--primary)'
              disabled={
                !isValid || !isDirty || isLoadingChange || isLoadingProfile
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

export default ChangeEmailForm;
