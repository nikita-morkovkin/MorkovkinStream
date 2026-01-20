import Header from '@/components/layouts/header/Header';
import LayoutContainer from '@/components/layouts/LayoutContainer';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import { type ReactNode } from 'react';

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex w-full flex-col'>
      <div className='flex-1'>
        <div className='fixed inset-0 z-50 h-[65px] w-full'>
          <Header />
        </div>
        <Sidebar />
        <LayoutContainer>{children}</LayoutContainer>
      </div>
    </div>
  );
}
