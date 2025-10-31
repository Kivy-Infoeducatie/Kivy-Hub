import { ReactNode } from 'react';
import { Selectable } from '@/components/playground-new/core/selectable';
import { Icon } from './icon';

interface MainSelectableProps {
  onPress: () => void;
  title?: string;
  icon?: ReactNode | string;
  showBack?: boolean;
}

export function MainSelectable({
  onPress,
  title,
  icon,
  showBack = false
}: MainSelectableProps) {
  return (
    <Selectable
      stopPropagation
      onPrimaryPress={onPress}
      className='flex size-72 flex-col items-center justify-center rounded-full bg-white text-4xl text-white'
    >
      {title ? (
        <span className='text-6xl font-bold text-black'>{title}</span>
      ) : icon ? (
        typeof icon === 'string' ? (
          <Icon name={icon} className='text-6xl text-black' />
        ) : (
          icon
        )
      ) : (
        <img src='/kivy-logo.png' alt='Kivy Logo' className='size-52' />
      )}
      {showBack && (
        <div className='mt-5 flex items-center justify-center gap-3'>
          <Icon name='fa-arrow-left' className='text-4xl text-black' />
          <span className='text-4xl font-bold text-black'>Back</span>
        </div>
      )}
    </Selectable>
  );
}


