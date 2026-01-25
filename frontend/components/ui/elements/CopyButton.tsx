'use client';

import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../common/Button';

interface CopyButtonProps {
  value: string | null;
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const t = useTranslations('components.copyButton');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (!value) {
      return;
    }

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    toast.success(t('successMessage'));
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const Icon = isCopied ? Check : Copy;

  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={() => handleCopy()}
      disabled={!value || isCopied}
    >
      <Icon className='size-5' />
    </Button>
  );
};

export default CopyButton;
