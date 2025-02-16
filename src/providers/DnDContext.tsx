import { createContext, useState, ReactNode } from 'react';
import { InputType } from '../types';

type DnDContextType = {
  nodeType: string | null;
  label: string;
  inputType: InputType;
};

type DnDProviderProps = {
  children: ReactNode;
};

const DnDContext = createContext<
  [DnDContextType, (value: DnDContextType) => void]
>([{ nodeType: null, label: '', inputType: 'default' }, () => {}]);

export const DnDProvider = ({ children }: DnDProviderProps) => {
  const [type, setType] = useState<DnDContextType>({
    nodeType: null,
    label: '',
    inputType: 'default',
  });

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;
