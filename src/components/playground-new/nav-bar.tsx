import { StateCreator } from 'zustand';
import { BaseWidgetState, WidgetDefinition, SYSTEM_IDS } from '@/components/playground-new/types';
import { getWidgetByID } from '@/components/playground-new/store';
import { WidgetNavState } from './widget-nav';

// NavBar has no custom state (only base state, which is added automatically)
type NavBarCustomState = Record<string, never>;

// Full NavBar state (just base state)
type NavBarState = BaseWidgetState;

const stateFn: StateCreator<NavBarCustomState> = () => ({});

function Component({ id }: NavBarState) {
  const handleNavigate = (screenId: string) => {
    try {
      const rootNav = getWidgetByID<WidgetNavState>(SYSTEM_IDS.ROOT_NAV);
      const state = rootNav.store.getState();
      if (typeof state.setSelected === 'function') {
        state.setSelected(screenId);
      }
    } catch (error) {
      console.error('Failed to navigate:', error);
    }
  };

  return (
    <div data-id={id} data-widget-type="navbar">
      <button onClick={() => handleNavigate(SYSTEM_IDS.MAIN)}>
        Main
      </button>
      <button onClick={() => handleNavigate(SYSTEM_IDS.CALIBRATION)}>
        Calibration
      </button>
    </div>
  );
}

export const NavBar: WidgetDefinition<NavBarState> = {
  stateFn,
  Component
};
