import { LockClosedIcon, 
    PlusIcon, 
    DocumentIcon, 
    ArrowUpTrayIcon,
    UserGroupIcon,
    ChatBubbleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronDownIcon
 } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button"
import { Project } from '@/src/types/types';
import { FC, useState } from 'react';
import {Skeleton} from "@nextui-org/react";
import { useRouter } from 'next/router';



interface SidebarHomeProps {
  projects: Project[];
}

const SidebarHome: React.FC<SidebarHomeProps> = ({ projects }) => {
  const router = useRouter()
  const handleRouterToProject = (project: Project) => {
    router.push(`/project/${project.project_id}`)
  }
  const [isOpen, setIsOpen] = useState(true); // Quản lý trạng thái đóng/mở

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="w-64 p-4 h-screen dark:bg-zinc-900 bg-zinc-100">
      <div>
        <h1 className="text-xl font-semibold mb-6">Viet</h1>
        <div className="mb-6">
          <h2 className="text-lg font-medium">Quick access</h2>
        </div>
        <div className="bg-gray-800 p-2 rounded-lg flex items-center mb-8">
          <input className="bg-transparent outline-none text-sm w-full" placeholder="Search..." />
        </div>
        {/* Projects */}
        <div className="mb-6">
      {/* Tiêu đề "Projects" với logic đóng/mở */}
          <h3
            onClick={toggleOpen}
            className="flex items-center justify-between text-sm font-semibold text-gray-500 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-800"
          >
            <span>Projects</span>
            <ChevronDownIcon
              className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </h3>
          
          {/* Danh sách projects với hiệu ứng đóng/mở */}
          <ul
            className={`mt-2 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
          >
            {projects.length === 0 ? (
              <div className='gap-2'>
                <Skeleton className="h-3 w-full rounded-lg mt-1" />
                <Skeleton className="h-3 w-full rounded-lg mt-1" />
                <Skeleton className="h-3 w-full rounded-lg mt-1" />
                <Skeleton className="h-3 w-full rounded-lg mt-1" />
              </div>
            ) : (
              <>
                {projects.map((project: Project, index: number) => (
                  <li
                    onClick={() => handleRouterToProject(project)}
                    key={index}
                    className="group transition-all cursor-pointer px-2 p-1 rounded-lg hover:bg-zinc-800 flex items-center justify-between text-sm space-x-1"
                  >
                    <div className="flex items-center justify-between">
                      <UserGroupIcon className="h-4 w-4 text-gray-600" />
                      <span className="pl-1">{project.name}</span>
                    </div>
                    <div>
                      <ChevronDoubleRightIcon className="h-4 w-4 text-gray-600 opacity-0 group-hover:opacity-95 transition-all" />
                    </div>
                  </li>
                ))}
              </>
            )}
            <Button className='text-xs text-gray-400 hover:bg-zinc-700 hover:text-white py-1 w-full' variant="ghost">
                    <PlusIcon className="h-4 w-4" />
                    &nbsp; New project
                </Button>
          </ul>
        </div>

        {/* Documents */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500">Documents</h3>
          <ul className="space-y-3 mt-2">
            <li className="flex items-center text-xs space-x-2">
              <DocumentIcon className="h-4 w-4 text-gray-600" />
              <span>Design Data-driven System</span>
            </li>
            <li className="flex items-center text-xs space-x-2">
              <DocumentIcon className="h-4 w-4 text-gray-600" />
              <span>Kafka - The definitive guide</span>
            </li>
            <li className="flex justify-center items-center text-xs space-x-2 text-gray-400">
                <Button className='text-xs hover:bg-zinc-800 hover:text-gray-100 text-gray-400' variant="ghost">
                    <ArrowUpTrayIcon className="h-4 w-4" />
                    &nbsp; Upload
                </Button>
            </li>
          </ul>
        </div> */}

        {/* Conversations */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500">Conversations</h3>
          <ul className="space-y-3 mt-2">
            <li className="flex items-center text-xs space-x-2">
                <ChatBubbleLeftIcon className='w-4 h-4 text-gray-600'/>
                <span>Natural Language Processing</span>
                </li>
            <li className="flex items-center text-xs space-x-2">
                <ChatBubbleLeftIcon className='w-4 h-4 text-gray-600'/>
                <span>Computer Vision</span>
                </li>
            <li className="flex items-center text-xs space-x-2">
                <ChatBubbleLeftIcon className='w-4 h-4 text-gray-600'/>
                <span>Big Data Management</span>
                </li>
            <li className="flex justify-center items-center text-xs space-x-2 text-gray-400">
                <Button className='text-xs hover:bg-zinc-800 hover:text-gray-100 text-gray-400' variant="ghost">
                    <PlusIcon className="h-4 w-4" />
                    &nbsp; New Conversation
                </Button>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default SidebarHome;
