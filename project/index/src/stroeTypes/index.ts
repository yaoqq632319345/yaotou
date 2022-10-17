import type { EditorProps } from './editor';
import type { TemplatesProps } from './templates';
import type { UserProps } from './user';

export * from './templates';
export * from './user';
export * from './commonTypes';
export * from './editor';
export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
  editor: EditorProps;
}
