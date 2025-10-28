import { v4 as uuid } from 'uuid';
import { Widget } from '@/components/playground-new/types';

export function createWidget<W extends Widget>(
  data: W['data'],
  Component: any
) {
  return {
    data,
    Component,
    id: uuid()
  };
}
