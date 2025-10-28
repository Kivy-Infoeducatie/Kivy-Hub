'use client';

import { RootRenderer } from '@/components/playground-new/root-renderer';
import {
  createWidget,
  deleteWidget,
  getWidgetByID
} from '@/components/playground-new/store';
import { v4 } from 'uuid';

export default function () {
  return (
    <>
      <RootRenderer />
      <button
        onClick={() => {
          const id = v4();

          createWidget(
            () => ({
              id,
              childrenIDs: [],
              parentID: 'root'
            }),
            () => (
              <div
                onClick={() => {
                  deleteWidget(id);
                }}
              >
                Hello world
              </div>
            ),
            id
          );

          getWidgetByID('root').data.getState().addChild(id);
        }}
      >
        test
      </button>
    </>
  );
}
