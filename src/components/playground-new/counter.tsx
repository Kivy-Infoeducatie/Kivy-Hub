import { StateCreator } from 'zustand';
import { BaseWidgetState, WidgetDefinition } from '@/components/playground-new/types';

// Counter widget custom state (base state is added automatically)
interface CounterCustomState {
  count: number;
  add: () => void;
  subtract: () => void;
}

// Full counter state (base + custom)
interface CounterState extends BaseWidgetState {
  count: number;
  add: () => void;
  subtract: () => void;
}

const stateFn: StateCreator<CounterCustomState> = (set) => ({
  count: 0,
  add() {
    set((state) => ({
      count: (state as any).count + 1
    }));
  },
  subtract() {
    set((state) => ({
      count: (state as any).count - 1
    }));
  }
});

function Component({ add, subtract, count, id }: CounterState) {
  return (
    <div data-id={id} data-widget-type="counter">
      <button onClick={add}>Add</button>
      <span style={{ margin: '0 1rem' }}>{count}</span>
      <button onClick={subtract}>Subtract</button>
    </div>
  );
}

export const Counter: WidgetDefinition<CounterState> = {
  stateFn,
  Component
};
