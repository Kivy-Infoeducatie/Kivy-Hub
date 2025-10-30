import { ComponentState } from '@/components/playground-new/store';
import { StateCreator } from 'zustand/index';

const stateFn: StateCreator<Partial<ComponentState>> = (set, get) => ({
  add() {
    set((s) => ({
      count: s.count + 1
    }));
  },
  subtract() {
    set((s) => ({
      count: s.count - 1
    }));
  },
  count: 3
});

function Component({
  add,
  subtract,
  count
}: {
  add: () => void;
  subtract: () => void;
  count: number;
}) {
  console.log('render');

  return (
    <div>
      <button onClick={add}>Add</button>
      <label>{count}</label>
      <button onClick={subtract}>Subtract</button>
    </div>
  );
}

export const Counter = {
  stateFn,
  Component
};
