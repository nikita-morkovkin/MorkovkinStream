import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/common/Tabs';
import Heading from '@/components/ui/elements/Heading';
import { useTranslations } from 'next-intl';
import ChangeAvatarForm from './profile/forms/ChangeAvatarForm';
import ChangeInfoForm from './profile/forms/ChangeInfoForm';
import SocialLinksForm from './social-links-form/SocialLinksForm';

const UserSettings = () => {
  const t = useTranslations('dashboard.settings');

  return (
    <div className='lg:px-10'>
      <Heading
        title={t('header.heading')}
        description={t('header.description')}
        size={'large'}
      />
      <Tabs defaultValue={'profile'} className='mt-3 w-full'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger className='font-semibold' value='profile'>
            {t('header.profile')}
          </TabsTrigger>
          <TabsTrigger className='font-semibold' value='account'>
            {t('header.account')}
          </TabsTrigger>
          <TabsTrigger className='font-semibold' value='appearance'>
            {t('header.appearance')}
          </TabsTrigger>
          <TabsTrigger className='font-semibold' value='notifications'>
            {t('header.notifications')}
          </TabsTrigger>
          <TabsTrigger className='font-semibold' value='sessions'>
            {t('header.sessions')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='profile' className='mt-6'>
          <div className=' space-y-6'>
            <Heading
              title={t('profile.header.heading')}
              description={t('profile.header.description')}
            />
            <ChangeAvatarForm />
            <ChangeInfoForm />
            <SocialLinksForm />
          </div>
        </TabsContent>
        <TabsContent value='account'></TabsContent>
        <TabsContent value='appearance'></TabsContent>
        <TabsContent value='notifications'></TabsContent>
        <TabsContent value='sessions'></TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
