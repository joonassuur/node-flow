export type InputType = 'input' | 'output' | 'default';
export interface SidebarElement {
  nodeType: string;
  label: string;
  inputType: InputType;
}
