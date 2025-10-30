'use client';

import { RootRenderer } from '@/components/playground-new/root-renderer';
import { createWidget } from '@/components/playground-new/store';
import { Counter } from '@/components/playground-new/counter';
import { SYSTEM_IDS } from '@/components/playground-new/types';

export default function PlaygroundPage() {
  const handleAddCounter = () => {
    // Create a new counter widget in the main screen
    const counterId = createWidget(Counter, SYSTEM_IDS.MAIN);
    console.log('Created counter with ID:', counterId);
  };

  return (
    <div>
      <RootRenderer />
      <div style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: '1rem' }}>
        <button onClick={handleAddCounter}>
          Add Counter to Main
        </button>
      </div>
    </div>
  );
}
