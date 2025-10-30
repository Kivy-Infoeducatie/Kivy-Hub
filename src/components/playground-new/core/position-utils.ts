import { RefObject, MutableRefObject } from 'react';
import { Point } from '@/lib/types';

// Registry to map widget ID to position ref
const positionRegistry = new Map<string, MutableRefObject<Point>>();

/**
 * Create a position ref for a widget
 * @param widgetId - The widget ID
 * @param initialPosition - Initial x, y coordinates
 * @returns Position ref for the widget
 */
export function createPositionRef(
  widgetId: string,
  initialPosition: Point
): MutableRefObject<Point> {
  const ref: MutableRefObject<Point> = {
    current: { ...initialPosition }
  };
  
  positionRegistry.set(widgetId, ref);
  return ref;
}

/**
 * Get position ref for a widget
 * @param widgetId - The widget ID
 * @returns Position ref or undefined if not found
 */
export function getPositionRef(
  widgetId: string
): MutableRefObject<Point> | undefined {
  return positionRegistry.get(widgetId);
}

/**
 * Update widget position without triggering re-render
 * @param widgetId - The widget ID
 * @param newPosition - New x, y coordinates
 * @param element - Optional DOM element to update style
 */
export function updatePosition(
  widgetId: string,
  newPosition: Point,
  element?: HTMLElement | null
): void {
  const positionRef = positionRegistry.get(widgetId);
  
  if (!positionRef) {
    console.warn(`Position ref not found for widget ${widgetId}`);
    return;
  }
  
  // Update ref (no re-render)
  positionRef.current = { ...newPosition };
  
  // Update DOM directly if element provided (GPU-optimized)
  if (element) {
    element.style.translate = `${newPosition.x}px ${newPosition.y}px`;
  }
}

/**
 * Delete position ref for a widget
 * @param widgetId - The widget ID
 */
export function deletePositionRef(widgetId: string): void {
  positionRegistry.delete(widgetId);
}

/**
 * Get all position refs (for debugging)
 */
export function getAllPositionRefs(): Map<string, MutableRefObject<Point>> {
  return positionRegistry;
}

