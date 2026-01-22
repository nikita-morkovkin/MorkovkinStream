import { Separator } from '@/components/ui/common/Separator';
import {
  FindSocialLinksDocument,
  ReorderSocialLinksDocument,
} from '@/graphql/gql/graphql';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from '@hello-pangea/dnd';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import SocialLinkItem from './SocialLinkItem';

const SocialLinkList = () => {
  const t = useTranslations('dashboard.settings.profile.socialLinks');
  const { data, refetch } = useQuery(FindSocialLinksDocument);
  const items = useMemo(() => data?.findSocialLinks ?? [], [data]);
  const [socialLinks, setSocialLinks] = useState(items);
  const [reorderSocialLinks, { loading: isLoadingReorder }] = useMutation(
    ReorderSocialLinksDocument,
    {
      onCompleted() {
        refetch();
        toast.success(t('successReorderMessage'));
      },
      onError() {
        toast.error(t('errorReorderMessage'));
      },
    },
  );

  useEffect(() => {
    setSocialLinks(items);
  }, [items]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(socialLinks);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    const bulkUpdateData = items.map((socialItem, index) => ({
      id: socialItem.id,
      position: index,
    }));

    setSocialLinks(items);

    reorderSocialLinks({ variables: { list: bulkUpdateData } });
  };

  return socialLinks.length ? (
    <>
      <Separator className='mb-6 mt-4' />
      <div className='px-5'>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='socialLinks'>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {socialLinks.map((socialLink, index) => (
                  <Draggable
                    key={socialLink.id}
                    draggableId={socialLink.id}
                    index={index}
                    isDragDisabled={isLoadingReorder}
                  >
                    {provided => (
                      <SocialLinkItem
                        key={index}
                        socialLink={socialLink}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  ) : null;
};

export default SocialLinkList;
