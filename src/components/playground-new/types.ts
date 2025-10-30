import { FC } from 'react';
import { StateCreator, StoreApi, UseBoundStore } from 'zustand';

// Base state that all widgets have (automatically injected by the store)
export interface BaseWidgetState {
  id: string;
  parentID: string;
  childrenIDs: string[];
  // Position properties (all widgets have a position)
  x: number;
  y: number;
}

// Widget state can be extended with custom properties
export type WidgetState<T = Record<string, never>> = BaseWidgetState & T;

// Widget definition structure
// TCustom = only the custom properties (base state is added automatically)
// TFull = base state + custom properties (used for Component props)
export interface WidgetDefinition<
  TFull extends BaseWidgetState = BaseWidgetState,
  TCustom = Omit<TFull, keyof BaseWidgetState>
> {
  stateFn: StateCreator<TCustom>;
  Component: FC<TFull>;
}

// Widget instance in the registry
export interface WidgetInstance<T extends BaseWidgetState = BaseWidgetState> {
  store: UseBoundStore<StoreApi<T>>;
  Component: FC<T>;
}

// System widget IDs (namespaced to avoid collisions)
export const SYSTEM_IDS = {
  ROOT: 'sys:root',
  NAV_BAR: 'sys:nav-bar',
  ROOT_NAV: 'sys:root-nav',
  MAIN: 'sys:main',
  CALIBRATION: 'sys:calibration',
  HOME_BUTTON: 'sys:home-button'
} as const;

export type SystemId = typeof SYSTEM_IDS[keyof typeof SYSTEM_IDS];
