import { StateCreator } from 'zustand';
import { BaseWidgetState, WidgetDefinition } from '@/components/playground-new/types';
import { Minus, Plus } from 'lucide-react';
import { Movable } from '@/components/playground-new/core/movable';
import { getPositionRef } from '@/components/playground-new/core/position-utils';

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

function Component({ add, subtract, count, id, x, y }: CounterState) {
  const positionRef = getPositionRef(id);

  const counterContent = (
    <div
      data-id={id}
      data-widget-type="counter"
      className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 shadow-2xl"
      style={{
        width: '200px',
        userSelect: 'none'
      }}
    >
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          Counter
        </h3>
        <div className="mt-2 text-6xl font-bold text-gray-900">
          {count}
        </div>
      </div>
      
      <div className="flex gap-3 w-full">
        <button
          onClick={subtract}
          className="flex-1 flex items-center justify-center rounded-2xl bg-red-500 hover:bg-red-600 active:bg-red-700 p-4 text-white transition-colors duration-150"
        >
          <Minus className="w-8 h-8" />
        </button>
        <button
          onClick={add}
          className="flex-1 flex items-center justify-center rounded-2xl bg-green-500 hover:bg-green-600 active:bg-green-700 p-4 text-white transition-colors duration-150"
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>
    </div>
  );

  // Wrap with Movable for drag functionality
  if (positionRef) {
    return (
      <Movable
        initialPos={{ x, y }}
        positionRef={positionRef}
      >
        {counterContent}
      </Movable>
    );
  }

  return counterContent;
}

export const Counter: WidgetDefinition<CounterState> = {
  stateFn,
  Component
};
