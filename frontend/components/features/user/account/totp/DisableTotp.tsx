'use client';

import { Button } from '@/components/ui/common/Button';
import ConfirmModal from '@/components/ui/elements/ConfirmModal';
import { DisableTotpDocument } from '@/graphql/gql/graphql';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useMutation } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const DisableTotp = () => {
  const t = useTranslations('dashboard.settings.account.twoFactor.disable');
  const { refetch } = useCurrentProfile();

  const [disableTotp, { loading: isLoadingDisableTotp }] = useMutation(
    DisableTotpDocument,
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

  return (
    <ConfirmModal
      heading={t('heading')}
      message={t('message')}
      onConfirm={() => disableTotp()}
    >
      <Button
        variant={'secondary'}
        className='bg-(--primary)'
        disabled={isLoadingDisableTotp}
      >
        {t('trigger')}
      </Button>
    </ConfirmModal>
  );
};

export default DisableTotp;
