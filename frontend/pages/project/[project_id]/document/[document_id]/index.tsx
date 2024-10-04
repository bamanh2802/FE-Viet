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
import { getAllProjects } from "@/service/apis";
import { Document, Project } from "@/src/types/types";

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
  const [chats, setChats] = useState(chatData);
  const [projectName, setProjectName] = useState<string>("Loading...");
  const [documentName, setDocumentName] = useState<string>("Loading...");
  const [selectedChat, setSelectedChat] = useState<string>(chats[0]?.id || "");
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
    }
  }, [project_id, document_id]);

  // Hide context menu
  const hideContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, tabId: null });
  };

  // Generate next chat ID
  const getNextChatId = (): string => {
    const maxId = chats.reduce((max, chat) => {
      const numericId = parseInt(chat.id.replace("chat", ""), 10);
      return Math.max(max, numericId);
    }, 0);
    return `chat${maxId + 1}`;
  };

  const addNewChat = () => {
    const newChatId = getNextChatId();
    const newChat = { id: newChatId, title: `Chat ${newChatId.replace("chat", "")}`, messages: [] };
    setChats([...chats, newChat]);
    setSelectedChat(newChatId);
    hideContextMenu();
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
        setChats(chats.filter((chat) => chat.id !== contextMenu.tabId));
        if (selectedChat === contextMenu.tabId) {
          setSelectedChat(chats[0]?.id || "");
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
              <ResizablePanel defaultSize={50}>
                <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 h-full">
                  {chats.length > 7 ? (
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">Chat Menu</Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Chat Menu">
                        <DropdownSection>
                          {chats.map((chat) => (
                            <DropdownItem textValue="temp" key={chat.id} onClick={() => handleTabChange(chat.id)}>
                              {chat.title}
                            </DropdownItem>
                          ))}
                        </DropdownSection>
                        <DropdownItem textValue="temp" key="add" onClick={createNewChat}>
                          <PlusIcon className="h-4 w-4 pr-1" /> Add New Chat
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Tabs
                      aria-label="Chat Tabs"
                      selectedKey={selectedChat}
                      onSelectionChange={(key) => handleTabChange(key as string)}
                      className="w-full p-0"
                    >
                      {chats.map((chat) => (
                        <Tab
                          key={chat.id}
                          title={chat.title}
                          onContextMenu={(e) => handleContextMenu(e, chat.id)}
                        >
                          <ChatWindow conversationId="test" isDocument={true}/>
                        </Tab>
                      ))}
                      <Tab key="add" title={<PlusIcon className="h-5 w-5 text-gray-500" />} />
                    </Tabs>
                  )}
                  <div
                    ref={menuRef}
                    style={{ top: contextMenu.y, left: contextMenu.x, zIndex: 1000, display: contextMenu.visible ? "block" : "none" }}
                    className="absolute bg-white rounded shadow-md border py-1"
                  >
                    <ListboxWrapper selectionMode="single" onAction={handleMenuClick}>
                      <ListboxItem key="open" textValue="Open">
                        <ChatBubbleBottomCenterIcon className="h-4 w-4 pr-1" />
                        Open Chat
                      </ListboxItem>
                      <ListboxItem key="delete" textValue="Delete">
                        <TrashIcon className="h-4 w-4 pr-1" />
                        Delete Chat
                      </ListboxItem>
                    </ListboxWrapper>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel minSize={50}>
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
