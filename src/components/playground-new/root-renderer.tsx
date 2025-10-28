import { SceneComponent } from '@/components/playground-new/scene-component';
import { useEffect } from 'react';

export function RootRenderer() {
  useEffect(() => {}, []);

  return <SceneComponent id='root' />;
}
