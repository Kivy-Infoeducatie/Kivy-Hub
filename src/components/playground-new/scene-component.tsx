import { getWidgetByID } from '@/components/playground-new/store';

export function SceneComponent({ id }: { id: string }) {
  try {
    const store = getWidgetByID(id);

    return <store.Component {...store.data((s) => s)} />;
  } catch (e) {
    console.error(e);

    return <></>;
  }
}
