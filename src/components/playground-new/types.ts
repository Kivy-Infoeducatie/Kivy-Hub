export interface Widget<D = any, C = any> {
  id: string;
  data: D;
  Component: C;
  hidden: boolean;
}
