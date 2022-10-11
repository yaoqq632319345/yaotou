import type { TemplatesProps } from './templates';
import type { UserProps } from './user';

export * from './templates';
export * from './user';
export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
}
