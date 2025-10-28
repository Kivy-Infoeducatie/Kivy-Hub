import { getWidgetByID } from '@/components/playground-new/store';

export function SceneComponent({ id }: { id: string }) {
  const store = getWidgetByID(id);

  return <store.Component {...store.data} />;
}
