import { StateCreator } from 'zustand';
import {
  BaseWidgetState,
  WidgetDefinition
} from '@/components/playground-new/types';
import { Movable } from '@/components/playground-new/core/movable';
import { getPositionRef } from '@/components/playground-new/core/position-utils';
import { useEffect } from 'react';
import { HomeMenu } from './menu-types';
import { subscribeToScreenChanges, createMenuFactory } from './menu-factory';
import { MainSelectable } from './components/main-selectable';
import { MenuItems } from './components/menu-items';

interface HomeWidgetCustomState {
  currentMenu: HomeMenu | null;
  menuContext: string;
  isOpen: boolean;
  setMenu: (menu: HomeMenu) => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
  updateMenuForContext: (context: string) => void;
}

type HomeWidgetState = BaseWidgetState & HomeWidgetCustomState;

const stateFn: StateCreator<HomeWidgetCustomState> = (set, get) => {
  const factory = createMenuFactory(''); // Will be set when widget is created

  return {
    currentMenu: null, // Will be initialized in component
    menuContext: '',
    isOpen: false,
    setMenu(menu: HomeMenu) {
      set({ currentMenu: menu });
    },
    setIsOpen(isOpen: boolean) {
      set({ isOpen });
    },
    toggleOpen() {
      set((state) => ({ isOpen: !state.isOpen }));
    },
    updateMenuForContext(context: string) {
      const state = get() as any;
      const widgetId = state.id;
      const factory = createMenuFactory(widgetId);
      const menu = factory(context);
      set({ currentMenu: menu, menuContext: context });
    }
  };
};

function Component({
  currentMenu,
  isOpen,
  setMenu,
  setIsOpen,
  toggleOpen,
  updateMenuForContext,
  id,
  x,
  y
}: HomeWidgetState) {
  const positionRef = getPositionRef(id);

  // Initialize menu and subscribe to screen changes
  useEffect(() => {
    if (!currentMenu) {
      // Initial menu setup
      const factory = createMenuFactory(id);
      const initialMenu = factory();
      setMenu(initialMenu);
    }

    // Subscribe to screen changes
    const unsubscribe = subscribeToScreenChanges(id, (menu) => {
      setMenu(menu);
    });

    return unsubscribe;
  }, [id, currentMenu, setMenu]);

  const handleMainPress = () => {
    if (!currentMenu) return;
    
    if (!currentMenu.showBack) {
      toggleOpen();
    } else {
      currentMenu.backFn?.(setMenu);
      setIsOpen(false);
    }
  };

  if (!currentMenu) {
    return null;
  }

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
        icon={currentMenu.icon}
        onPress={handleMainPress}
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


