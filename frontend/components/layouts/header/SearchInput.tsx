'use client';

import { Button } from '@/components/ui/common/Button';
import { Input } from '@/components/ui/common/Input';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const SearchInput = () => {
  const t = useTranslations('layout.search');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/streams?searchTerm=${searchTerm}`);
    } else {
      router.push('/streams');
    }
  };

  return (
    <div className='ml-auto hidden lg:block'>
      <form className='relative flex items-center' onSubmit={handleSubmit}>
        <Input
          placeholder={t('placeholder')}
          type='text'
          value={searchTerm}
          className='w-full rounded-full pl-4 pr-10 lg:w-[400px]'
          onChange={event => setSearchTerm(event.target.value)}
        />
        <Button
          className='absolute left-90 h-[36px] bottom cursor-pointer bg-(--primary)'
          type='submit'
        >
          <SearchIcon className='absolute size-[18px]' />
        </Button>
      </form>
    </div>
  );
};

export default SearchInput;
