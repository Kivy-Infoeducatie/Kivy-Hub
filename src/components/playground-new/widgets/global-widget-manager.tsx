import { createContext, ReactNode, useContext, useRef } from 'react';
import { Widget } from '@/components/playground-new/types';

export interface IGlobalWidgetManagerContext {}

const globalWidgetManagerContext = createContext<
  IGlobalWidgetManagerContext | undefined
>();

export function useGlobalWidgetManager() {
  if (!globalWidgetManagerContext) {
    throw new Error(
      'useGlobalWidgetManager must be used within a GlobalWidgetManagerProvider'
    );
  }

  return useContext(globalWidgetManagerContext);
}

export function GlobalWidgetManagerProvider({
  children
}: {
  children: ReactNode;
}) {
  const globalWidgetRegistry = useRef<Record<string, Widget>>({});

  function getWidget(id: string) {
    return globalWidgetRegistry.current[id];
  }

  function addWidget(name: string) {
    const ref = createRef<any>();

    globalWidgetRegistry.current[name] = ref;

    return ref;
  }

  function removeWidget(id: string) {
    delete globalWidgetRegistry.current[id];
  }

  return (
    <globalWidgetManagerContext.Provider
      value={{
        getWidget,
        addWidget,
        removeWidget
      }}
    >
      {children}
    </globalWidgetManagerContext.Provider>
  );
}
