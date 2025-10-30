import { StateCreator } from 'zustand';
import { BaseWidgetState, WidgetDefinition } from '@/components/playground-new/types';
import { SceneComponent } from '@/components/playground-new/scene-component';

// Widget custom state for groups
// Note: We include childrenIDs here because this widget modifies it
interface WidgetGroupCustomState {
  childrenIDs?: string[]; // Optional because base state provides default
  addChild: (id: string) => void;
  removeChild: (id: string) => void;
}

// Full widget state (base + custom)
interface WidgetGroupState extends BaseWidgetState {
  addChild: (id: string) => void;
  removeChild: (id: string) => void;
}

const stateFn: StateCreator<WidgetGroupCustomState> = (set) => ({
  addChild(id: string) {
    set((state) => ({
      childrenIDs: [...(state.childrenIDs || []), id]
    }));
  },
  removeChild(id: string) {
    set((state) => ({
      childrenIDs: (state.childrenIDs || []).filter((childId) => childId !== id)
    }));
  }
});

function Component({ childrenIDs, id }: WidgetGroupState) {
  return (
    <div data-id={id} data-widget-type="group">
      {childrenIDs.map((childID) => (
        <SceneComponent id={childID} key={childID} />
      ))}
    </div>
  );
}

export const WidgetGroup: WidgetDefinition<WidgetGroupState> = {
  stateFn,
  Component
};
