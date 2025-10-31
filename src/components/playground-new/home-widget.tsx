import { StateCreator } from 'zustand';
import {
  BaseWidgetState,
  WidgetDefinition
} from '@/components/playground-new/types';
import { Movable } from '@/components/playground-new/core/movable';
import { getPositionRef } from '@/components/playground-new/core/position-utils';
import { Selectable } from '@/components/playground-new/core/selectable';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { createWidget } from '@/components/playground-new/store';
import { Timer } from '@/components/playground-new/timer';
import { SYSTEM_IDS } from '@/components/playground-new/types';

export type setHomeMenuFn = (homeMenu: HomeMenu) => void;

export interface HomeMenu {
  items: HomeItem[];
  text?: string;
  icon?: ReactNode;
  showBack?: boolean;
  backFn?: (setHomeMenu: setHomeMenuFn) => void;
}

export type HomeItem = {
  icon?: ReactNode;
  text?: string;
  fn(setHomeMenu: setHomeMenuFn): void;
};

interface HomeWidgetCustomState {
  currentMenu: HomeMenu;
  isOpen: boolean;
  setMenu: (menu: HomeMenu) => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
}

type HomeWidgetState = BaseWidgetState & HomeWidgetCustomState;

// Main menu definition
const mainMenu: HomeMenu = {
  items: [
    {
      icon: <i className='fa fa-timer text-6xl' />,
      fn(setHomeMenu: setHomeMenuFn) {
        setHomeMenu(timerMenu);
      }
    },
    {
      icon: <i className='fa fa-plus text-6xl' />,
      fn() {
        // Add timer widget
        createWidget(Timer, SYSTEM_IDS.MAIN, undefined, {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100
        });
      }
    },
    {
      icon: <i className='fa fa-gears text-6xl' />,
      fn() {
        // Navigate to calibration
        const { getWidgetByID } = require('@/components/playground-new/store');
        const rootNav = getWidgetByID(SYSTEM_IDS.ROOT_NAV);
        rootNav.store.getState().setSelected(SYSTEM_IDS.CALIBRATION);
      }
    }
  ],
  showBack: false
};

// Timer menu definition
const timerMenu: HomeMenu = {
  items: [
    {
      text: '5m',
      fn(setHomeMenu: setHomeMenuFn) {
        const timerId = createWidget(Timer, SYSTEM_IDS.MAIN, undefined, {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100
        });
        const { getWidgetByID } = require('@/components/playground-new/store');
        const timer = getWidgetByID(timerId);
        timer.store.getState().setDuration(300); // 5 minutes
        setHomeMenu(mainMenu);
      }
    },
    {
      text: '15m',
      fn(setHomeMenu: setHomeMenuFn) {
        const timerId = createWidget(Timer, SYSTEM_IDS.MAIN, undefined, {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100
        });
        const { getWidgetByID } = require('@/components/playground-new/store');
        const timer = getWidgetByID(timerId);
        timer.store.getState().setDuration(900); // 15 minutes
        setHomeMenu(mainMenu);
      }
    },
    {
      text: '30m',
      fn(setHomeMenu: setHomeMenuFn) {
        const timerId = createWidget(Timer, SYSTEM_IDS.MAIN, undefined, {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100
        });
        const { getWidgetByID } = require('@/components/playground-new/store');
        const timer = getWidgetByID(timerId);
        timer.store.getState().setDuration(1800); // 30 minutes
        setHomeMenu(mainMenu);
      }
    },
    {
      text: '1h',
      fn(setHomeMenu: setHomeMenuFn) {
        const timerId = createWidget(Timer, SYSTEM_IDS.MAIN, undefined, {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100
        });
        const { getWidgetByID } = require('@/components/playground-new/store');
        const timer = getWidgetByID(timerId);
        timer.store.getState().setDuration(3600); // 1 hour
        setHomeMenu(mainMenu);
      }
    }
  ],
  text: 'Timer',
  icon: <i className='fa fa-timer text-6xl' />,
  showBack: true,
  backFn(setHomeMenu: setHomeMenuFn) {
    setHomeMenu(mainMenu);
  }
};

const stateFn: StateCreator<HomeWidgetCustomState> = (set) => ({
  currentMenu: mainMenu,
  isOpen: false,
  setMenu(menu: HomeMenu) {
    set({ currentMenu: menu });
  },
  setIsOpen(isOpen: boolean) {
    set({ isOpen });
  },
  toggleOpen() {
    set((state) => ({ isOpen: !state.isOpen }));
  }
});

function MainSelectable({
  onPress,
  title,
  icon,
  showBack = false
}: {
  onPress: () => void;
  title?: string;
  icon?: ReactNode;
  showBack?: boolean;
}) {
  return (
    <Selectable
      stopPropagation
      onPrimaryPress={onPress}
      className='flex size-72 flex-col items-center justify-center rounded-full bg-white text-4xl text-white'
    >
      {title ? (
        <span className='text-6xl font-bold text-black'>{title}</span>
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

function MenuItems({
  isOpen,
  menuItems,
  setIsOpen,
  setHomeMenu
}: {
  isOpen: boolean;
  menuItems: HomeItem[];
  setIsOpen: (value: boolean) => void;
  setHomeMenu: setHomeMenuFn;
}) {
  const radius = 270;

  return (
    <>
      {menuItems.map((item, index) => {
        let nr1 = menuItems.length > 2 ? 0.35 : 0.52;
        let nr2 = menuItems.length > 2 ? 1.25 : 2;

        const angle = -Math.PI * (nr1 + index / (menuItems.length - 1) / nr2);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.div
            key={index}
            className='absolute h-32 w-32'
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: isOpen ? x : 0,
              y: isOpen ? y : 0,
              opacity: isOpen ? 1 : 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Selectable
              enabled={isOpen}
              onPrimaryPress={() => {
                if (item.fn) {
                  item.fn(setHomeMenu);
                  setIsOpen(false);
                } else {
                  setIsOpen(!isOpen);
                }
              }}
              className='flex h-32 w-32 items-center justify-center rounded-full bg-white text-black'
            >
              {item.icon ?? (
                <label className='text-5xl font-bold'>{item.text}</label>
              )}
            </Selectable>
          </motion.div>
        );
      })}
    </>
  );
}

function Component({
  currentMenu,
  isOpen,
  setMenu,
  setIsOpen,
  toggleOpen,
  id,
  x,
  y
}: HomeWidgetState) {
  const positionRef = getPositionRef(id);

  const handleMainPress = () => {
    if (!currentMenu.showBack) {
      toggleOpen();
    } else {
      currentMenu.backFn?.(setMenu);
      setIsOpen(false);
    }
  };

  const homeWidgetContent = (
    <div
      data-id={id}
      data-widget-type='home-widget'
      className='relative flex h-80 w-80 items-center justify-center'
      style={{
        userSelect: 'none',
        zIndex: 100
      }}
    >
      <MainSelectable
        title={currentMenu.text}
        onPress={handleMainPress}
        icon={
          <i className='fa fa-arrow-left absolute top-1/2 left-8 -translate-y-1/2 transform text-xl text-white' />
        }
        showBack={currentMenu.showBack}
      />

      <MenuItems
        setHomeMenu={setMenu}
        isOpen={isOpen}
        menuItems={currentMenu.items}
        setIsOpen={setIsOpen}
      />
      <img
        src='/mesh-gradient.png'
        alt='Kivy Logo'
        className='pointer-events-none absolute z-[100] min-h-[45rem] min-w-[45rem]'
      />
    </div>
  );

  // Wrap with Movable for drag functionality
  if (positionRef) {
    return (
      <Movable initialPos={{ x, y }} positionRef={positionRef}>
        {homeWidgetContent}
      </Movable>
    );
  }

  return homeWidgetContent;
}

export const HomeWidget: WidgetDefinition<HomeWidgetState> = {
  stateFn,
  Component
};

