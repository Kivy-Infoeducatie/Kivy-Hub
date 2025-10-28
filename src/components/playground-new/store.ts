import { create, StateCreator, type StoreApi, UseBoundStore } from 'zustand';
import { v4 as uuid } from 'uuid';
import { FC } from 'react';
import { WidgetGroup } from '@/components/playground-new/widget-group';

interface PlainComponentState {
  id: string;
  parentID: string;
  childrenIDs: string[];
}

type ComponentState = PlainComponentState & Record<string, any>;

type RegistryStore = Record<
  string,
  {
    data: UseBoundStore<StoreApi<ComponentState>>;
    Component: FC<any>;
  }
>;

const registry: RegistryStore = {};

createWidget(
  (set) => ({
    id: 'root',
    childrenIDs: [],
    parentID: '',
    addChild(id: string) {
      set((s) => ({
        childrenIDs: [...s.childrenIDs, id]
      }));
    },
    removeChild(id: string) {
      set((s) => ({
        childrenIDs: s.childrenIDs.filter((i) => i !== id)
      }));
    }
  }),
  WidgetGroup,
  'root'
);

export function getWidgetByID(id: string) {
  if (!registry[id]) {
    throw new Error(`Store with ID ${id} not found`);
  }

  return registry[id];
}

export function createWidget(
  stateFn: StateCreator<ComponentState>,
  Component: FC<any>,
  id: string = uuid()
) {
  if (registry[id]) {
    throw new Error(`Store with ID ${id} already exists`);
  }

  registry[id] = {
    data: create(stateFn),
    Component
  };

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
