import { ReactFlowProvider } from '@xyflow/react';
import { Toaster } from 'react-hot-toast';
import DnDFlow from './components/DnDFlow';
import { DnDProvider } from './components/DnDContext';

function App() {
  return (
    <>
      <Toaster />
      <ReactFlowProvider>
        <DnDProvider>
          <DnDFlow />
        </DnDProvider>
      </ReactFlowProvider>
    </>
  );
}

export default App;
