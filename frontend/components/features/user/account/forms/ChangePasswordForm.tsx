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
import { ChangePasswordUserDocument } from '@/graphql/gql/graphql';
import {
  changePasswordUserSchema,
  type TypeChangePasswordUserSchema,
} from '@/schemas/user/change-password.schema';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ChangePasswordSkeleton from '../skeletons/ChangePasswordSkeleton';

const ChangeEmailForm = () => {
  const t = useTranslations('dashboard.settings.account.password');

  const [updatePassword, { loading: isLoadingUpdatePassword }] = useMutation(
    ChangePasswordUserDocument,
    {
      onCompleted() {
        toast.success(t('successMessage'));
      },
      onError() {
        toast.error(t('errorMessage'));
      },
    },
  );

  const form = useForm<TypeChangePasswordUserSchema>({
    resolver: zodResolver(changePasswordUserSchema),
    values: {
      newPassword: '',
      oldPassword: '',
    },
  });

  const { isValid, isDirty } = form.formState;

  const handleSubmit = (data: TypeChangePasswordUserSchema) => {
    updatePassword({ variables: { data: data } });
    form.reset();
  };

  return isLoadingUpdatePassword ? (
    <ChangePasswordSkeleton />
  ) : (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='grid gap-y-6 ml-5.5 mr-[8px]'
        >
          <FormField
            control={form.control}
            name='oldPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('oldPasswordLabel')}
                </FormLabel>
                <FormControl>
                  <Input placeholder='********' type='password' {...field} />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('newPasswordLabel')}
                </FormLabel>
                <FormControl>
                  <Input placeholder='********' type='password' {...field} />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />

          <Separator />

          <div className='flex justify-end pt-2 pr-0.5 pb-3'>
            <Button disabled={!isValid || !isDirty || isLoadingUpdatePassword}>
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default ChangeEmailForm;
