import { LockClosedIcon, 
  PlusIcon, 
  DocumentIcon, 
  ArrowUpTrayIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import {Button} from '@nextui-org/react';
import { Project, Document, Conversation } from '@/src/types/types';
import { FC, useEffect, useState } from 'react';
import {Skeleton} from "@nextui-org/react";
import { useRouter } from 'next/router';



interface SidebarHomeProps {
  projects: Project[];
  documents: Document[];
  conversations: Conversation[]
}

const SidebarHome: React.FC<SidebarHomeProps> = ({ projects, documents, conversations }) => {
const router = useRouter()
const handleRouterToProject = (project: Project) => {
  router.push(`/project/${project.project_id}`)
}
const handleRouterToDocument = (document: Document) => {
  router.push(`/project/${document.project_id}/document/${document.document_id}`)
}
const [isOpenProjects, setIsOpenProjects] = useState(true); 
const [isOpenDocuments, setIsOpenDocuments] = useState(true); 

const toggleOpenProjects = () => {
  setIsOpenProjects(!isOpenProjects);
};
const toggleOpenDocuments = () => {
  setIsOpenDocuments(!isOpenDocuments)
}

useEffect(() => {
  console.log(documents)
},[documents])

return (
  <div className="w-56 min-w-56 p-4 h-screen dark:bg-zinc-900 bg-zinc-50">
    <div>
      <h1 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-gray-400">Viet</h1>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-gray-400">Quick access</h2>
      </div>
      <div className='pb-8'>
      <Button 
          size='sm'
          variant='flat' 
          className='w-full mb-6' startContent={<MagnifyingGlassIcon className='w-4 h-4' />}>
            Search something...
        </Button>
      </div>
      {/* Projects */}
      <div className="mb-6">
        <h3
          onClick={toggleOpenProjects}
          className="flex items-center justify-between text-sm font-semibold dark:text-gray-400 text-gray-700 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <span>Projects</span>
          <ChevronDownIcon
            className={`w-4 h-4 transform transition-transform duration-300 ${isOpenProjects ? 'rotate-180' : ''}`}
          />
        </h3>
        
        {/* Danh sách projects với hiệu ứng đóng/mở */}
        <ul
          className={`mt-2 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpenProjects ? 'max-h-96' : 'max-h-0'}`}
        >
          {projects.length === 0 ? (
            <div className='gap-2'>
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
            </div>
          ) : (
            <>
              {projects.map((project: Project, index: number) => (
                <li
                  onClick={() => handleRouterToProject(project)}
                  key={index}
                  className="group transition-all cursor-pointer px-2 p-1 rounded-lg flex items-center justify-between text-sm space-x-1 dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-800 hover:bg-zinc-200 "
                >
                  <div className="flex items-center  w-[90%]">
                    <UserGroupIcon className="h-4 w-4 dark:text-gray-400 text-gray-700" />
                    <span className="pl-1 truncate  w-[90%]">{project.name}</span>
                  </div>
                  <div>
                    <ChevronDoubleRightIcon className="h-4 w-4 dark:text-gray-400 text-gray-700 opacity-0 group-hover:opacity-95 transition-all" />
                  </div>
                </li>
              ))}
            </>
          )}
          {/* <Button className='hover:bg-zinc-200 text-xs dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-700py-1 w-full' variant="ghost">
            <PlusIcon className="h-4 w-4" />
            &nbsp; New project
          </Button> */}
        </ul>
      </div>


      <div className="mb-6">
        <h3
          onClick={toggleOpenDocuments}
          className="flex items-center justify-between text-sm font-semibold dark:text-gray-400 text-gray-700 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <span>Documents</span>
          <ChevronDownIcon
            className={`w-4 h-4 transform transition-transform duration-300 ${isOpenDocuments ? 'rotate-180' : ''}`}
          />
        </h3>
        
        {/* Danh sách projects với hiệu ứng đóng/mở */}
        <ul
          className={`mt-2 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpenDocuments ? 'max-h-96' : 'max-h-0'}`}
        >
          
          {documents.length === 0 ? (
            <div className='gap-2'>
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
            </div>
          ) : (
            <>
              {documents.map((doc: Document, index: number) => (
                <li
                  onClick={() => handleRouterToDocument(doc)}
                  key={index}
                  className="group transition-all cursor-pointer px-2 p-1 rounded-lg flex items-center justify-between text-sm space-x-1 dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-800 hover:bg-zinc-200 "
                >
                  <div className="flex items-center  w-[90%]">
                    <DocumentTextIcon className="h-4 w-4 dark:text-gray-400 text-gray-700" />
                    <span className="pl-1 truncate  w-[90%]">{doc.document_name}</span>
                  </div>
                  <div>
                    <ChevronDoubleRightIcon className="h-4 w-4 dark:text-gray-400 text-gray-700 opacity-0 group-hover:opacity-95 transition-all" />
                  </div>
                </li>
              ))}
            </>
          )}

          {/* <Button className='hover:bg-zinc-200 text-xs dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-700py-1 w-full' variant="ghost">
            <PlusIcon className="h-4 w-4" />
            &nbsp; New project
          </Button> */}
        </ul>
      </div>

    </div>
  </div>
);
};

export default SidebarHome;


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