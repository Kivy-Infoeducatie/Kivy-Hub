import { StateCreator } from 'zustand';
import {
  BaseWidgetState,
  WidgetDefinition
} from '@/components/playground-new/types';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import { Movable } from '@/components/playground-new/core/movable';
import { getPositionRef } from '@/components/playground-new/core/position-utils';

interface TimerCustomState {
  initialSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  intervalId: NodeJS.Timeout | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
  setDuration: (seconds: number) => void;
}

type TimerState = BaseWidgetState & TimerCustomState;

const pad = (num: number): string => num.toString().padStart(2, '0');

function formatSeconds(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const secs: number = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

const stateFn: StateCreator<TimerCustomState> = (set, get) => {
  const tick = () => {
    // Access full state (including base state like id)
    const state = get() as any;
    if (state.isRunning && state.remainingSeconds > 0) {
      const newRemaining = state.remainingSeconds - 1;
      
      if (newRemaining === 0) {
        // Timer finished - clear interval and stop
        if (state.intervalId) {
          clearInterval(state.intervalId);
        }
        set({
          remainingSeconds: 0,
          isRunning: false,
          intervalId: null
        });
      } else {
        set({
          remainingSeconds: newRemaining,
          isRunning: true
        });
      }
    } else {
      // Shouldn't be running if we get here, but clear interval just in case
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      set({ intervalId: null, isRunning: false });
    }
  };

  return {
    initialSeconds: 30,
    remainingSeconds: 30,
    isRunning: false,
    intervalId: null,
    start() {
      // Access full state (including base state like id)
      const state = get() as any;
      if (state.remainingSeconds <= 0) return;
      
      // Clear any existing interval
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      
      // Start new interval
      const interval = setInterval(() => {
        tick();
      }, 1000);
      
      // Store interval ID in state
      set({ isRunning: true, intervalId: interval });
    },
    stop() {
      // Access full state (including base state like id)
      const state = get() as any;
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      set({ isRunning: false, intervalId: null });
    },
    reset() {
      // Access full state (including base state like id)
      const state = get() as any;
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      set({ remainingSeconds: 30, initialSeconds: 30, isRunning: false, intervalId: null });
    },
    setDuration(seconds: number) {
      const state = get() as any;
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      set({ initialSeconds: seconds, remainingSeconds: seconds, isRunning: false, intervalId: null });
    }
  };
};

function Component({
  remainingSeconds,
  isRunning,
  start,
  stop,
  reset,
  initialSeconds,
  id,
  x,
  y
}: TimerState) {
  const positionRef = getPositionRef(id);

  const progress = remainingSeconds / initialSeconds;

  const timerContent = (
    <div
      data-id={id}
      data-widget-type='timer'
      className='relative flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-2xl overflow-hidden'
      style={{
        width: '250px',
        userSelect: 'none'
      }}
    >
      {/* Progress bar background */}
      <div
        className='absolute top-0 left-0 h-full transition-all duration-200 ease-linear'
        style={{
          width: `${progress * 100}%`,
          backgroundColor:
            progress > 0.5
              ? '#22c55e'
              : progress > 0.25
                ? '#facc15'
                : '#ef4444',
          opacity: 0.2
        }}
      />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center gap-4'>
        <div className='flex items-center gap-2'>
          <TimerIcon className='h-5 w-5 text-gray-600' />
          <h3 className='text-sm font-semibold tracking-wider text-gray-600 uppercase'>
            Timer
          </h3>
        </div>

        <div className='text-center'>
          <div className='text-5xl font-bold text-gray-900'>
            {formatSeconds(remainingSeconds)}
          </div>
          {remainingSeconds === 0 && (
            <div className='mt-2 text-sm font-semibold text-red-600'>
              Time's up!
            </div>
          )}
        </div>

        {/* Controls */}
        <div className='flex w-full gap-3'>
          <button
            onClick={isRunning ? stop : start}
            disabled={remainingSeconds === 0}
            className='flex flex-1 items-center justify-center rounded-2xl bg-blue-500 p-4 text-white transition-colors duration-150 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {isRunning ? (
              <Pause className='h-6 w-6' />
            ) : (
              <Play className='h-6 w-6' />
            )}
          </button>
          <button
            onClick={reset}
            className='flex items-center justify-center rounded-2xl bg-gray-500 p-4 text-white transition-colors duration-150 hover:bg-gray-600 active:bg-gray-700'
          >
            <RotateCcw className='h-6 w-6' />
          </button>
        </div>
      </div>
    </div>
  );

  // Wrap with Movable for drag functionality
  if (positionRef) {
    return (
      <Movable initialPos={{ x, y }} positionRef={positionRef}>
        {timerContent}
      </Movable>
    );
  }

  return timerContent;
}

export const Timer: WidgetDefinition<TimerState> = {
  stateFn,
  Component
};

