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
const handleRouterToConversation = (conversation: Conversation) => {
  router.push(`project/${conversation.project_id}/workspace/${conversation.conversation_id}`)
} 
const handleRouterToDocument = (document: Document) => {
  router.push(`/project/${document.project_id}/document/${document.document_id}`)
}
const [isOpenProjects, setIsOpenProjects] = useState(true); 
const [isOpenDocuments, setIsOpenDocuments] = useState(true); 
const [isOpenConversations, setIsOpenConversations] = useState(true)
const toggleOpenProjects = () => {
  setIsOpenProjects(!isOpenProjects);
};
const toggleOpenDocuments = () => {
  setIsOpenDocuments(!isOpenDocuments)
}
const toggleOpenConversations = () => {
  setIsOpenConversations(!isOpenConversations)
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

        </ul>
      </div>

      <div className="mb-6">
        <h3
          onClick={toggleOpenConversations}
          className="flex items-center justify-between text-sm font-semibold dark:text-gray-400 text-gray-700 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <span>Conversations</span>
          <ChevronDownIcon
            className={`w-4 h-4 transform transition-transform duration-300 ${isOpenConversations ? 'rotate-180' : ''}`}
          />
        </h3>
        
        <ul
          className={`mt-2 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpenConversations ? 'max-h-96' : 'max-h-0'}`}
        >
          
          {conversations.length === 0 ? (
            <div className='gap-2'>
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-full rounded-lg mt-1 bg-zinc-300 dark:bg-zinc-700" />
            </div>
          ) : (
            <>
              {conversations.map((conv: Conversation, index: number) => (
                <li
                  onClick={() => handleRouterToConversation(conv)}
                  key={index}
                  className="group transition-all cursor-pointer px-2 p-1 rounded-lg flex items-center justify-between text-sm space-x-1 dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-800 hover:bg-zinc-200 "
                >
                  <div className="flex items-center  w-[90%]">
                    <DocumentTextIcon className="h-4 w-4 dark:text-gray-400 text-gray-700" />
                    <span className="pl-1 truncate  w-[90%]">{conv.conversation_name}</span>
                  </div>
                  <div>
                    <ChevronDoubleRightIcon className="h-4 w-4 dark:text-gray-400 text-gray-700 opacity-0 group-hover:opacity-95 transition-all" />
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

    </div>
  </div>
);
};

export default SidebarHome;
