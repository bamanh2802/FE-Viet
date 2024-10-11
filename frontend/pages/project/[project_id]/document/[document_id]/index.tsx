import React, { useState, useRef, useEffect } from "react";
import { Tabs, Tab, Listbox, ListboxItem, 
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DropdownSection } from "@nextui-org/react";
import SidebarDocument from "./SidebarDocument";
import NavbarDocument from "./NavbarDocument";
import TextInteraction from "./TextInteraction";
import { PlusIcon, TrashIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { ListboxWrapper } from "@/components/ListboxWrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatWindow from "../../workspace/[conversation_id]/ChatWindow";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDocumentById, getDocumentInProject } from "@/service/projectApi";
import { getConversationByDocument, getDocumentsByConversation } from "@/service/documentApi";
import { getAllProjects } from "@/service/apis";
import { Document, Project, Conversation } from "@/src/types/types";


// Sample data for chats
const chatData = [
  { id: "chat1", title: "Chat 1", messages: ["Hello", "How are you?"] },
  { id: "chat2", title: "Chat 2", messages: ["Hi", "What's up?"] },
];

const DocumentPage: React.FC = () => {
  const router = useRouter();
  const { project_id, document_id } = router.query as { project_id?: string; document_id?: string };  // Destructure and type `project_id` and `document_id`
  
  // State management with proper type annotations
  const [documents, setDocuments] = useState<Document[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [conversation, setConversations] = useState<Conversation[]>([]);
  const [projectName, setProjectName] = useState<string>("Loading...");
  const [documentName, setDocumentName] = useState<string>("Loading...");
  const [selectedChat, setSelectedChat] = useState<string>(conversation[0]?.conversation_id || "");
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; tabId: string | null }>({
    visible: false,
    x: 0,
    y: 0,
    tabId: null,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside the context menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        hideContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGetConversations = async () => {
    try {
      const data = await getDocumentsByConversation(document_id as string)
      setConversations(data.data)
    } catch (e) {
      console.log(e)
    }
  }

  // Fetch all projects
  const handleGetProjects = async () => {
    try {
      const data = await getAllProjects();
      console.log(data);
      setProjects(data.data);
      setProjectName(getProjectNameById(project_id ?? "", data.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetProjects();
  }, [project_id]);

  const getProjectNameById = (projectId: string, projects: Project[]) => {
    const project = projects.find((proj) => proj.project_id === projectId);
    return project ? project.name : "Loading...";
  };

  const getDocumentNameById = (documentId: string, documents: Document[]) => {
    const document = documents.find((doc) => doc.document_id === documentId);
    return document ? document.document_name : "Loading...";
  };

  const handleGetDocument = async () => {
    try {
      if (document_id) {
        const data = await getDocumentById(document_id);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetAllDocument = async () => {
    try {
      if (project_id) {
        const data = await getDocumentInProject(project_id);
        console.log(data);
        setDocuments(data.data);
        setDocumentName(getDocumentNameById(document_id ?? "", data.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (project_id && document_id) {
      handleGetDocument();
      handleGetAllDocument();
      handleGetConversations()
    }
  }, [project_id, document_id]);

  // Hide context menu
  const hideContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, tabId: null });
  };


  const addNewChat = () => {
    // const newChatId = getNextChatId();
    // const newChat = { id: newChatId, title: `Chat ${newChatId.replace("chat", "")}`, messages: [] };
    // setChats([...chats, newChat]);
    // setSelectedChat(newChatId);
    // hideContextMenu();
  };

  const handleTabChange = (key: string) => {
    if (key === "add") {
      hideContextMenu();
      addNewChat();
    } else {
      hideContextMenu();
      setSelectedChat(key);
    }
  };

  const createNewChat = () => {
    addNewChat();
  };

  const handleContextMenu = (event: React.MouseEvent, tabId: string) => {
    event.preventDefault();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;
      setContextMenu({ visible: true, x, y, tabId });
    }
  };

  const handleMenuClick = (action: string) => {
    if (contextMenu.tabId) {
      if (action === "open") {
        setSelectedChat(contextMenu.tabId);
      } else if (action === "delete") {
        setConversations(conversation.filter((conv) => conv.conversation_id !== contextMenu.tabId));
        if (selectedChat === contextMenu.tabId) {
          setSelectedChat(conversation[0]?.conversation_id || "");
        }
      }
    }
    hideContextMenu();
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
    <div className="flex h-full relative" ref={containerRef}>
      <SidebarDocument />
      <div className="flex flex-col w-full">
        <NavbarDocument projectName={projectName} documentName={documentName} />
        <div className="flex" style={{ height: "calc(100% - 48px)", width: "100%" }}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel minSize={40} defaultSize={50}>
              <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 h-full">
                <Tabs
                  variant="underlined"
                  className="w-full p-0"
                  aria-label="Document Sections" // Đảm bảo Tabs có aria-label
                >
                  {/* Conversations Tab */}
                  <Tab key="conversations" title="Conversations">
                    {/* <Tabs
                      aria-label="Chat Tabs" // Thêm aria-label
                      selectedKey={selectedChat}
                      onSelectionChange={(key) => handleTabChange(key as string)}
                      className="w-full p-0"
                    >
                      {conversation.map((conv, index) => (
                        <Tab
                          key={conv.conversation_id}
                          title={conv.conversation_name}
                          onContextMenu={(e) => handleContextMenu(e, conv.conversation_id)}
                          aria-label={`Conversation ${conv.conversation_name}`} // Thêm aria-label
                        >
                          <ChatWindow conversationId={conv.conversation_id} isDocument={true} />
                        </Tab>
                      ))}
                      <Tab 
                        key="add" 
                        title={<PlusIcon className="h-5 w-5 text-gray-500" aria-label="Add new chat" />} // Thêm aria-label cho icon
                        aria-label="Add new chat" // Đảm bảo tab có aria-label
                      />
                    </Tabs> */}
                  </Tab>
  
                  {/* Analysis Tab */}
                  <Tab key="analysis" title="Analysis" aria-label="Analysis Tab">
                    <div className="flex justify-center items-center h-full">
                      <p className="text-lg">Analysis Content Goes Here</p>
                    </div>
                  </Tab>
                </Tabs>
  
                {/* Context Menu for Chat Tabs */}
                <div
                  ref={menuRef}
                  style={{
                    top: contextMenu.y,
                    left: contextMenu.x,
                    zIndex: 1000,
                    display: contextMenu.visible ? "block" : "none",
                  }}
                  className="absolute dark:bg-zinc-800 bg-zinc-200 rounded-lg shadow-md border"
                  aria-label="Context Menu" // Thêm aria-label cho context menu
                >
                  <ListboxWrapper selectionMode="single" onAction={handleMenuClick}>
                    <Listbox aria-label="Chat Actions">
                      <ListboxItem key="rename" textValue="Rename" aria-label="Rename Chat">
                        <div className="flex items-center">
                          <ChatBubbleBottomCenterIcon className="h-4 w-4 pr-1" aria-hidden="true" />
                          <span>Rename</span>
                        </div>
                      </ListboxItem>
                      <ListboxItem key="delete" textValue="Delete" className="text-danger" aria-label="Delete Chat">
                        <div className="flex items-center">
                          <TrashIcon className="h-4 w-4 pr-1" aria-hidden="true" />
                          <span>Delete</span>
                        </div>
                      </ListboxItem>
                    </Listbox>
                  </ListboxWrapper>
                </div>
              </div>
            </ResizablePanel>
  
            <ResizableHandle />
  
            <ResizablePanel minSize={20}>
              <div className="flex-1 h-full">
                <TextInteraction />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  </ResizablePanelGroup>
  
  
  );
};

export default DocumentPage;
