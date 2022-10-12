import type { ComponentData } from '@/stroeTypes';
import { v4 as uuidv4 } from 'uuid';

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'l-text', props: { text: 'hello' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello2' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello3' } },
];
