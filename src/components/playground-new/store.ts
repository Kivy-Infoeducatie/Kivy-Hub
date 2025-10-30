import { create, type StoreApi, UseBoundStore } from 'zustand';
import { v4 as uuid } from 'uuid';
import {
  BaseWidgetState,
  WidgetDefinition,
  WidgetInstance,
  SYSTEM_IDS
} from '@/components/playground-new/types';
import { createPositionRef, deletePositionRef } from '@/components/playground-new/core/position-utils';

// Registry type that stores all widget instances
type Registry = Map<string, WidgetInstance<any>>;

// The widget registry
const registry: Registry = new Map();

/**
 * Get a widget instance by its ID
 * @param id - The widget ID
 * @returns The widget instance
 * @throws Error if widget not found
 */
export function getWidgetByID<T extends BaseWidgetState = BaseWidgetState>(
  id: string
): WidgetInstance<T> {
  const widget = registry.get(id);
  
  if (!widget) {
    const availableIds = Array.from(registry.keys()).join(', ');
    throw new Error(
      `Widget "${id}" not found. Available widgets: [${availableIds}]`
    );
  }

  return widget as WidgetInstance<T>;
}

/**
 * Create a new widget and add it to the registry
 * @param definition - The widget definition with stateFn and Component
 * @param parentID - The parent widget ID (empty string for root)
 * @param id - Optional custom ID (auto-generated UUID if not provided)
 * @param initialPosition - Optional initial position {x, y} (defaults to {x: 0, y: 0})
 * @returns The created widget's ID
 */
export function createWidget<T extends BaseWidgetState>(
  definition: WidgetDefinition<T>,
  parentID: string = SYSTEM_IDS.ROOT,
  id: string = uuid(),
  initialPosition?: { x: number; y: number }
): string {
  const { stateFn, Component } = definition;

  // Check if ID already exists
  if (registry.has(id)) {
    throw new Error(`Widget with ID "${id}" already exists`);
  }

  // Check if parent exists (except for root which has empty parent)
  if (parentID !== '' && !registry.has(parentID)) {
    throw new Error(`Parent widget "${parentID}" not found`);
  }

  // Set default position
  const position = initialPosition ?? { x: 0, y: 0 };

  // Create position ref (for movable widgets without re-renders)
  createPositionRef(id, position);

  // Create the Zustand store with base state + custom state
  const store = create<T>((set, get, api) => {
    // Base state is automatically provided
    const baseState: BaseWidgetState = {
      id,
      childrenIDs: [],
      parentID,
      x: position.x,
      y: position.y
    };

    // Custom state from the widget definition (only widget-specific properties)
    const customState = stateFn(set, get, api) as any;

    // Merge base state with custom state
    return {
      ...baseState,
      ...customState
    } as T;
  });

  // Register the widget instance
  registry.set(id, {
    store: store as UseBoundStore<StoreApi<any>>,
    Component: Component as any
  });

  // Add this widget to parent's children
  if (parentID !== '') {
    const parent = registry.get(parentID);
    if (parent) {
      const parentState = parent.store.getState();
      if (typeof parentState.addChild === 'function') {
        parentState.addChild(id);
      }
    }
  }

  return id;
}

/**
 * Delete a widget and remove it from its parent
 * @param id - The widget ID to delete
 */
export function deleteWidget(id: string): void {
  if (!registry.has(id)) {
    throw new Error(`Widget "${id}" not found`);
  }

  const widget = registry.get(id)!;
  const state = widget.store.getState();
  const parentID = state.parentID;

  // Remove from parent's children list
  if (parentID && registry.has(parentID)) {
    const parent = registry.get(parentID)!;
    const parentState = parent.store.getState();
    if (typeof parentState.removeChild === 'function') {
      parentState.removeChild(id);
    }
  }

  // Clean up position ref
  deletePositionRef(id);

  // Delete from registry
  registry.delete(id);
}

/**
 * Initialize the playground with default widgets
 * Call this function to set up the initial widget tree
 */
export function initPlayground(): void {
  // Import widgets here to avoid circular dependencies
  const { WidgetGroup } = require('@/components/playground-new/widget-group');
  const { WidgetNav } = require('@/components/playground-new/widget-nav');
  const { NavBar } = require('@/components/playground-new/nav-bar');
  const { Counter } = require('@/components/playground-new/counter');

  // Create the widget tree
  createWidget(WidgetGroup, '', SYSTEM_IDS.ROOT);
  createWidget(NavBar, SYSTEM_IDS.ROOT, SYSTEM_IDS.NAV_BAR);
  createWidget(WidgetNav, SYSTEM_IDS.ROOT, SYSTEM_IDS.ROOT_NAV);
  
  // Create screen widgets (they're independent, not children of nav)
  createWidget(WidgetGroup, SYSTEM_IDS.ROOT, SYSTEM_IDS.MAIN);
  createWidget(WidgetGroup, SYSTEM_IDS.ROOT, SYSTEM_IDS.CALIBRATION);
  
  // Create widgets within screens
  createWidget(Counter, SYSTEM_IDS.MAIN, SYSTEM_IDS.HOME_BUTTON);
  
  // Set initial navigation to main screen
  const { WidgetNavState } = require('@/components/playground-new/widget-nav');
  const rootNav = getWidgetByID<typeof WidgetNavState>(SYSTEM_IDS.ROOT_NAV);
  const state = rootNav.store.getState();
  if (typeof state.setSelected === 'function') {
    state.setSelected(SYSTEM_IDS.MAIN);
  }
}

// Initialize on module load
initPlayground();
