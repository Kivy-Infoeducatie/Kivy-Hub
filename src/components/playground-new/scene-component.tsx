import { getWidgetByID } from '@/components/playground-new/store';

/**
 * SceneComponent - Renders a widget by its ID
 * This component looks up the widget in the registry and renders it with its current state
 */
export function SceneComponent({ id }: { id: string }) {
  try {
    const widget = getWidgetByID(id);
    
    // Use the widget's store as a hook to subscribe to state changes
    const state = widget.store((s) => s);
    
    // Render the widget's Component with its current state
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
