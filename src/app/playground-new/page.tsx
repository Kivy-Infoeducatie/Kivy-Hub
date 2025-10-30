'use client';

import { RootRenderer } from '@/components/playground-new/root-renderer';
import { HandTrackingProvider } from '@/lib/core/hand-tracking/hand-tracking-context';

export default function PlaygroundPage() {
  return (
    <HandTrackingProvider>
      <RootRenderer />
    </HandTrackingProvider>
  );
}
