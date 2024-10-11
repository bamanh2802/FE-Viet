import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'; // Lấy project_id từ URL
import SidebarWorkspace from "./SidebarWorkSpace";
import ChatWindow from "./ChatWindow";
import SidebarDocument from "../../document/[document_id]/SidebarDocument";
import { Conversation, Project } from "@/src/types/types";
import { getConversationInProject, getProjectById } from "@/service/projectApi";
import UserDropdown from "@/components/global/UserDropdown";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { HomeIcon } from "@heroicons/react/24/outline";


const WorkSpace : React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversation, setCurrentConversation] = useState<string | null>(null);
    const [files, setFiles] = useState<{ name: string; type: string }[]>([
      { name: 'file1.txt', type: 'text' },
      { name: 'image1.png', type: 'image' },
    ]);
    const [conversationName, setConversationName ] = useState<string>('')
    const router = useRouter()
    const { project_id, conversation_id } = router.query; // Lấy project_id từ URL
    const [projectInfo, setProjectInfo] = useState<Project>()
  
    const handleCreateConversation = () => {
      // const newConversation = `Conversation ${conversations.length + 1}`;
      // setConversations([...conversations, newConversation]);
      // setCurrentConversation(newConversation);
    };

    const handleGetConversation = async () => {
      try {
        const data = await getConversationInProject(project_id as string)
        setConversations(data.data)
      } catch (e) {
        console.log(e)
      }
    }

    const handleGetProjectById = async () => {
      try {
        const data = await getProjectById(project_id as string)
        setProjectInfo(data.data)
      } catch (e) {
        console.log(e)
      }
    }

    const handleBackHome = () => {
      router.push('/home')
    }

    useEffect(() => {
      if(project_id !== undefined) {
        handleGetConversation()
        handleGetProjectById()
      }
    }, [project_id])
  
    const handleSelectConversation = (conv: Conversation) => {
      router.push(`/project/${project_id}/workspace/${conv.conversation_id}`)
      setConversationName(conv.conversation_name)
    };
  
    return (
      <div className="flex h-screen">
        <SidebarWorkspace
          conversations={conversations}
          onCreateConversation={handleCreateConversation}
          onSelectConversation={handleSelectConversation}
        />
        <div className="flex-1 flex flex-col relative">
          <div className="z-[5] absolute top-0 w-full h-11 bg-zinc-200 dark:bg-zinc-800">

          </div>
          <div className="absolute top-2 left-6 z-10">
            <Breadcrumbs>
              <BreadcrumbItem><HomeIcon className="w-4 h-4"/></BreadcrumbItem>
              <BreadcrumbItem onClick={handleBackHome}>{projectInfo?.name}</BreadcrumbItem>
              <BreadcrumbItem>{conversationName}</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="absolute top-2 right-6">
            <UserDropdown />
          </div>
            <ChatWindow 
            conversation_id={conversation_id}
            isDocument={false}/>

        </div>
      </div>
    );
}

export default WorkSpace