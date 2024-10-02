// components/HomeMain.tsx
import { Tabs, Tab } from '@nextui-org/tabs';
import { useEffect, useState, FC } from 'react';
import { BriefcaseIcon, 
    FolderIcon, 
    ChatBubbleLeftRightIcon, 
    UserGroupIcon,
    DocumentTextIcon,
    ClockIcon,
    PencilSquareIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { Folder } from 'lucide-react';
import { getAllProjects, refreshToken, deleteProjectById, renameProjectById } from '@/service/apis';
import {Card, Skeleton, Input, Button, CardBody, Listbox, ListboxItem, Tooltip} from "@nextui-org/react";
import { useRouter } from 'next/router';
import { Project } from '@/src/types/types';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog";

import { ListboxWrapper } from '../ListboxWrapper';


const documents = [
    {
      name: "NLP book",
      project: "Viet project",
      type: "pdf"
    },
    {
      name: "AI for Everyone",
      project: "AI Learning",
      type: "pdf"
    },
    {
      name: "Data Science Handbook",
      project: "Data Science Initiative",
      type: "pdf"
    },
    {
      name: "Deep Learning Notes",
      project: "Viet project",
      type: "doc"
    },
]

interface HomeMainProps {
  projects: Project[];
  onProjectsUpdate: (projects: Project[]) => void;
  userName? : string
}
const HomeMain: React.FC<HomeMainProps> = ({userName, projects: initialProjects, onProjectsUpdate }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("recent");
  const [recentProjects, setRecentProject] = useState<Project[]>([])
  const [isOpenRename, setIsOpenRename] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
  const [isLoadingRename, setIsLoadingRename] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
    projectId: null,
  });

  const handleContextMenu = (event: React.MouseEvent, project: Project) => {
    event.preventDefault(); // Ngăn chặn menu mặc định của trình duyệt
    setContextMenu({
      show: true,
      x: event.pageX,
      y: event.pageY,
      projectId: Project, // Lưu ID project để sửa hoặc xóa
    });
    setSelectedProject(project)
  };


  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(date);

    return formattedDate;
  }
  const getRecentProjects = (projects: Project[]): Project[] => {
    return projects
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 3);
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    let interval = Math.floor(seconds / 31536000); // số giây trong 1 năm
    if (interval >= 1) {
      return interval === 1 ? "1 year ago" : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000); // số giây trong 1 tháng
    if (interval >= 1) {
      return interval === 1 ? "1 month ago" : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400); // số giây trong 1 ngày
    if (interval >= 1) {
      return interval === 1 ? "1 day ago" : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600); // số giây trong 1 giờ
    if (interval >= 1) {
      return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60); // số giây trong 1 phút
    if (interval >= 1) {
      return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    }
    
    return "just now";
  };
  
  const handleRouterToProject = (project: Project) => {
    router.push(`/project/${project.project_id}`)
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenu.show && !document.getElementById('context-menu')?.contains(event.target)) {
        handleCloseContextMenu(); // Đóng menu nếu nhấp ra ngoài
      }
    };
  
    // Thêm sự kiện lắng nghe click trên document
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup: loại bỏ sự kiện khi component bị hủy
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu.show]); // Lắng nghe khi contextMenu.show thay đổi
  

  useEffect(() => {
    setProjects(initialProjects)
    console.log(initialProjects)
    if (initialProjects.length !== 0) {
      const recentProjects = getRecentProjects([...initialProjects]); // Tạo bản sao mới của projects
      setRecentProject(recentProjects);
    }
  }, [initialProjects]);
  const handleToggleRename = () => {
    setIsOpenRename(!isOpenRename);
    handleCloseContextMenu()

  };
  const handleToggleDelete = () => {
      setIsOpenDelete(!isOpenDelete);
      handleCloseContextMenu()

  };
  const handleSaveChanges = () => {
      console.log("Project updated:", selectedProject);
      handleRenameProject()
  };
  const handleCloseContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, projectId: null });
  };

  const handleDeleteProject = async () => {
    setIsLoadingDelete(true)
    try {
      const data = await deleteProjectById(selectedProject?.project_id)
      console.log(data)
      setIsOpenDelete(!isOpenDelete);
      setIsLoadingDelete(false)
      handleDeleteProjectFE(selectedProject?.project_id)

    } catch (e) {
      setIsLoadingDelete(false)
      console.log(e)
    }
  }

  const handleRenameProject = async() => {
    setIsLoadingRename(true)
    try {
      const data = await renameProjectById(selectedProject?.project_id, selectedProject?.name)
      console.log(data)
      handleRenameProjectFE(selectedProject)
    } catch (e) {
      console.log(e)
    }
    setIsLoadingRename(false)
    setIsOpenRename(false);
  }
  const handleDeleteProjectFE = (project_id: string) => {
    const updatedProjects = projects.filter((project) => project.project_id !== project_id);
    setProjects(updatedProjects); 
    onProjectsUpdate(updatedProjects);
  };

  const handleRenameProjectFE = (updatedProject: Project) => {
    const updatedProjects = projects.map((project) =>
      project.project_id === updatedProject.project_id ? updatedProject : project
    );
    setProjects(updatedProjects);
    onProjectsUpdate(updatedProjects);
  };

  return (
    <div className="p-10 w-full flex flex-col items-center bg-zinc-800 h-[calc(100vh-56px)] overflow-auto">
      
      {
        !userName ? (
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg"/>
              <Skeleton className="h-3 w-4/5 rounded-lg"/>
            </div>
          </div>
        ) : (
          <div className='w-full flex justify-center py-5'>
            <h2 className="text-2xl font-semibold mb-6">Good morning, {userName}. 
            <br></br>
            How can I help you today?</h2>
          </div>
        )
      }

      <div className='w-full max-w-4xl '>
        <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} aria-label="Projects Tabs">
            <Tab key="recent" title="Recent">
            <div className="mt-5">
                <h3 className="flex items-center text-lg text-gray-300 font-medium mb-3">
                <ClockIcon className='mr-2 w-5 h-5'/>
                    Recent projects
                    </h3>
                <div className="flex flex-wrap gap-6">
                {projects.length === 0 ? (
                    <>
                    <Card className="w-[268px] space-y-5 p-4" radius="lg">
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">  
                          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                      </div>
                    </Card>
                    
                    <Card className="w-[268px] space-y-5 p-4" radius="lg">
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">  
                          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                      </div>
                    </Card>
                    
                    <Card className="w-[268px] space-y-5 p-4" radius="lg">
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">  
                          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                      </div>
                    </Card>
                    
                    </>
                ) : (
                  <>
                  {recentProjects.map((project: Project, index: number) => (
                  <div 
                    onClick={() => handleRouterToProject(project)}
                    onContextMenu={(e) => handleContextMenu(e, project)} 
                    key={index} 
                    className="h-24 w-[268px] cursor-pointer hover:scale-105 transition-all flex-shrink-0"
                  >
                    <Card className="h-full w-full p-3 space-y-0"> {/* Đặt chiều cao và rộng cố định */}
                      <CardHeader className="flex space-y-0 p-0 flex-row items-center">
                        <BriefcaseIcon className="w-4 h-4 mx-2" />
                        <h4 className="truncate w-full block mt-0">{project.name}</h4>
                      </CardHeader>
                      <CardBody className="space-y-0 flex flex-col justify-between p-0"> {/* Sử dụng flex để căn chỉnh nội dung */}
                        <p className="text-xs ml-2 py-1">2 documents, 2 conversations</p>
                        <div className="flex items-center text-xs text-gray-300">
                          <UserGroupIcon className="w-3 h-3 mx-1 ml-2" />
                          {formatTimeAgo(project.updated_at)}
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                
                ))}

                    </>
                )}
                </div>
            </div>
           
            </Tab>
            <Tab key="all-projects" title="All Projects">
            <div className="mt-5">
                <h3 className="text-lg text-gray-300 font-medium mb-3">All Projects</h3>
                <div className="flex flex-wrap gap-6">
                {projects.length === 0 ? (
                    <>
                    <Card className="w-[268px] space-y-5 p-4" radius="lg">
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">  
                          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                      </div>
                    </Card>
                    <Card className="w-[268px] space-y-5 p-4" radius="lg">
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">  
                          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                      </div>
                    </Card>
                    <Card className="w-[268px] space-y-5 p-4" radius="lg">
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">  
                          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                      </div>
                    </Card>
                    </>
                    
                ) : (
                  <>
                  {projects.map((project: Project, index: number) => (
                      <div 
                      onClick={() => handleRouterToProject(project)}
                      onContextMenu={(e) => handleContextMenu(e, project)} 
                      key={index} 
                      className="h-24 w-[268px] cursor-pointer hover:scale-105 transition-all flex-shrink-0"
                    >
                      <Card className="h-full w-full p-3 space-y-0"> {/* Đặt chiều cao và rộng cố định */}
                        <CardHeader className="flex space-y-0 p-0 flex-row items-center">
                          <BriefcaseIcon className="w-4 h-4 mx-2" />
                          <h4 className="truncate w-full block mt-0">{project.name}</h4>
                        </CardHeader>
                        <CardBody className="space-y-0 flex flex-col justify-between p-0"> {/* Sử dụng flex để căn chỉnh nội dung */}
                          <p className="text-xs ml-2 py-1">2 documents, 2 conversations</p>
                          <div className="flex items-center text-xs text-gray-300">
                            <UserGroupIcon className="w-3 h-3 mx-1 ml-2" />
                            {formatDate(project.updated_at)}
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                    ))}
                    </>
                )}
                </div>
            </div>
            </Tab>
        </Tabs>
      </div>
      {/* {contextMenu.show && (
        <div 
          id="context-menu" 
          className="absolute bg-white shadow-lg rounded-lg w-32 p-2 z-50" 
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul>
            <li 
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleToggleRename(contextMenu.projectId)}
            >
              Sửa
            </li>
            <li 
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleToggleDelete(contextMenu.projectId)}
            >
              Xóa
            </li>
          </ul>
        </div>
      )} */}
      <div className={`transition-opacity z-50 ${contextMenu.show ? 'visible opacity-100' : 'invisible opacity-0'} context-menu absolute bg-zinc-800 rounded-lg shadow-lg shadow-zinc-900 w-48`} style={{ top: contextMenu.y, left: contextMenu.x }}>
        <ListboxWrapper>
          <Listbox aria-label="Actions">
            <ListboxItem 
              onClick={() => handleToggleRename(contextMenu.projectId)}
              key="rename" textValue="Pop Up">
              <div className='flex items-center'>
                <PencilSquareIcon className="h-4 w-4 mr-2" />
                Rename
              </div>
            </ListboxItem>
            <ListboxItem 
            onClick={() => handleToggleDelete(contextMenu.projectId)} 
            key="delete" textValue="Pop Up" className="text-danger" color="danger">
              <div className='flex items-center'>
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </div>
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </div>


      <Dialog open={isOpenRename} onOpenChange={handleToggleRename}>
          <DialogContent className="bg-zinc-800 border-none">
                  <DialogTitle >Edit Project</DialogTitle>
              <CardHeader>
                  <CardDescription>Edit the details of your project.</CardDescription>
              </CardHeader>
              <CardContent>
                  <form>
                      <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                              <label htmlFor="projectName">Name</label>
                              <Input
                                  className="rounded-md border-1 border-gray-400"
                                  required
                                  id="projectName"
                                  placeholder="Name of your project"
                                  value={selectedProject?.name || ''}
                                  onChange={(e) => setSelectedProject(prev => prev ? { ...prev, name: e.target.value } : null)}
                              />
                          </div>
                      </div>
                  </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                  <Button variant="bordered" onClick={() => handleToggleRename()}>Cancel</Button>
                  <Button isLoading={isLoadingRename} onClick={handleSaveChanges}>Save</Button>
              </CardFooter>
          </DialogContent>
      </Dialog>

            <AlertDialog open={isOpenDelete} onOpenChange={handleToggleDelete}>
                <AlertDialogContent className="bg-zinc-800 border-none">
                    <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center">
                        <ExclamationCircleIcon className="w-6 h-6 mr-2"/>
                        Do you really want to delete {selectedProject?.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Project cannot be restored.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <Button onClick={() => handleToggleDelete()}>Cancel</Button>
                    <Button isLoading={isLoadingDelete} onClick={() => handleDeleteProject()} color="danger">Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    </div>
  );
};

export default HomeMain;
