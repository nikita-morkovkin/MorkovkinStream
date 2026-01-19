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
import { NewPasswordDocument } from '@/graphql/gql/graphql';
import {
  newPasswordSchema,
  type TypeNewPasswordSchema,
} from '@/schemas/auth/new-password.schema';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AuthWrapper from '../AuthWrapper';

const NewPasswordForm = () => {
  const t = useTranslations('auth.newPassword');
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const [newPassword, { loading }] = useMutation(NewPasswordDocument);

  const token = params.token;

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = async (data: TypeNewPasswordSchema) => {
    await newPassword({
      variables: {
        data: {
          newPassword: data.password,
          confirmPassword: data.passwordRepeat,
          token,
        },
      },
      onCompleted() {
        toast.success(t('successMessage'));
        router.push('/account/login');
      },
      onError() {
        toast.error(t('errorMessage'));
      },
    });
  };

  return (
    <AuthWrapper heading={t('heading')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='grid gap-y-6'
        >
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('passwordLabel')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='********'
                    type='password'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordRepeat'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('passwordRepeatLabel')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='********'
                    type='password'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <Button
            className='mt-2 w-full'
            disabled={!isValid || loading}
            type='submit'
          >
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default NewPasswordForm;
