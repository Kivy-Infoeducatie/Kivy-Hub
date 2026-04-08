import { create } from 'zustand';
import { produce } from 'immer';

interface Widget {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  props: Record<string, any>;
}

interface WidgetsState {
  widgetMap: Record<string, Widget>;
  addWidget: (widget: Widget) => void;
  moveWidget: (id: string, x: number, y: number) => void;
  removeWidget: (id: string) => void;
}

const useWidgetsStore = create<WidgetsState>((set: (a: any) => void) => ({
  widgetMap: {},
  addWidget: (widget: Widget) =>
    set((state: WidgetsState) =>
      produce(state, (draft: WidgetsState) => {
        draft.widgetMap[widget.id] = widget;
      })
    ),
  moveWidget: (id: string, x: number, y: number) =>
    set((state: WidgetsState) =>
      produce(state, (draft: WidgetsState) => {
        if (draft.widgetMap[id]) {
          draft.widgetMap[id].x = x;
          draft.widgetMap[id].y = y;
        }
      })
    ),
  removeWidget: (id: string) =>
    set((state: WidgetsState) =>
      produce(state, (draft: WidgetsState) => {
        delete draft.widgetMap[id];
      })
    ),
}));

export default useWidgetsStore;
