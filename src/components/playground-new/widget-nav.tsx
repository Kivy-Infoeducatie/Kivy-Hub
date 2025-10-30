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
  },
  selected: '',
  setSelected(id: string) {
    set((s) => ({
      selected: id
    }));
  }
});

function Component({
  childrenIDs,
  selected,
  id
}: {
  childrenIDs: string[];
  selected: string;
  id: string;
}) {
  return (
    <div data-id={id} data-selected={selected}>
      {childrenIDs.map(
        (childID) =>
          selected === childID && <SceneComponent id={childID} key={childID} />
      )}
    </div>
  );
}

export const WidgetNav = {
  stateFn,
  Component
};
