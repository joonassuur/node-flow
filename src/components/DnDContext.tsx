import { createContext, useState, ReactNode } from 'react';

type DnDContextType = {
  nodeType: string | null;
  label: string;
};

type DnDProviderProps = {
  children: ReactNode;
};

const DnDContext = createContext<
  [DnDContextType, (value: DnDContextType) => void]
>([{ nodeType: null, label: '' }, () => {}]);

export const DnDProvider = ({ children }: DnDProviderProps) => {
  const [type, setType] = useState<DnDContextType>({
    nodeType: null,
    label: '',
  });

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;
