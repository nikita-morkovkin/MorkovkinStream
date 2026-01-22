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
import FormWrapper from '@/components/ui/elements/FormWrapper';
import {
  CreateSocialLinkDocument,
  FindSocialLinksDocument,
} from '@/graphql/gql/graphql';
import {
  socialLinksSchema,
  type TypeSocialLinksSchema,
} from '@/schemas/user/social-links.schema';
import { useMutation, useQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import SocialLinkFormSkeleton from './skeletons/SocialLinkFormSkeleton';
import SocialLinkList from './SocialLinkList';

const SocialLinksForm = () => {
  const t = useTranslations(
    'dashboard.settings.profile.socialLinks.createForm',
  );

  const { loading: isLoadingSocialLinks, refetch } = useQuery(
    FindSocialLinksDocument,
  );

  const [createSocialLink, { loading: isLoadingCreateSocialLink }] =
    useMutation(CreateSocialLinkDocument, {
      onCompleted() {
        refetch();
        toast.success(t('successMessage'));
      },
      onError() {
        toast.error(t(''));
      },
    });

  const form = useForm<TypeSocialLinksSchema>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const { isValid, isDirty } = form.formState;

  const handleSubmit = (data: TypeSocialLinksSchema) => {
    createSocialLink({ variables: { data } });
  };

  return isLoadingSocialLinks ? (
    <SocialLinkFormSkeleton />
  ) : (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='grid gap-y-6 ml-5.5 mr-[8px]'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('titleLabel')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('titlePlaceholder')}
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
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-md'>
                  {t('urlLabel')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('urlPlaceholder')}
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <Separator />

          <div className='flex justify-end p-5'>
            <Button
              disabled={
                !isValid ||
                !isDirty ||
                isLoadingCreateSocialLink ||
                isLoadingSocialLinks
              }
            >
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </Form>
      <SocialLinkList />
    </FormWrapper>
  );
};

export default SocialLinksForm;
