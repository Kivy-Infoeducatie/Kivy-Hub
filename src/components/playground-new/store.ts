import { create, StateCreator, type StoreApi, UseBoundStore } from 'zustand';
import { v4 as uuid } from 'uuid';
import { FC } from 'react';
import { WidgetGroup } from '@/components/playground-new/widget-group';
import { WidgetNav } from '@/components/playground-new/widget-nav';
import { Counter } from '@/components/playground-new/counter';
import { NavBar } from '@/components/playground-new/nav-bar';

export interface PlainComponentState {
  id: string;
  parentID: string;
  childrenIDs: string[];
}

export type ComponentState = PlainComponentState & Record<string, any>;

type RegistryStore = Record<
  string,
  {
    data: UseBoundStore<StoreApi<ComponentState>>;
    Component: FC<any>;
  }
>;

const registry: RegistryStore = {};

function initPlayground() {
  createWidget(WidgetGroup, '', 'root');
  createWidget(NavBar, 'root', 'nav-bar');
  createWidget(WidgetNav, 'root', 'root-nav');
  createWidget(WidgetGroup, 'root-nav', 'main');
  createWidget(WidgetGroup, 'root-nav', 'calibration');
  createWidget(Counter, 'main', 'home-button');
}

initPlayground();

export function getWidgetByID(id: string) {
  if (!registry[id]) {
    console.log(registry);
    throw new Error(`Store with ID ${id} not found`);
  }

  return registry[id];
}

export function createWidget(
  {
    stateFn,
    Component
  }: { stateFn: StateCreator<Partial<ComponentState>>; Component: FC<any> },
  parentID: string = 'root',
  id: string = uuid()
) {
  if (registry[id]) {
    throw new Error(`Store with ID ${id} already exists`);
  }

  if (!registry[parentID] && parentID !== '') {
    throw new Error(`Store with ID ${parentID} not found`);
  }

  registry[id] = {
    data: create((setState, getState, store) => ({
      id,
      childrenIDs: [],
      parentID,
      ...stateFn(setState, getState, store)
    })),
    Component
  };

  if (parentID !== '') {
    registry[parentID].data.getState().addChild(id);
  }

  return id;
}

export function deleteWidget(id: string) {
  if (!registry[id]) {
    throw new Error(`Store with ID ${id} not found`);
  }

  const parentID = registry[id].data.getState().parentID;

  if (parentID) {
    registry[parentID].data.getState().removeChild(id);
  }

  delete registry[id];
}
