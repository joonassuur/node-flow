import { useRef, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Connection,
  Edge,
  Node,
  OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { sidebarElements } from '../constants';
import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import ButtonsBar from './ButtonsBar';
import { useDnD } from '../providers/useDnD';

const nodeTypes = {
  youtube: CustomNode,
  docs: CustomNode,
  summarizer: CustomNode,
  translator: CustomNode,
};

function DnDFlow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [sidebarList, setSidebarList] = useState(sidebarElements);
  const { screenToFlowPosition } = useReactFlow();
  const [{ nodeType, label }] = useDnD();

  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!nodeType || nodes.some((node) => node.type === nodeType)) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: uuidv4(),
        type: nodeType,
        position,
        data: { label: label || nodeType },
      };

      setNodes((nds) => [...nds, newNode]);
      setSidebarList((prev) => prev.filter((item) => item.label !== label));
    },
    [screenToFlowPosition, setNodes, nodeType, label, nodes]
  );

  const handleRunWorkflow = () => {
    if (nodes.length < 2) {
      toast.error('Please drag elements on the pane to run a workflow');
      return;
    }

    const adjacencyList: Record<string, string[]> = {};
    nodes.forEach((node) => (adjacencyList[node.id] = []));

    edges.forEach(({ source, target }) => {
      adjacencyList[source].push(target);
      adjacencyList[target].push(source);
    });

    const visited = new Set<string>();
    const queue = [nodes[0]?.id];

    while (queue.length) {
      const node = queue.shift()!;
      if (!visited.has(node)) {
        visited.add(node);
        queue.push(...adjacencyList[node].filter((n) => !visited.has(n)));
      }
    }

    if (visited.size !== nodes.length) {
      toast.error('Not all nodes are connected!');
    } else {
      setEdges((prevEdges) =>
        prevEdges.map((edge) => ({
          ...edge,
          animated: true,
        }))
      );
      toast.success('All nodes are connected, workflow can run!');
    }
  };

  const deleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
    setSidebarList(sidebarElements);
  };

  return (
    <div className="p-4">
      <ButtonsBar
        handleReset={handleReset}
        handleRunWorkflow={handleRunWorkflow}
      />
      <div className="dndflow w-full flex flex-col md:flex-row">
        <Sidebar sidebarList={sidebarList} />
        <div
          className="reactflow-wrapper h-60 w-full md:flex-1"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              data: { ...node.data, deleteNode },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            style={{ backgroundColor: '#F7F9FB' }}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default DnDFlow;
