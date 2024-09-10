import React, { useState, useEffect } from 'react';
import {
  FolderIcon,
  TableCellsIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  HashtagIcon,
  InboxIcon,
  UsersIcon,
  HomeIcon,
  DocumentTextIcon,
  DocumentIcon,
  ChevronDownIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
  StarIcon,
  PencilSquareIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { ListboxWrapper } from '../ListboxWrapper';
import { Select, SelectItem, Listbox, ListboxItem } from '@nextui-org/react';


const projects = [
  { name: 'Viet Project', id: '1' },
  { name: 'Notebook VPI', id: '2' },
];

const documents = [
  { name: 'test.pdf', id: '1', Icon: DocumentIcon },
  { name: 'create.pdf', id: '2', Icon: DocumentIcon },
];

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; show: boolean; id?: string }>({
    x: 0,
    y: 0,
    show: false,
  });
  

  const toggleExpand = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };

  const handleContextMenu = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      show: true,
      id,
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!event.target.closest('.context-menu')) {
      setContextMenu({ ...contextMenu, show: false });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <div className="overflow-auto select-none h-screen w-64 bg-zinc-800 text-white flex flex-col justify-between p-2">
      <div>
        <div className="rounded-lg mb-4">
          <Select items={projects} label="Project" placeholder="Select a project" className="max-w-xs">
            {(project) => <SelectItem key={project.id}>{project.name}</SelectItem>}
          </Select>
        </div>

        <div>
          <div
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer my-2 hover:bg-gray-700"
            onContextMenu={(e) => handleContextMenu(e, 'home')}
          >
            <div className="flex items-center space-x-3">
              <HomeIcon className="h-4 w-4 text-gray-300" />
              <span className="text-xs">Home</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-2 rounded-lg flex items-center mb-8">
          <input className="bg-transparent outline-none text-sm w-full" placeholder="Search..." />
        </div>

        <div>
          <MenuItem
            Icon={FolderIcon}
            label="Tài liệu"
            expanded={expandedSections.includes('documents')}
            onClick={() => toggleExpand('documents')}
            items={documents}
            onContextMenu={handleContextMenu}
          />
          <MenuItem
            Icon={TableCellsIcon}
            label="Bảng"
            expanded={expandedSections.includes('table')}
            onClick={() => toggleExpand('table')}
            items={[
              { name: 'Table Item 1', Icon: DocumentTextIcon },
              { name: 'Table Item 2', Icon: DocumentTextIcon },
            ]}
            onContextMenu={handleContextMenu}
          />
          <MenuItem
            Icon={PhotoIcon}
            label="Hình ảnh"
            expanded={expandedSections.includes('images')}
            onClick={() => toggleExpand('images')}
            items={[
              { name: 'Photo 1', Icon: DocumentTextIcon },
              { name: 'Photo 2', Icon: DocumentTextIcon },
            ]}
            onContextMenu={handleContextMenu}
          />
          <MenuItem
            Icon={ChartBarSquareIcon}
            label="Ghi chú"
            expanded={expandedSections.includes('notes')}
            onClick={() => toggleExpand('notes')}
            items={[
              { name: 'Note 1', Icon: DocumentTextIcon },
              { name: 'Note 2', Icon: DocumentTextIcon },
            ]}
            onContextMenu={handleContextMenu}
          />
          <MenuItem
            Icon={HashtagIcon}
            label="Meta data"
            expanded={expandedSections.includes('metadata')}
            onClick={() => toggleExpand('metadata')}
            items={[
              { name: 'Meta 1', Icon: DocumentTextIcon },
              { name: 'Meta 2', Icon: DocumentTextIcon },
            ]}
            onContextMenu={handleContextMenu}
          />
          <MenuItem
            Icon={InboxIcon}
            label="Chat"
            expanded={expandedSections.includes('chat')}
            onClick={() => toggleExpand('chat')}
            items={[
              { name: 'Chat 1', Icon: DocumentTextIcon },
              { name: 'Chat 2', Icon: DocumentTextIcon },
            ]}
            onContextMenu={handleContextMenu}
          />
          <MenuItem
            Icon={Cog6ToothIcon}
            label="Settings"
            onClick={() => toggleExpand('settings')}
            onContextMenu={handleContextMenu}
          />
        </div>
      </div>

        <div className={`
        transition-opacity 
        ${contextMenu.show ? 'visible opacity-100' : 'invisible opacity-0'}
          context-menu absolute bg-zinc-800 rounded-lg shadow-lg
           shadow-zinc-900 w-48`} 
           style={{ top: contextMenu.y, left: contextMenu.x }}> 
        <ListboxWrapper >
        <Listbox
          aria-label="Actions"
          onAction={(key) => alert(key)}
        >
          <ListboxItem key="new">
            <div className='flex'>
              <PlusIcon className="h-5 w-5 mr-2"/>
              New file
            </div>
          </ListboxItem>
          <ListboxItem key="popup">
            <div className='flex'>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2"/>
              Pop Up
            </div>
          </ListboxItem>
          <ListboxItem key="copy">
            <div className='flex'>
              <StarIcon className="h-5 w-5 mr-2"/>
              Add to Favorite
            </div>
          </ListboxItem>
          <ListboxItem key="edit">
            <div className='flex'>
              <PencilSquareIcon className="h-5 w-5 mr-2"/>
              Rename
            </div>
          </ListboxItem>
          <ListboxItem key="delete" className="text-danger" color="danger">
           <div className='flex'>
            <TrashIcon className="h-5 w-5 mr-2"/> 
            Delete file
           </div>
          </ListboxItem>
        </Listbox>
      </ListboxWrapper>
        </div>
    </div>
  );
};

// MenuItem component for each sidebar link
const MenuItem = ({
  Icon,
  label,
  expanded,
  onClick,
  items,
  onContextMenu,
}: {
  Icon: any;
  label: string;
  expanded?: boolean;
  onClick?: () => void;
  items?: Array<{ name: string; Icon: any }>;
  onContextMenu?: (e: React.MouseEvent, id: string) => void;
}) => (
  <div className={`my-2 ${expanded ? 'rounded-lg' : ''} transform transition-transform duration-200`}>
    <div
      onClick={onClick}
      onContextMenu={(e) => onContextMenu && onContextMenu(e, label)}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 ease-in-out`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 text-gray-300" />
        <span className="text-xs">{label}</span>
      </div>
      {items && (
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-300 transform transition-transform duration-200 ${
            expanded ? 'rotate-180' : 'rotate-0'
          }`}
        />
      )}
    </div>
    {expanded && items && (
      <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-600 pl-4 transition-all duration-200 ease-in-out">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700"
            onContextMenu={(e) => onContextMenu && onContextMenu(e, item.name)}
          >
            <item.Icon className="h-4 w-4" />
            <span className=''>{item.name}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
