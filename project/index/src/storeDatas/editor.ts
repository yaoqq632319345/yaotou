import type { ComponentData } from '@/stroeTypes';
import { v4 as uuidv4 } from 'uuid';

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello',
      fontSize: '20px',
      color: '#aaaaaa',
      lineHeight: '1',
      textAlign: 'left',
      fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello2',
      fontSize: '10px',
      fontWeight: 'bold',
      lineHeight: '2',
      textAlign: 'left',
      fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello3',
      fontSize: '15px',
      actionType: 'url',
      url: 'https://www.baidu.com',
      lineHeight: '3',
      textAlign: 'left',
      fontFamily: '',
    },
  },
];
