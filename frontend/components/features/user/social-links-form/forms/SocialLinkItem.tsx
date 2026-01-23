import { Button } from '@/components/ui/common/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/common/Form';
import { Input } from '@/components/ui/common/Input';
import {
  FindSocialLinksDocument,
  RemoveSocialLinkDocument,
  UpdateSocialLinkDocument,
  type FindSocialLinksQuery,
} from '@/graphql/gql/graphql';
import {
  socialLinksSchema,
  type TypeSocialLinksSchema,
} from '@/schemas/user/social-links.schema';
import { useMutation, useQuery } from '@apollo/client/react';
import { type DraggableProvided } from '@hello-pangea/dnd';
import { zodResolver } from '@hookform/resolvers/zod';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface SocialItemProps {
  socialLink: FindSocialLinksQuery['findSocialLinks'][0];
  provided: DraggableProvided;
}

const SocialLinkItem = ({ provided, socialLink }: SocialItemProps) => {
  const t = useTranslations('dashboard.settings.profile.socialLinks.editForm');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { dragHandleProps, draggableProps, innerRef } = provided;
  const { refetch } = useQuery(FindSocialLinksDocument);

  const toggleEditing = (id: string | null) => {
    setEditingId(id);
  };

  const [updateSocialLink, { loading: isLoadingUpdate }] = useMutation(
    UpdateSocialLinkDocument,
    {
      onCompleted() {
        toggleEditing(null);
        refetch();
        toast.success(t('successUpdateMessage'));
      },
      onError() {
        toast.error(t('errorUpdateMessage'));
      },
    },
  );

  const [removeSocialLink, { loading: isLoadingRemove }] = useMutation(
    RemoveSocialLinkDocument,
    {
      onCompleted() {
        refetch();
        toast.success(t('successRemoveMessage'));
      },
      onError() {
        toast.error(t('errorRemoveMessage'));
      },
    },
  );

  const form = useForm<TypeSocialLinksSchema>({
    resolver: zodResolver(socialLinksSchema),
    values: {
      title: socialLink.title || '',
      url: socialLink.url || '',
    },
  });

  const handleSubmit = (data: TypeSocialLinksSchema) => {
    updateSocialLink({ variables: { id: socialLink.id, data: data } });
  };

  const { isValid, isDirty } = form.formState;

  return (
    <div
      className='mb-4 flex items-center gap-x-2 rounded-md border border-border bg-background text-sm'
      ref={innerRef}
      {...draggableProps}
    >
      <div
        className='rounded-l-md border-r border-r-border px-2 py-9 text-foreground transition'
        {...dragHandleProps}
      >
        <GripVertical className='size-5' />
      </div>
      <div className='space-y-1 px-2'>
        {editingId === socialLink.id ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex gap-x-12'
            >
              <div className='w-96 space-y-2'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoadingUpdate || isLoadingRemove}
                          className='h-8'
                          placeholder={'GitHub'}
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-red-700' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='url'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoadingUpdate || isLoadingRemove}
                          className='h-8'
                          placeholder={'https://github/nikita-morkovkin'}
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-red-700' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex items-center gap-x-4'>
                <Button onClick={() => toggleEditing(null)} variant={'outline'}>
                  {t('cancelButton')}
                </Button>
                <Button
                  onClick={() => toggleEditing(null)}
                  disabled={
                    isLoadingUpdate || !isDirty || !isValid || isLoadingRemove
                  }
                  className='bg-(--primary)'
                  variant={'default'}
                >
                  {t('submitButton')}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <h2 className='text-base font-semibold text-foreground'>
              {socialLink.title}
            </h2>
            <p className='text-muted-foreground'>{socialLink.url}</p>
          </>
        )}
      </div>
      <div className='ml-auto flex items-center gap-x-2 pr-4'>
        {editingId !== socialLink.id && (
          <Button
            onClick={() => toggleEditing(socialLink.id)}
            variant={'ghost'}
            size={'icon'}
          >
            <Pencil className='size-4 text-muted-foreground' />
          </Button>
        )}
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => removeSocialLink({ variables: { id: socialLink.id } })}
        >
          <Trash2 className='size-4 text-muted-foreground' />
        </Button>
      </div>
    </div>
  );
};

export default SocialLinkItem;
