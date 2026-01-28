import { Skeleton } from '@/components/ui/common/Skeleton';

const StreamVideoSkeleton = () => {
  return (
    <div className='mb-6 aspect-video'>
      <Skeleton className='w-full h-full rounded-lg' />
    </div>
  );
};

export default StreamVideoSkeleton;
