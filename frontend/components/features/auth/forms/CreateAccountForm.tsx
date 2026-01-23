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
import { CreateUserDocument } from '@/graphql/gql/graphql';
import {
  createAccountSchema,
  type TypeCreateAccountSchema,
} from '@/schemas/auth/create-account.schema';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AuthWrapper from '../AuthWrapper';

const CreateAccountForm = () => {
  const t = useTranslations('auth.register');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createUser, { loading }] = useMutation(CreateUserDocument);

  const form = useForm<TypeCreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = async (data: TypeCreateAccountSchema) => {
    await createUser({
      variables: {
        data,
      },
      onCompleted(data) {
        if (data.createUser) {
          setIsSuccess(true);
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
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-md'>
                    {t('usernameLabel')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nikita_MK'
                      type='text'
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
            <Button
              className='mt-2 w-full bg-(--primary)'
              disabled={!isValid || loading}
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

export default CreateAccountForm;
