import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/common/Popover';
import { FindUnreadNotificationsCountDocument } from '@/graphql/gql/graphql';
import { useQuery } from '@apollo/client/react';
import { Bell } from 'lucide-react';
import NotificationsList from './NotificationsList';

const Notifications = () => {
  const { data, loading: isLoadingCount } = useQuery(
    FindUnreadNotificationsCountDocument,
  );
  const countNotifications = data?.findUnreadNotificationsCount ?? 0;

  // It shows count of notifications like YouTube,
  // if more 9, it will be 9+,
  // if less, count of real notifications
  const displayCount = countNotifications > 10 ? '+9' : countNotifications;

  if (isLoadingCount) {
    return;
  }

  return (
    <Popover>
      <PopoverTrigger>
        {countNotifications !== 0 && (
          <div
            className={`absolute right-[72px] top-5 rounded-full 
            bg-primary px-[5px] text-xs font-semibold text-white`}
          >
            {displayCount}
          </div>
        )}
        <Bell className='size-5 text-foreground' />
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className='max-h-[500px] w-[320px] overflow-y-auto'
      >
        <NotificationsList />
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
