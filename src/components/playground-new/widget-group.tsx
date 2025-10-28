import { getWidgetByID } from '@/components/playground-new/store';

export function WidgetGroup({ childrenIDs }: { childrenIDs: string[] }) {
  return (
    <div>
      {childrenIDs.map((childID) => {
        const widget = getWidgetByID(childID);

        return <widget.Component {...widget.data.getState()} key={childID} />;
      })}
    </div>
  );
}
