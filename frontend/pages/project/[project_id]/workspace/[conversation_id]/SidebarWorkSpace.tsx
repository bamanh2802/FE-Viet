import { FC, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Lấy project_id từ URL
import { ChevronLeftIcon, PlusIcon, HomeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs'; // Thư viện để xử lý ngày tháng
import { Conversation } from '@/src/types/types';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { ListboxWrapper } from '@/components/ListboxWrapper';
import { Listbox, ListboxItem, Button, Tooltip } from '@nextui-org/react';


interface SidebarWorkspaceProps {
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
  conversations: Conversation[];
}

const SidebarWorkspace: FC<SidebarWorkspaceProps> = ({
  onSelectConversation,
  onCreateConversation,
  conversations,
}) => {
  const router = useRouter();
  const [isCompactSidebar, setIsCompactSidebar] = useState<boolean>(false);
  const { project_id } = router.query; // Lấy project_id từ URL
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: string | null }>({ x: 0, y: 0, id: null });

  // Sắp xếp cuộc trò chuyện theo ngày updated gần nhất
  const sortedConversations = useMemo(() => {
    return conversations?.slice().sort((a, b) => {
      return dayjs(b.updated_at).diff(dayjs(a.updated_at)); // Sắp xếp theo updated_at từ mới đến cũ
    });
  }, [conversations]);

  const handleBackHome = () => {
    router.push(`/project/${project_id}`);
  };

  // Hàm để xử lý nhấp chuột phải
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, conversationId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, id: conversationId });
  };

  // Hàm xóa cuộc trò chuyện
  const handleDeleteConversation = (id: string) => {
    // Xử lý xóa cuộc trò chuyện
    console.log(`Deleting conversation with ID: ${id}`);
    // Cập nhật danh sách cuộc trò chuyện sau khi xóa
  };

  // Hàm sửa cuộc trò chuyện
  const handleEditConversation = (id: string) => {
    // Xử lý sửa tên cuộc trò chuyện
    const newName = prompt("Enter new name for the conversation:");
    if (newName) {
      console.log(`Editing conversation with ID: ${id} to new name: ${newName}`);
      // Cập nhật danh sách cuộc trò chuyện sau khi sửa
    }
  };

  // Render cuộc trò chuyện
  const renderConversations = () => (
    sortedConversations?.length > 0 ? (
      <div className="ml-1 mt-1 space-y-1">
        {sortedConversations.map((conv) => (
          <div
            key={conv.conversation_id}
            className="transition-all ml-2 group flex justify-between items-center space-x-2 text-sm text-gray-400 cursor-pointer p-2 rounded-lg dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-800 hover:bg-zinc-200"
            onClick={() => onSelectConversation(conv.conversation_id)}
            onContextMenu={(e) => handleContextMenu(e, conv.conversation_id)}
          >
            <span>{conv.conversation_name}</span>
            <div className="opacity-0 group-hover:opacity-100">
              <EllipsisHorizontalIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="ml-4 mt-1 text-gray-500">Không có cuộc trò chuyện nào.</div>
    )
  );

  // Đóng menu context khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = () => setContextMenu({ x: 0, y: 0, id: null });
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${isCompactSidebar ? 'w-14 p-1' : 'w-60 p-4'} h-screen dark:bg-zinc-900 bg-zinc-50 flex flex-col`}>
      <div className="flex justify-between items-center">
        <Button isIconOnly onClick={() => setIsCompactSidebar(!isCompactSidebar)}>
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        {!isCompactSidebar && (
          <Button isIconOnly onClick={onCreateConversation}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div>
          <div
            onClick={handleBackHome}
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer my-2 hover:bg-gray-700"
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
        <h3 className="flex items-center justify-between text-sm font-semibold dark:text-gray-400 text-gray-700 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800">
          <span>Conversations</span>
        </h3>
        {renderConversations()}

        {/* Menu Context Tùy Chỉnh */}
          <div
            className={`${contextMenu.id ? 'visible opacity-100' : 'invisible opacity-0'} absolute rounded shadow-lg z-10`}
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <ListboxWrapper>
            <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem key="rename" textValue="Pop Up">
              <div className='flex items-center'>
                <PencilSquareIcon className="h-4 w-4 mr-2" />
                Rename
              </div>
            </ListboxItem>
            <ListboxItem key="delete" textValue="Pop Up" className="text-danger" color="danger">
              <div className='flex items-center'>
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </div>
            </ListboxItem>
            </Listbox>
          </ListboxWrapper>
          </div>
      </div>
    </div>
  );
};

export default SidebarWorkspace;
