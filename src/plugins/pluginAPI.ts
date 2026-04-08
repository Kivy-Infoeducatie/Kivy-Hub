import { registerComponent } from '../registry/componentRegistry';

export interface PluginAPI {
  registerComponent: (type: string, component: React.ComponentType<any>) => void;
  registerHook?: (hookName: string, callback: Function) => void;
}

export const pluginAPI: PluginAPI = {
  registerComponent,
};
