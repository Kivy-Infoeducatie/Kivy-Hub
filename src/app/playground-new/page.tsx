'use client';

import { RootRenderer } from '@/components/playground-new/root-renderer';
import { createWidget } from '@/components/playground-new/store';
import { Counter } from '@/components/playground-new/counter';
import { SYSTEM_IDS } from '@/components/playground-new/types';
import { HandTrackingProvider } from '@/lib/core/hand-tracking/hand-tracking-context';

export default function PlaygroundPage() {
  const handleAddCounter = () => {
    // Create a new counter widget in the main screen with position
    const counterId = createWidget(Counter, SYSTEM_IDS.MAIN, undefined, {
      x: Math.random() * 400 + 100,
      y: Math.random() * 400 + 100
    });
    console.log('Created counter with ID:', counterId);
  };

  return (
    <HandTrackingProvider>
      <RootRenderer />
      <div style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: '1rem', position: 'relative', zIndex: 1000 }}>
        <button onClick={handleAddCounter}>
          Add Counter to Main
        </button>
      </div>
    </HandTrackingProvider>
  );
}
