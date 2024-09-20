import React, {useState} from "react";
import SidebarWorkspace from "./SidebarWorkSpace";
import ChatWindow from "./ChatWindow";
import SidebarDocument from "../document/SidebarDocument";
const WorkSpace : React.FC = () => {
    const [conversations, setConversations] = useState<string[]>(['Conversation 1', 'Conversation 2']);
    const [currentConversation, setCurrentConversation] = useState<string | null>(null);
    const [files, setFiles] = useState<{ name: string; type: string }[]>([
      { name: 'file1.txt', type: 'text' },
      { name: 'image1.png', type: 'image' },
    ]);
  
    const handleCreateConversation = () => {
      const newConversation = `Conversation ${conversations.length + 1}`;
      setConversations([...conversations, newConversation]);
      setCurrentConversation(newConversation);
    };
  
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
            <ChatWindow conversationId={currentConversation} />
          ) : (
            <div className="flex-1 flex items-center justify-center">Select a conversation to start chatting!</div>
          )}
        </div>
        <SidebarDocument direction={"end"}/>
      </div>
    );
}

export default WorkSpace