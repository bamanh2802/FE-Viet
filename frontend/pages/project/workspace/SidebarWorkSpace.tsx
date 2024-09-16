import { FC } from 'react';
import React, {useState} from 'react';
import { Button } from '@nextui-org/react';
import { PlusIcon, 
    BackwardIcon, 
    TableCellsIcon, 
    FolderIcon, 
    DocumentTextIcon,
    ChevronDownIcon,
    InboxStackIcon,
    ChevronLeftIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

interface SidebarWorkspaceProps {
  conversations: string[];
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
}

const fileData = [
    {
        fileName: 'File 1',
        type: 'pdf'
    },
    {
        fileName: 'File 2',
        type: 'pdf'
    },
    {
        fileName: 'File 3',
        type: 'pdf'
    }
]

const SidebarWorkspace: FC<SidebarWorkspaceProps> = ({ conversations, onSelectConversation, onCreateConversation }) => {
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [isCompactSidebar, setIsCompactSidebar] = useState<boolean>(false)
    const toggleExpand = (section: string) => {
        if (!isCompactSidebar) {
            setExpandedSections((prev) =>
              prev.includes(section)
                ? prev.filter((item) => item !== section)
                : [...prev, section]
            );
        } else {
            toggleCompactSidebar()
        }
      };

    const toggleCompactSidebar = () => {
        setIsCompactSidebar(!isCompactSidebar)
        console.log('hello')
    }
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
              <span className="text-xs truncate max-w-xs">{label}</span>
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
                  className="overflow-auto group relative flex items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700"
                  onContextMenu={(e) => onContextMenu && onContextMenu(e, item.name)}
                >
                    {!isCompactSidebar && (
                       <>
                         <div>
                        <item.Icon className="h-4 w-4" />
                        </div>
                        <span className='truncate'>{item.name}</span>
                        <TrashIcon className="h-4 w-4 absolute right-2 opacity-0 invisible group-hover:opacity-95 group-hover:visible group-hover:text-red-500 transition-all"/>
                       </>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    
  
  
    return (
    <div className={`${isCompactSidebar ? 'w-14 p-1' : ' w-60 p-4'} h-screen bg-zinc-800 text-white flex flex-col`}>
    <div className={`${!isCompactSidebar ? 'justify-between' : 'justify-center'} w-full flex`}>
        <div>
            <Button 
            onClick={toggleCompactSidebar}
            isIconOnly 
            variant="light">
                <ChevronLeftIcon className='w-4 h-4'/>
            </Button>

        </div>
        <div>
           {
            !isCompactSidebar && (
                <Button isIconOnly variant="light"><PlusIcon className='w-4 h-4'/> </Button>
            )
           }
        </div>
    </div>
      <div className="flex-1 overflow-y-auto">
        <MenuItem
                Icon={FolderIcon}
                label={`${!isCompactSidebar ? 'Tài liệu' : ''}`}
                expanded={expandedSections.includes('documents')}
                onClick={() => toggleExpand('documents')}
                items={[
                    { name: 'Table Item 1', Icon: DocumentTextIcon },
                    { name: 'Table Item 2', Icon: DocumentTextIcon },
                    ]}
            />
            <MenuItem
                Icon={InboxStackIcon}
                label={`${!isCompactSidebar ? 'Cuộc trò chuyện' : ''}`}
                expanded={expandedSections.includes('table')}
                onClick={() => toggleExpand('table')}
                items={[
                { name: 'Table Item 1 Table Item 1 Table Item 1 Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                { name: 'Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                { name: 'Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                { name: 'Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                { name: 'Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                { name: 'Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                { name: 'Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                { name: 'Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                { name: 'Table Item 1', Icon: DocumentTextIcon },
                { name: 'Table Item 2', Icon: DocumentTextIcon },
                ]}
            />
      </div>
    </div>
  );

  
};



export default SidebarWorkspace;
