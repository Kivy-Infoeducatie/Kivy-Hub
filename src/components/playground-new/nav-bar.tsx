import {
  ComponentState,
  getWidgetByID
} from '@/components/playground-new/store';
import { StateCreator } from 'zustand/index';

const stateFn: StateCreator<Partial<ComponentState>> = (set, get) => ({});

function Component() {
  return (
    <div>
      <button
        onClick={() => {
          getWidgetByID('root-nav').data.getState().setSelected('main');
        }}
      >
        set main
      </button>
      <button
        onClick={() => {
          getWidgetByID('root-nav').data.getState().setSelected('calibration');
        }}
      >
        set calib
      </button>
    </div>
  );
}

export const NavBar = {
  stateFn,
  Component
};
