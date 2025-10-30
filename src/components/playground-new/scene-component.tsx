import { getWidgetByID } from '@/components/playground-new/store';
import { Movable } from '@/components/playground-new/core/movable';
import { getPositionRef } from '@/components/playground-new/core/position-utils';

/**
 * SceneComponent - Renders a widget by its ID
 * This component looks up the widget in the registry and renders it with its current state
 * Automatically wraps with Movable if widget has position
 */
export function SceneComponent({ id }: { id: string }) {
  try {
    const widget = getWidgetByID(id);
    
    // Use the widget's store as a hook to subscribe to state changes
    const state = widget.store((s) => s);
    
    // Get position ref for movable behavior
    const positionRef = getPositionRef(id);
    
    // Check if widget has position properties
    const hasPosition = state.x !== undefined && state.y !== undefined;
    
    // Render widget with Movable wrapper if it has position
    if (hasPosition && positionRef) {
      return (
        <Movable
          initialPos={{ x: state.x, y: state.y }}
          positionRef={positionRef}
        >
          <widget.Component {...state} />
        </Movable>
      );
    }
    
    // Render widget directly if no position
    return <widget.Component {...state} />;
  } catch (error) {
    // In development, show detailed error
    if (process.env.NODE_ENV === 'development') {
      console.error(`Failed to render widget "${id}":`, error);
      return (
        <div
          style={{
            padding: '1rem',
            border: '2px solid red',
            borderRadius: '4px',
            backgroundColor: '#fee'
          }}
        >
          <strong>Error rendering widget "{id}"</strong>
          <pre style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      );
    }
    
    // In production, fail silently
    return null;
  }
}
