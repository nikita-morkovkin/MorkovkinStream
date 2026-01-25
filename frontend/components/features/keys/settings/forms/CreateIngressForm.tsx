'use client';

import { Button } from '@/components/ui/common/Button';
import {
  Dialog,
  DialogContent,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/common/Select';
import { CreateIngressDocument, IngressInput } from '@/graphql/gql/graphql';
import {
  createIngressSchema,
  IngressType,
  type TypeCreateIngressSchema,
} from '@/schemas/stream/create-ingress.schema';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CreateIngressForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations('dashboard.keys.createModal');
  const { refetch } = useCurrentProfile();

  const [createIngress, { loading: isLoadingCreateIngress }] = useMutation(
    CreateIngressDocument,
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

  const form = useForm<TypeCreateIngressSchema>({
    resolver: zodResolver(createIngressSchema),
    defaultValues: {
      ingressType: IngressType.RTMP,
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = (data: TypeCreateIngressSchema) => {
    const ingressType =
      data.ingressType === IngressType.RTMP
        ? IngressInput.RtmpInput
        : IngressInput.WhipInput;

    createIngress({ variables: { ingressType } });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{t('trigger')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('heading')}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='ingressType'
              render={({ field }) => (
                <FormItem className='mt-1'>
                  <FormLabel className='text-sm'>
                    {t('ingressTypeLabel')}
                  </FormLabel>
                  <FormControl className='w-full'>
                    <Select
                      onValueChange={value => {
                        field.onChange(parseInt(value));
                      }}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue
                          placeholder={t('ingressTypePlaceholder')}
                        />
                      </SelectTrigger>
                      <SelectContent position='popper'>
                        <SelectItem
                          value={IngressType.RTMP.toString()}
                          disabled={isLoadingCreateIngress}
                        >
                          RTMP
                        </SelectItem>

                        <SelectItem
                          value={IngressType.WHIP.toString()}
                          disabled={isLoadingCreateIngress}
                        >
                          WHIP
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className='mt-2'>
                    {t('ingressTypeDescription')}
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button disabled={!isValid || isLoadingCreateIngress}>
                {t('submitButton')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIngressForm;
