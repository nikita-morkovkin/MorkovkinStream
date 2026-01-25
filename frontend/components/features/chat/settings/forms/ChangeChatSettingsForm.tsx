'use client';

import { Form, FormField } from '@/components/ui/common/Form';
import Heading from '@/components/ui/elements/Heading';
import ToggleCard from '@/components/ui/elements/ToggleCard';
import ToggleCardSkeleton from '@/components/ui/skeletons/ToggleCardSkeleton';
import { ChangeChatSettingsDocument } from '@/graphql/gql/graphql';
import {
  changeChatSettingsSchema,
  TypeChangeChatSettingsSchema,
} from '@/schemas/stream/change-chat-settings.schema';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ChangeChatSettings = () => {
  const t = useTranslations('dashboard.chat');
  const { user, isLoadingProfile } = useCurrentProfile();

  const form = useForm<TypeChangeChatSettingsSchema>({
    resolver: zodResolver(changeChatSettingsSchema),
    values: {
      isChatEnabled: user?.stream.isChatEnabled ?? false,
      isChatFollowersOnly: user?.stream.isChatFollowersOnly ?? false,
      isChatPremiumFollowersOnly:
        user?.stream.isChatPremiumFollowersOnly ?? false,
    },
  });

  const [updateChatSettings, { loading: isLoadingChatSettings }] = useMutation(
    ChangeChatSettingsDocument,
    {
      onCompleted() {
        toast.success(t('successMessage'));
      },
      onError() {
        toast.error(t('errorMessage'));
      },
    },
  );

  const handleChange = (
    field: keyof TypeChangeChatSettingsSchema,
    value: boolean,
  ) => {
    form.setValue(field, value);

    updateChatSettings({
      variables: { data: { ...form.getValues(), [field]: value } },
    });
  };

  return (
    <div className='lg:px-10'>
      <Heading
        title={t('header.heading')}
        description={t('header.description')}
        size={'large'}
      />
      <div className='mt-7 space-y-6'>
        {isLoadingProfile ? (
          Array.from({ length: 3 }).map((_, index) => (
            <ToggleCardSkeleton key={index} />
          ))
        ) : (
          <Form {...form}>
            <FormField
              control={form.control}
              name='isChatEnabled'
              render={({ field }) => (
                <ToggleCard
                  heading={t('isChatEnabled.heading')}
                  description={t('isChatEnabled.description')}
                  isDisabled={isLoadingChatSettings || isLoadingProfile}
                  value={field.value}
                  onChange={value => handleChange('isChatEnabled', value)}
                />
              )}
            />

            <FormField
              control={form.control}
              name='isChatFollowersOnly'
              render={({ field }) => (
                <ToggleCard
                  heading={t('isChatFollowersOnly.heading')}
                  description={t('isChatFollowersOnly.description')}
                  isDisabled={isLoadingChatSettings || isLoadingProfile}
                  value={field.value}
                  onChange={value => handleChange('isChatFollowersOnly', value)}
                />
              )}
            />

            <FormField
              control={form.control}
              name='isChatPremiumFollowersOnly'
              render={({ field }) => (
                <ToggleCard
                  heading={t('isChatPremiumFollowersOnly.heading')}
                  description={t('isChatPremiumFollowersOnly.description')}
                  isDisabled={isLoadingChatSettings || isLoadingProfile}
                  value={field.value}
                  onChange={value =>
                    handleChange('isChatPremiumFollowersOnly', value)
                  }
                />
              )}
            />
          </Form>
        )}
      </div>
    </div>
  );
};

export default ChangeChatSettings;
