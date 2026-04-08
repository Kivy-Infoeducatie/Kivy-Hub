import React from 'react';

const SampleComponent: React.FC<{ message: string }> = ({ message }) => {
  return <div>{message}</div>;
};

const registry: Record<string, React.ComponentType<any>> = {};

export function registerComponent(type: string, component: React.ComponentType<any>) {
  registry[type] = component;
}

export function getComponent(type: string) {
  return registry[type];
}
