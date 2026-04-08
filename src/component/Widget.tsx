import React from 'react';
import useWidgetsStore from '../state/useWidgetsStore';
import { getComponent } from '../registry/componentRegistry';

interface WidgetProps {
  id: string;
}

const Widget: React.FC<WidgetProps> = ({ id }) => {
  const widget = useWidgetsStore(state => state.widgetMap[id]);
  const Component = widget ? getComponent(widget.type) : null;

  if (!widget || !Component) return null;

  return (
    <div style={{
      position: 'absolute',
      top: widget.y,
      left: widget.x,
      width: widget.width,
      height: widget.height,
    }}>
      <Component {...widget.props} />
    </div>
  );
};

export default Widget;
