import { StateCreator } from 'zustand';
import { BaseWidgetState, WidgetDefinition } from '@/components/playground-new/types';
import { SceneComponent } from '@/components/playground-new/scene-component';

// WidgetNav custom state - just navigation, no child management
interface WidgetNavCustomState {
  selected: string;
  setSelected: (id: string) => void;
}

// Full WidgetNav state (base + custom) - exported for use in other components
export interface WidgetNavState extends BaseWidgetState {
  selected: string;
  setSelected: (id: string) => void;
}

const stateFn: StateCreator<WidgetNavCustomState> = (set) => ({
  selected: '',
  setSelected(id: string) {
    set({ selected: id });
  }
});

function Component({ selected, id }: WidgetNavState) {
  return (
    <div data-id={id} data-widget-type="nav" data-selected={selected}>
      {selected && <SceneComponent id={selected} />}
    </div>
  );
}

export const WidgetNav: WidgetDefinition<WidgetNavState> = {
  stateFn,
  Component
};
