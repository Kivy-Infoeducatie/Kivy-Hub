import { create, StateCreator, type StoreApi } from 'zustand';
import { v4 as uuid } from 'uuid';
import { FC } from 'react';

interface PlainComponentState {
  id: string;
  parentID: string;
  children: string[];
}

type ComponentState = PlainComponentState & Record<string, any>;

type RegistryStore = Record<
  string,
  {
    data: StoreApi<ComponentState>;
    Component: FC<any>;
  }
>;

const registry: RegistryStore = {};

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
}

export function deleteWidget(id: string) {
  if (!registry[id]) {
    throw new Error(`Store with ID ${id} not found`);
  }

  delete registry[id];
}
