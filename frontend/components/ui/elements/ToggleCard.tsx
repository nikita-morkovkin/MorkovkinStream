import { PropsWithChildren } from 'react';
import { Switch } from '../common/Switch';
import CardContainer from './CardContainer';

interface ToggleCardProps {
  heading: string;
  description: string;
  isDisabled?: boolean;
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleCard = ({
  heading,
  description,
  onChange,
  value,
  isDisabled,
  children,
}: PropsWithChildren<ToggleCardProps>) => {
  return (
    <CardContainer
      heading={heading}
      description={description}
      rightContent={
        <Switch
          className='bg-(--primary) text-(--primary)'
          checked={value}
          onCheckedChange={onChange}
          disabled={isDisabled}
        />
      }
    />
  );
};

export default ToggleCard;
