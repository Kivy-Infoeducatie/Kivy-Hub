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
  selectedWidget: string;
  setSelectedWidget: (id: string) => void;
}

type DivProps = ComponentPropsWithoutRef<'div'>;

interface WidgetGroup extends DivProps {
  globalName?: string;
  initialWidgets?: Record<string, Widget>;
  ref?: RefObject<WidgetGroupRef>;
  hidden?: boolean;
  initialSelectedWidget: string;
}

export function KivyNavigation({
  initialWidgets,
  ref,
  initialSelectedWidget,
  ...props
}: WidgetGroup) {
  const [selectedWidget, setSelectedWidget] = useState<string>(
    initialSelectedWidget
  );

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
    getWidget,
    selectedWidget,
    setSelectedWidget
  }));

  return (
    <div {...props} className={cn(props.className, props.hidden && 'hidden')}>
      {Object.keys(widgets).map((key) => {
        const widget = widgets[key];

        return (
          <widget.Component
            key={key}
            {...widget.data}
            hidden={selectedWidget !== key}
          />
        );
      })}
    </div>
  );
}
