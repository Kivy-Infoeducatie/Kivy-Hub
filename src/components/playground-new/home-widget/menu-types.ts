import { ReactNode } from 'react';

export type setHomeMenuFn = (homeMenu: HomeMenu) => void;

/**
 * Menu item configuration - defines menu item as data
 */
export interface MenuItemConfig {
  icon?: string; // FontAwesome icon class name (e.g., 'fa-timer', 'fa-gears')
  text?: string; // Text label for the item
  action: (context: MenuActionContext) => void; // Action function with context
}

/**
 * Context passed to menu item actions
 */
export interface MenuActionContext {
  setHomeMenu: setHomeMenuFn;
  widgetId: string;
  screenId?: string;
}

/**
 * Home menu structure - used at runtime
 */
export interface HomeMenu {
  items: HomeItem[];
  text?: string;
  icon?: ReactNode | string; // String icon name or ReactNode
  showBack?: boolean;
  backFn?: (setHomeMenu: setHomeMenuFn) => void;
}

/**
 * Home item - runtime menu item
 */
export type HomeItem = {
  icon?: ReactNode | string; // String icon name or ReactNode
  text?: string;
  fn(setHomeMenu: setHomeMenuFn): void;
};

