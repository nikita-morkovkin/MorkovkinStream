'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/common/Alert';
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
import { ResetPasswordDocument } from '@/graphql/gql/graphql';
import {
  resetPasswordSchema,
  type TypeResetPasswordSchema,
} from '@/schemas/auth/reset-password.schema';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AuthWrapper from '../AuthWrapper';

const ResetPasswordForm = () => {
  const t = useTranslations('auth.resetPassword');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [resetPassword, { loading: loadingResetPassword }] = useMutation(
    ResetPasswordDocument,
  );

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = async (data: TypeResetPasswordSchema) => {
    await resetPassword({
      variables: {
        data,
      },
      onCompleted() {
        setIsSuccess(true);
      },
      onError() {
        toast.error(t('errorMessage'));
      },
    });
  };

  return (
    <AuthWrapper
      heading={t('heading')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref='/account/login'
    >
      {isSuccess ? (
        <Alert>
          <CircleCheck className='size-6' />
          <AlertTitle className='text-green-500'>
            {t('successAlertTitle')}
          </AlertTitle>
          <AlertDescription>{t('successAlertDescription')}</AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='grid gap-y-6'
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
                      placeholder='nikita@gmail.com'
                      type='email'
                      disabled={loadingResetPassword}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-700' />
                </FormItem>
              )}
            />
            <Button
              className='mt-2 w-full'
              disabled={!isValid || loadingResetPassword}
              type='submit'
            >
              {t('submitButton')}
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
};

export default ResetPasswordForm;
