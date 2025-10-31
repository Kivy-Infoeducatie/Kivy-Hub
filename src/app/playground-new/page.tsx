'use client';

import { RootRenderer } from '@/components/playground-new/root-renderer';
import { HandTrackingProvider } from '@/lib/core/hand-tracking/hand-tracking-context';
import { createWidget } from '@/components/playground-new/store';
import { Counter } from '@/components/playground-new/counter';
import { Timer } from '@/components/playground-new/timer';
import { SYSTEM_IDS } from '@/components/playground-new/types';

export default function PlaygroundPage() {
  const handleAddCounter = () => {
    // Create a new counter widget in the main screen with position
    const counterId = createWidget(Counter, SYSTEM_IDS.MAIN, undefined, {
      x: Math.random() * 400 + 100,
      y: Math.random() * 400 + 100
    });
    console.log('Created counter with ID:', counterId);
  };

  const handleAddTimer = () => {
    // Create a new timer widget in the main screen with position
    const timerId = createWidget(Timer, SYSTEM_IDS.MAIN, undefined, {
      x: Math.random() * 400 + 100,
      y: Math.random() * 400 + 100
    });
    console.log('Created timer with ID:', timerId);
  };

  return (
    <HandTrackingProvider>
      <RootRenderer />
      <div
        style={{
          padding: '1rem',
          borderTop: '1px solid #ccc',
          marginTop: '1rem',
          position: 'relative',
          zIndex: 1000,
          display: 'flex',
          gap: '1rem'
        }}
      >
        <button
          onClick={handleAddCounter}
          className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        >
          Add Counter
        </button>
        <button
          onClick={handleAddTimer}
          className='rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600'
        >
          Add Timer
        </button>
      </div>
    </HandTrackingProvider>
  );
}
