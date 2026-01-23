'use client';

import { Button } from '@/components/ui/common/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/Dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/common/Form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/InputOTP';
import {
  EnableTotpDocument,
  GenerateTotpSecretDocument,
} from '@/graphql/gql/graphql';
import {
  enableTotpSchema,
  TypeEnableTotpSchema,
} from '@/schemas/user/enable-totp.schema';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useMutation, useQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const EnableTotp = () => {
  const t = useTranslations('dashboard.settings.account.twoFactor.enable');
  const { refetch } = useCurrentProfile();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, loading: isLoadingGenerateTotp } = useQuery(
    GenerateTotpSecretDocument,
    {
      skip: !isOpen,
      fetchPolicy: 'network-only',
    },
  );

  const [enableTotp, { loading: isLoadingEnable }] = useMutation(
    EnableTotpDocument,
    {
      onCompleted() {
        refetch();
        setIsOpen(false);
        toast.success(t('successMessage'));
      },
      onError() {
        toast.error(t('errorMessage'));
      },
    },
  );

  const twoFactorAuth = data?.generateTotp;

  const form = useForm<TypeEnableTotpSchema>({
    resolver: zodResolver(enableTotpSchema),
    defaultValues: {
      pin: '',
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = (data: TypeEnableTotpSchema) => {
    enableTotp({
      variables: {
        data: { secret: twoFactorAuth?.secret ?? '', pin: data.pin },
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='bg-(--primary)'>{t('trigger')}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl'>{t('heading')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='fled flex-col gap-4'
          >
            <div className='flex flex-col items-center justify-center gap-4'>
              <span className='text-sm text-muted-foreground'>
                {twoFactorAuth?.qrcode ? t('qrInstructions') : ''}
              </span>
              {/* Using img, not Image from Next. It is because of incorrect work with Image component  */}
              <img
                src={twoFactorAuth?.qrcode}
                alt='QR CODE'
                className='rounded-lg'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-center mt-5 text-muted-foreground'>
                {twoFactorAuth?.secret
                  ? t('secretCodeLabel') + twoFactorAuth.secret
                  : ''}
              </span>
            </div>
            <FormField
              control={form.control}
              name='pin'
              render={({ field }) => (
                <FormItem className='flex flex-col justify-center py-4 px-6.5'>
                  <FormLabel className='text-xl font-semibold'>
                    {t('pinLabel')}
                  </FormLabel>
                  <div className='flex justify-center items-center flex-col gap-5 my-2.5'>
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
                    <FormDescription>{t('pinDescription')}</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='submit'
                className='bg-(--primary)'
                disabled={!isValid || isLoadingGenerateTotp || isLoadingEnable}
              >
                {t('submitButton')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EnableTotp;
