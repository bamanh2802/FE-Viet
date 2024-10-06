import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'; // Lấy project_id từ URL
import SidebarWorkspace from "./SidebarWorkSpace";
import ChatWindow from "./ChatWindow";
import SidebarDocument from "../../document/[document_id]/SidebarDocument";
import { Conversation } from "@/src/types/types";
import { getConversationInProject } from "@/service/projectApi";
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
    const router = useRouter()
    const { project_id, conversation_id } = router.query; // Lấy project_id từ URL

  
    const handleCreateConversation = () => {
      // const newConversation = `Conversation ${conversations.length + 1}`;
      // setConversations([...conversations, newConversation]);
      // setCurrentConversation(newConversation);
    };

    const handleGetConversation = async () => {
      try {
        const data = await getConversationInProject(project_id)
        setConversations(data.data)
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      if(project_id !== undefined) {
        handleGetConversation()
      }
    }, [project_id])
  
    const handleSelectConversation = (id: string) => {
      router.push(`/project/${project_id}/workspace/${id}`)
    };
  
    return (
      <div className="flex h-screen">
        <SidebarWorkspace
          conversations={conversations}
          onCreateConversation={handleCreateConversation}
          onSelectConversation={handleSelectConversation}
        />
        <div className="flex-1 flex flex-col relative">
          <div className="z-[5] absolute top-0 w-full h-14 bg-zinc-800">

          </div>
          <div className="absolute top-4 left-6 z-10">
            <Breadcrumbs>
              <BreadcrumbItem><HomeIcon className="w-4 h-4"/></BreadcrumbItem>
              <BreadcrumbItem>{project_id}</BreadcrumbItem>
              <BreadcrumbItem>{conversation_id}</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="absolute top-4 right-6">
            <UserDropdown />
          </div>
            <ChatWindow isDocument={false}/>

        </div>
      </div>
    );
}

export default WorkSpace