import { type PropsWithChildren } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../common/Tooltip';

interface HintAtProps {
  label: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  asChild?: boolean;
  align?: 'start' | 'center' | 'end';
}

const Hint = ({
  children,
  label,
  align,
  asChild,
  side,
}: PropsWithChildren<HintAtProps>) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent
        className='bg-secondary text-secondary-foreground'
        arrowClassName='bg-secondary fill-secondary'
        side={side}
        align={align}
      >
        <p className='font-semibold'>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Hint;
