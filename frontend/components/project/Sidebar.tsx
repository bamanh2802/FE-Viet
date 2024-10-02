import React, { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import {ExclamationCircleIcon} from '@heroicons/react/24/outline';
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
  PhotoIcon,
  EllipsisHorizontalIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ListboxWrapper } from '../ListboxWrapper';
import { Listbox, ListboxItem, Button, Tooltip } from '@nextui-org/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RootState } from "@/src/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllProjects } from "@/service/apis";
import { setProjects } from "@/src/projectsSlice";
import { Document, Image, Conversation } from '@/src/types/types';
import { getDocumentInProject } from '@/service/projectApi';




interface SidebarProps {
  documents: Document[],
  images: Image[],
  conversations: Conversation[]
}

const Sidebar: React.FC<SidebarProps> = ({ documents, images, conversations }) => {
  const router = useRouter();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isDeleteDocument, setIsDeleteDocument] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<string>('');
  // const [documents, setDocuments] = useState<Document[]>([])
  const [isLoadingProject, setIsLoadingProject] = useState<boolean>(true)
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [isUploadDocs, setIsUploadDocs] = useState<boolean>(false)
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, id: '' });

  const { project_id } = router.query;

  useEffect(() => {
    if(projects.length === 0) {
      handleGetProjects()
    }
    setSelectedProjectId(project_id)
    if(projects.length > 0) {
      setIsLoadingProject(false)
    }
  }, [project_id, projects])

  const handleOpenDeleteDocument = () => {
    setIsDeleteDocument(!isDeleteDocument)
  }
  const handleGetProjects = async () => {
    try {
        const data = await getAllProjects()
        console.log(data)
        dispatch(setProjects(data.data))
      } catch (e) {
        console.log(e)
      }
};

useEffect(() => {

}, [project_id])




  const getProjectNameById = (projectId: string | null) => {
    const project = projects.find(proj => proj.project_id === projectId);

    return project ? project.name : "Loading...";
  };

  const handleBackHome = () => {
    router.push('/home')
  }
  

  const toggleExpand = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };

  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setContextMenu({ show: true, x: e.pageX, y: e.pageY, id });
    console.log(id)
  };
  
  const handleClick = (e, id) => {
    // Kiểm tra xem menu có đang mở không
    e.stopPropagation();
    e.preventDefault()
    if (contextMenu.show && contextMenu.id === id) {
      setContextMenu({ ...contextMenu, show: false }); // Đóng menu nếu đã mở
    } else {
      setContextMenu({ show: true, x: e.pageX, y: e.pageY, id }); // Mở menu
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.context-menu')) {
        setContextMenu({ ...contextMenu, show: false });
    }
};

const handleRouterDocument = (doc: Document) => {
  const url = `/project/${project_id}/document/${doc.document_id}`
  window.open(url, '_blank');
}

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };


  return (
    <div className="overflow-auto select-none h-screen w-64 bg-zinc-900 text-white flex flex-col justify-between p-2">
      <div>
        <div className="rounded-lg mb-4 border-gray-400">
        <Select 
          disabled={isLoadingProject} 
          defaultValue={selectedProjectId} 
          onValueChange={(projectId) => {
            setSelectedProjectId(projectId);
            handleProjectClick(projectId); // Gọi hàm xử lý sau khi chọn
          }}
        >
          <SelectTrigger className="border-gray-400">
            <SelectValue>{getProjectNameById(selectedProjectId)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {projects.map(project => (
              <SelectItem 
                className="cursor-pointer"
                key={project.project_id} 
                value={project.project_id} // Không cần onClick ở đây
              >
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        </div>

        <div>
          <div
            onClick={() => handleBackHome()} 
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

        {/* Tùy chỉnh các mục menu ở đây */}
        <div className="my-2">
          <div
            className={`flex items-center justify-between text-sm font-semibold text-gray-500 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-800`}
            onClick={() => toggleExpand('documents')}
            onContextMenu={(e) => handleContextMenu(e, 'documents')}
          >
            <div className="flex justify-between items-center space-x-3">
              <FolderIcon className="h-5 w-5 text-gray-300" />
              <span className="text-xs">Documents</span>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 transform transition-transform duration-300`}
            />
          </div>
          {/* Các item con cho mục "Tài liệu" */}
          {expandedSections.includes('documents') && (
            <div className="transition-all ml-4 mt-1 space-y-1 border-l-1 border-gray-400">
              {documents.map((doc, index) => (
                <div
                  onClick={() => handleRouterDocument(doc)}
                  key={index}
                  className="ml-2 group flex justify-between items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700"
                  onContextMenu={(e) => handleContextMenu(e, doc.document_id)}
                >
                  <div className='flex justify-center items-center text-white '>
                    <DocumentTextIcon className='w-4 h-4 pr-1' />
                    <span>{doc.document_name}</span>
                  </div>
                  <Tooltip content="Thêm">
                    <EllipsisHorizontalIcon 
                   onClick={(e) => handleClick(e, doc.document_id)}
                    className='transition-all w-4 h-4 opacity-0 group-hover:opacity-100' />
                  </Tooltip>
                </div>
              ))}
              <div
                className="ml-2 transition-all flex items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700"
              >
                <PlusIcon className='w-4 h-4' />
                <span>Thêm</span>
              </div>
            </div>
          )}
      </div>

        <div className="my-2">
          <div 
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700`} 
            onContextMenu={(e) => handleContextMenu(e, 'images')}
          >
                  <Tooltip content="Đang như l nên đợi tương lai nhé :(">
            <div className="flex items-center space-x-3">
              <PhotoIcon className="h-5 w-5 text-gray-300" />
              <span className="text-xs">Hình ảnh</span>
            </div>
          </Tooltip>
          </div>
          {/* Các item con cho mục "Hình ảnh" */}
          {expandedSections.includes('images') && (
            <div className="transition-all ml-4 mt-1 space-y-1 border-l-1 border-gray-400">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="ml-2 group flex justify-between items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700"
                  onContextMenu={(e) => handleContextMenu(e, img.image_id)}
                >
                  <div className='flex justify-center items-center '>
                    <DocumentTextIcon className='w-4 h-4 pr-1' />
                    <Tooltip content={img.caption}>
                      <span className='truncate max-w-40'>{img.caption}</span>
                    </Tooltip>
                  </div>
                  <Tooltip content="Thêm">
                    <EllipsisHorizontalIcon 
                   onClick={(e) => handleClick(e, img.image_id)}
                    className='transition-all w-4 h-4 opacity-0 group-hover:opacity-100' />
                  </Tooltip>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="my-2">
          <div 
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700`} 
            onClick={() => toggleExpand('conversation')}
            onContextMenu={(e) => handleContextMenu(e, 'conversation')}
          >
            <div className="flex items-center space-x-3">
              <PhotoIcon className="h-5 w-5 text-gray-300" />
              <span className="text-xs">Conversation</span>
            </div>
          </div>
          {/* Các item con cho mục "Hình ảnh" */}
          {expandedSections.includes('conversation') && (
            <div className="transition-all ml-4 mt-1 space-y-1 border-l-1 border-gray-400">
              {conversations.map((conversation, index) => (
                <div
                  key={index}
                  className="ml-2 group flex justify-between items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700"
                  onContextMenu={(e) => handleContextMenu(e, conversation.conversation_id)}
                >
                  <div className='flex justify-center items-center '>
                    <DocumentTextIcon className='w-4 h-4 pr-1' />
                    <Tooltip content={conversation.conversation_name}>
                      <span className='truncate max-w-40'>{conversation.conversation_name}</span>
                    </Tooltip>
                  </div>
                  <Tooltip content="Thêm">
                    <EllipsisHorizontalIcon 
                   onClick={(e) => handleClick(e, conversation.conversation_id)}
                    className='transition-all w-4 h-4 opacity-0 group-hover:opacity-100' />
                  </Tooltip>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="my-2">
          <div 
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700`} 
            onClick={() => toggleExpand('notes')}
            onContextMenu={(e) => handleContextMenu(e, 'notes')}
          >
            <div className="flex items-center space-x-3">
              <ChartBarSquareIcon className="h-5 w-5 text-gray-300" />
              <span className="text-xs">Ghi chú</span>
            </div>
          </div>
          {/* Các item con cho mục "Ghi chú" */}
          {expandedSections.includes('notes') && (
            <div className="transition-all ml-4 mt-1 space-y-1 border-l-1 border-gray-400">
              {/* {notes.map((note, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700"
                  onContextMenu={(e) => handleContextMenu(e, note.id)}
                >
                  <span>{note.title}</span>
                </div>
              ))} */}
            </div>
          )}
        </div>

        {/* Có thể thêm các mục khác tương tự */}
      </div>

      <div className={`transition-opacity z-50 ${contextMenu.show && contextMenu.id === 'documents' ? 'visible opacity-100' : 'invisible opacity-0'} context-menu absolute bg-zinc-800 rounded-lg shadow-lg shadow-zinc-900 w-48`} style={{ top: contextMenu.y, left: contextMenu.x }}> 
        <ListboxWrapper>
          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem key="new" textValue="New file">
              <div className='flex items-center'>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Document
              </div>
            </ListboxItem>
            <ListboxItem key="popup" textValue="Pop Up">
              <div className='flex items-center'>
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                Create Conversation
              </div>
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </div>
      <div className={`transition-opacity z-50 ${contextMenu.show && contextMenu.id === 'conversation' ? 'visible opacity-100' : 'invisible opacity-0'} context-menu absolute bg-zinc-800 rounded-lg shadow-lg shadow-zinc-900 w-48`} style={{ top: contextMenu.y, left: contextMenu.x }}> 
        <ListboxWrapper>
          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem key="popup" textValue="Pop Up">
              <div className='flex items-center'>
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                Create Conversation
              </div>
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </div>

      <div className={`transition-opacity z-50 ${contextMenu.show && contextMenu.id.startsWith('doc-') ? 'visible opacity-100' : 'invisible opacity-0'} context-menu absolute bg-zinc-800 rounded-lg shadow-lg shadow-zinc-900 w-48`} style={{ top: contextMenu.y, left: contextMenu.x }}>
        <ListboxWrapper>
          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem key="new" textValue="New file">
              <div className='flex items-center'>
                <PlusIcon className="h-4 w-4 mr-2" />
                Thêm tài liệu
              </div>
            </ListboxItem>
            <ListboxItem key="create" textValue="Pop Up">
              <div className='flex items-center'>
                <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                Create Conversation
              </div>
            </ListboxItem>
            <ListboxItem key="popup" textValue="Pop Up">
              <div className='flex items-center'>
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                Detail
              </div>
            </ListboxItem>
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
      <div className={`transition-opacity z-50 ${contextMenu.show && contextMenu.id.startsWith('conv-') ? 'visible opacity-100' : 'invisible opacity-0'} context-menu absolute bg-zinc-800 rounded-lg shadow-lg shadow-zinc-900 w-48`} style={{ top: contextMenu.y, left: contextMenu.x }}>
        <ListboxWrapper>
          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem key="create" textValue="Pop Up">
              <div className='flex items-center'>
                <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                Create Conversation
              </div>
            </ListboxItem>
            <ListboxItem key="popup" textValue="Pop Up">
              <div className='flex items-center'>
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                Detail
              </div>
            </ListboxItem>
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
      <div className={`transition-opacity z-50 ${contextMenu.show && contextMenu.id.startsWith('img-') ? 'visible opacity-100' : 'invisible opacity-0'} context-menu absolute bg-zinc-800 rounded-lg shadow-lg shadow-zinc-900 w-48`} style={{ top: contextMenu.y, left: contextMenu.x }}>
        <ListboxWrapper>
          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem key="popup" textValue="Pop Up">
              <div className='flex items-center'>
                <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                Detail
              </div>
            </ListboxItem>
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
      {/* {contextMenu.show  && (
        <div className="absolute" style={{ top: contextMenu.y, left: contextMenu.x }}>
          {contextMenu.id === 'documents' ? (
            <div className="bg-gray-800 p-2 rounded-lg shadow-lg">
              <div className="hover:bg-gray-700 cursor-pointer p-2">Thêm tài liệu</div>
              <div className="hover:bg-gray-700 cursor-pointer p-2">Tạo cuộc trò chuyện</div>
            </div>
          ) : (
            <div className="bg-gray-800 p-2 rounded-lg shadow-lg">
              <div className="hover:bg-gray-700 cursor-pointer p-2">Thêm tài liệu</div>
              <div className="hover:bg-gray-700 cursor-pointer p-2">Pop Up</div>
              <div className="hover:bg-gray-700 cursor-pointer p-2">Xóa tài liệu</div>
              <div className="hover:bg-gray-700 cursor-pointer p-2">Sửa tên tài liệu</div>
            </div>
          )}
        </div>
      )} */}

      <AlertDialog open={isDeleteDocument} onOpenChange={() => handleOpenDeleteDocument()}>
        <AlertDialogContent className="bg-zinc-800 border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <ExclamationCircleIcon className="w-6 h-6 mr-2" />
              Do you really want to delete
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Project cannot be restored.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button>Cancel</Button>
            <Button color="danger">Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isUploadDocs} onOpenChange={() => setIsUploadDocs(false)}>
        <DialogContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="picture">Upload Your Documents</label>
            <Input id="picture" type="file" />  
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


export default Sidebar;
