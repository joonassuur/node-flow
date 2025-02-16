import { useDnD } from '../providers/useDnD';
import { SidebarElement, InputType } from '../types';
import { getBgColor } from '../utils';

interface Props {
  sidebarList: SidebarElement[];
}

function Sidebar({ sidebarList }: Props) {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    label: string,
    inputType: InputType
  ) => {
    setType({ nodeType, label, inputType });
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-full md:w-1/4">
      <div className="description">
        Drag these elements to the pane on the right.
      </div>
      <div className="flex flex-col gap-2">
        {sidebarList.map((item) => (
          <div
            key={item.label}
            className={`${getBgColor(item.nodeType)} 
                        rounded-sm text-center p-2 text-white cursor-pointer 
                        font-semibold transition-all 
                        hover:opacity-80 hover:scale-105`}
            onDragStart={(event) =>
              onDragStart(event, item.nodeType, item.label, item.inputType)
            }
            draggable
          >
            {item.label}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
