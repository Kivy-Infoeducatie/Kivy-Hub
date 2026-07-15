import { ReactNode } from 'react';
import { Selectable } from '@/components/playground/core/selectable';

interface MainSelectableProps {
  onPress: () => void;
  onTertiaryPress?: () => void;
  title?: string;
  icon?: ReactNode;
  showBack?: boolean;
}

export default function MainSelectable({
  onPress,
  onTertiaryPress,
  title,
  icon,
  showBack = false
}: MainSelectableProps) {
  const titleClassName =
    title && title.length > 14
      ? 'whitespace-pre-line text-3xl leading-tight text-center'
      : 'text-6xl';

  return (
    <Selectable
      ignoreLock={{
        primary: false,
        secondary: false,
        tertiary: true
      }}
      stopPropagation
      onTertiaryPress={onTertiaryPress}
      onPrimaryPress={onPress}
      className={
        'flex size-72 flex-col items-center justify-center rounded-full bg-white text-4xl text-white'
      }
    >
      {title ? (
        <span className={`${titleClassName} font-bold text-black`}>
          {title}
        </span>
      ) : icon ? (
        icon
      ) : (
        <img src='/kivy-logo.png' alt='Kivy Logo' className='size-52' />
      )}
      {showBack && (
        <div className='mt-5 flex items-center justify-center gap-3'>
          <i className='fa fa-arrow-left text-4xl text-black'></i>
          <span className='text-4xl font-bold text-black'>Back</span>
        </div>
      )}
    </Selectable>
  );
}
