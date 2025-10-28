import { Widget } from '@/components/playground-new/types';
import {
  ComponentPropsWithoutRef,
  RefObject,
  useImperativeHandle,
  useState
} from 'react';
import { cn } from '@/lib/utils';

export interface WidgetGroupRef {
  addWidget: (widget: Widget) => void;
  removeWidget: (id: string) => void;
  getWidget: (id: string) => Widget | undefined;
}

type DivProps = ComponentPropsWithoutRef<'div'>;

interface WidgetGroup extends DivProps {
  globalName?: string;
  initialWidgets?: Record<string, Widget>;
  ref?: RefObject<WidgetGroupRef>;
  hidden?: boolean;
}

export function WidgetGroup({ initialWidgets, ref, ...props }: WidgetGroup) {
  const [widgets, setWidgets] = useState<Record<string, Widget>>(
    initialWidgets ?? {}
  );

  function addWidget(widget: Widget) {
    setWidgets((prev) => ({ ...prev, [widget.id]: widget }));
  }

  function removeWidget(id: string) {
    setWidgets((prev) => {
      const { [id]: removed, ...rest } = prev;
      return rest;
    });
  }

  function getWidget(id: string) {
    return widgets[id];
  }

  useImperativeHandle(ref, () => ({
    addWidget,
    removeWidget,
    getWidget
  }));

  return (
    <div {...props} className={cn(props.className, props.hidden && 'hidden')}>
      {Object.keys(widgets).map((key) => {
        const widget = widgets[key];

        return <widget.Component key={key} {...widget.data} />;
      })}
      the middle
    </div>
  );
}
