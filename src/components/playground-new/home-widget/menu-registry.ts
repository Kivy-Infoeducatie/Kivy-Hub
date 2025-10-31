import { MenuItemConfig, MenuActionContext, HomeMenu, setHomeMenuFn } from './menu-types';
import { createWidget, getWidgetByID } from '@/components/playground-new/store';
import { Timer } from '@/components/playground-new/timer';
import { Counter } from '@/components/playground-new/counter';
import { SYSTEM_IDS } from '@/components/playground-new/types';

/**
 * Menu configuration per screen/context
 */
export type MenuRegistry = {
  [screenId: string]: {
    items: MenuItemConfig[];
    title?: string;
    icon?: string;
    submenus?: {
      [key: string]: {
        items: MenuItemConfig[];
        title: string;
        icon?: string;
        backTo?: string; // Parent menu key
      };
    };
  };
};

/**
 * Default menu configuration for different screens
 */
export const menuRegistry: MenuRegistry = {
  // Main screen menu
  [SYSTEM_IDS.MAIN]: {
    title: undefined, // Shows logo
    items: [
      {
        icon: 'fa-timer',
        action: (context) => {
          context.setHomeMenu(createMenuFromConfig('timer', context.widgetId));
        }
      },
      {
        icon: 'fa-plus',
        action: () => {
          // Add timer widget
          createWidget(Timer, SYSTEM_IDS.MAIN, undefined, {
            x: Math.random() * 400 + 100,
            y: Math.random() * 400 + 100
          });
        }
      },
      {
        icon: 'fa-list',
        action: () => {
          // Add counter widget
          createWidget(Counter, SYSTEM_IDS.MAIN, undefined, {
            x: Math.random() * 400 + 100,
            y: Math.random() * 400 + 100
          });
        }
      },
      {
        icon: 'fa-gears',
        action: () => {
          // Navigate to calibration
          const rootNav = getWidgetByID(SYSTEM_IDS.ROOT_NAV);
          rootNav.store.getState().setSelected(SYSTEM_IDS.CALIBRATION);
        }
      }
    ],
    submenus: {
      timer: {
        title: 'Timer',
        icon: 'fa-timer',
        backTo: SYSTEM_IDS.MAIN,
        items: [
          {
            text: '5m',
            action: (context) => {
              createTimerWithDuration(300, context);
            }
          },
          {
            text: '15m',
            action: (context) => {
              createTimerWithDuration(900, context);
            }
          },
          {
            text: '30m',
            action: (context) => {
              createTimerWithDuration(1800, context);
            }
          },
          {
            text: '1h',
            action: (context) => {
              createTimerWithDuration(3600, context);
            }
          }
        ]
      }
    }
  },

  // Calibration screen menu
  [SYSTEM_IDS.CALIBRATION]: {
    title: 'Calibration',
    items: [
      {
        icon: 'fa-arrow-left',
        action: () => {
          // Navigate back to main
          const rootNav = getWidgetByID(SYSTEM_IDS.ROOT_NAV);
          rootNav.store.getState().setSelected(SYSTEM_IDS.MAIN);
        }
      },
      {
        icon: 'fa-gears',
        text: 'Settings',
        action: () => {
          // Calibration actions
        }
      }
    ]
  }
};

/**
 * Helper function to create timer with specific duration
 */
function createTimerWithDuration(seconds: number, context: MenuActionContext): void {
  const timerId = createWidget(Timer, SYSTEM_IDS.MAIN, undefined, {
    x: Math.random() * 400 + 100,
    y: Math.random() * 400 + 100
  });
  
  const timer = getWidgetByID(timerId);
  timer.store.getState().setDuration(seconds);
  
  // Return to main menu
  const mainMenu = createMenuFromConfig(SYSTEM_IDS.MAIN, context.widgetId);
  context.setHomeMenu(mainMenu);
}

/**
 * Create a HomeMenu from menu configuration
 */
export function createMenuFromConfig(
  screenId: string,
  widgetId: string,
  submenuKey?: string
): HomeMenu {
  const config = menuRegistry[screenId];
  if (!config) {
    // Fallback to main menu
    return createMenuFromConfig(SYSTEM_IDS.MAIN, widgetId);
  }

  // Get menu items (from submenu if specified)
  const menuConfig = submenuKey && config.submenus?.[submenuKey]
    ? config.submenus[submenuKey]
    : config;

  const setHomeMenu: setHomeMenuFn = (menu) => {
    const widget = getWidgetByID(widgetId);
    widget.store.setState((state: any) => ({
      ...state,
      currentMenu: menu
    }));
  };

  // Convert MenuItemConfig to HomeItem (icon as string, will be rendered in component)
  const items = menuConfig.items.map((itemConfig) => ({
    icon: itemConfig.icon || undefined, // Keep as string, render in component
    text: itemConfig.text,
    fn: setHomeMenu => {
      const context: MenuActionContext = {
        setHomeMenu,
        widgetId,
        screenId
      };
      itemConfig.action(context);
    }
  }));

  const menu: HomeMenu = {
    items,
    text: menuConfig.title,
    icon: menuConfig.icon || undefined, // Keep as string, render in component
    showBack: !!submenuKey,
    backFn: submenuKey && config.submenus?.[submenuKey]?.backTo
      ? (setHomeMenu) => {
          const parentMenu = createMenuFromConfig(
            config.submenus![submenuKey].backTo!,
            widgetId
          );
          setHomeMenu(parentMenu);
        }
      : undefined
  };

  return menu;
}

