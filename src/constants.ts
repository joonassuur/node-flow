import { SidebarElement } from './types';

const sidebarElements: SidebarElement[] = [
  { nodeType: 'youtube', label: 'YouTube', inputType: 'input' },
  { nodeType: 'docs', label: 'Google Docs', inputType: 'default' },
  { nodeType: 'summarizer', label: 'Summarizer ', inputType: 'output' },
  { nodeType: 'translator', label: 'Translator', inputType: 'output' },
];

export { sidebarElements };
