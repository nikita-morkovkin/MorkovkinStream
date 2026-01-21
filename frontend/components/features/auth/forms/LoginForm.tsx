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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/InputOTP';
import { LoginUserDocument } from '@/graphql/gql/graphql';
import { loginSchema, type TypeLoginSchema } from '@/schemas/auth/login.schema';
import { useAuth } from '@/shared/hooks/useAuth';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AuthWrapper from '../AuthWrapper';

const LoginForm = () => {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const { auth } = useAuth();
  const [isShow2FA, setIsShow2FA] = useState<boolean>(false);
  const [login, { loading: isLoadingLogin }] = useMutation(LoginUserDocument);

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = async (data: TypeLoginSchema) => {
    await login({
      variables: {
        data,
      },
      onCompleted(data) {
        if (data.login.message) {
          setIsShow2FA(true);
        } else {
          auth();
          toast.success(t('successMessage'));
          router.push('/dashboard/settings');
        }
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
      backButtonHref='/account/create'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='grid gap-y-6'
        >
          {isShow2FA ? (
            <FormField
              control={form.control}
              name='pin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-md'>
                    {t('pinLabel')}
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className='text-red-700' />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name='login'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold text-md'>
                      {t('loginLabel')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='nikita@gmail.com'
                        type='email'
                        disabled={isLoadingLogin}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel className='font-semibold text-md'>
                        {t('passwordLabel')}
                      </FormLabel>
                      <Link
                        href={'/account/recovery'}
                        className='ml-auto inline-block text-sm'
                      >
                        {t('forgotPassword')}
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder='********'
                        type='password'
                        disabled={isLoadingLogin}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-700' />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button
            className='mt-2 w-full'
            disabled={!isValid || isLoadingLogin}
            type='submit'
          >
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default LoginForm;
