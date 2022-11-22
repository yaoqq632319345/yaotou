import type { App } from 'vue';

import LText from './components/LText';
import LImage from './components/LImage';
import LShape from './components/LShape';

export const components = {
  LText,
  LImage,
  LShape,
};

const install = (app: App) => {
  for (let key in components) {
    const component = components[key as keyof typeof components];
    app.component(component.name, component);
  }
};

export default {
  install,
};
