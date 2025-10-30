import { ComponentState } from '@/components/playground-new/store';
import { StateCreator } from 'zustand/index';
import { SceneComponent } from './scene-component';

const stateFn: StateCreator<Partial<ComponentState>> = (set) => ({
  addChild(id: string) {
    set((s) => ({
      childrenIDs: [...s.childrenIDs!, id]
    }));
  },
  removeChild(id: string) {
    set((s) => ({
      childrenIDs: s.childrenIDs!.filter((i) => i !== id)
    }));
  }
});

function Component({ childrenIDs, id }: { childrenIDs: string[]; id: string }) {
  return (
    <div data-id={id}>
      {childrenIDs.map((childID) => (
        <SceneComponent id={childID} key={childID} />
      ))}
    </div>
  );
}

export const WidgetGroup = {
  stateFn,
  Component
};
