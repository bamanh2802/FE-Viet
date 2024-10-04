import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'; // Lấy project_id từ URL
import SidebarWorkspace from "./SidebarWorkSpace";
import ChatWindow from "./ChatWindow";
import SidebarDocument from "../../document/[document_id]/SidebarDocument";
import { Conversation } from "@/src/types/types";
import { getConversationInProject } from "@/service/projectApi";
const WorkSpace : React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversation, setCurrentConversation] = useState<string | null>(null);
    const [files, setFiles] = useState<{ name: string; type: string }[]>([
      { name: 'file1.txt', type: 'text' },
      { name: 'image1.png', type: 'image' },
    ]);
    const router = useRouter()
    const { project_id } = router.query; // Lấy project_id từ URL

  
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
      handleGetConversation()
    })
  
    const handleSelectConversation = (id: string) => {
      setCurrentConversation(id);
    };
  
    return (
      <div className="flex h-screen">
        <SidebarWorkspace
          conversations={conversations}
          onCreateConversation={handleCreateConversation}
          onSelectConversation={handleSelectConversation}
        />
        <div className="flex-1 flex flex-col mr-1">
          {currentConversation ? (
            <ChatWindow conversationId={currentConversation} isDocument={false}/>
          ) : (
            <div className="flex-1 flex items-center justify-center">Select a conversation to start chatting!</div>
          )}
        </div>
      </div>
    );
}

export default WorkSpace