'use client';

import { VerifyAccountDocument } from '@/graphql/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import AuthWrapper from '../AuthWrapper';

const VerifyAccountForm = () => {
  const t = useTranslations('auth.verify');
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token') ?? '';

  const [verifyAccount] = useMutation(VerifyAccountDocument, {
    onCompleted() {
      toast.success(t('successMessage'));
      router.push('dashboard/settings');
    },
    onError() {
      toast.error(t('errorMessage'));
    },
  });

  useEffect(() => {
    if (token) {
      verifyAccount({
        variables: {
          data: { token },
        },
      });
    }
  }, [token, verifyAccount]);

  return (
    <AuthWrapper heading={t('heading')}>
      <div className='flex justify-center'>
        <Loader className='size-8 animate-spin' />
      </div>
    </AuthWrapper>
  );
};

export default VerifyAccountForm;
