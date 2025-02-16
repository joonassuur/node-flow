import { Handle, Position } from '@xyflow/react';
import { InputType } from '../types';
import { getBgColor } from '../utils';

interface Props {
  data: {
    label: string;
    deleteNode: (id: string) => void;
    inputType?: InputType;
  };
  id: string;
  type: string;
}

const getHandles = (inputType: InputType | '') => {
  switch (inputType) {
    case 'input':
      return <Handle type="source" position={Position.Right} />;
    case 'output':
      return <Handle type="target" position={Position.Left} />;
    case 'default':
    default:
      return (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      );
  }
};

const CustomNode = ({ data, id, type }: Props) => {
  const onNodeDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    data.deleteNode(id);
  };

  return (
    <div
      className={`py-1 flex items-center px-4 border border-gray-300 ${getBgColor(
        type
      )}`}
    >
      <h3 className="text-xs text-white font-semibold">{data.label}</h3>
      <button
        onClick={onNodeDelete}
        className="bg-slate-500 text-white text-xs px-2 !py-0 !rounded-sm ml-2"
      >
        Delete
      </button>
      {getHandles(data.inputType || '')}
    </div>
  );
};

export default CustomNode;
