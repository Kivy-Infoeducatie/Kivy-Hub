import { createMenuFromConfig } from './menu-registry';
import { HomeMenu, setHomeMenuFn } from './menu-types';
import { getWidgetByID } from '@/components/playground-new/store';
import { SYSTEM_IDS } from '@/components/playground-new/types';

/**
 * Get the current screen ID from the root navigator
 */
function getCurrentScreenId(): string {
  try {
    const rootNav = getWidgetByID(SYSTEM_IDS.ROOT_NAV);
    const state = rootNav.store.getState();
    return (state as any).selected || SYSTEM_IDS.MAIN;
  } catch {
    return SYSTEM_IDS.MAIN;
  }
}

/**
 * Create a menu factory function for a specific widget instance
 */
export function createMenuFactory(widgetId: string) {
  return (screenId?: string): HomeMenu => {
    const contextScreenId = screenId || getCurrentScreenId();
    return createMenuFromConfig(contextScreenId, widgetId);
  };
}

/**
 * Subscribe to screen changes and update menu accordingly
 * Note: This is a helper function that can be called from useEffect
 * It returns the unsubscribe function
 */
export function subscribeToScreenChanges(
  widgetId: string,
  onMenuChange: (menu: HomeMenu) => void
): () => void {
  const rootNav = getWidgetByID(SYSTEM_IDS.ROOT_NAV);
  const factory = createMenuFactory(widgetId);

  // Initial menu
  const initialMenu = factory();
  onMenuChange(initialMenu);

  // Subscribe to screen changes using Zustand's subscribe API
  let previousScreen = getCurrentScreenId();
  
  // Use Zustand's subscribe method (listener receives full state)
  const unsubscribe = rootNav.store.subscribe(() => {
    const currentScreen = getCurrentScreenId();
    if (currentScreen !== previousScreen) {
      previousScreen = currentScreen;
      const newMenu = factory(currentScreen);
      onMenuChange(newMenu);
    }
  });

  return unsubscribe;
}

