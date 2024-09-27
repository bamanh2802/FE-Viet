import React, { useState, useRef, useEffect } from "react";
import { Tabs, Tab, Listbox, ListboxItem, 
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DropdownSection } from "@nextui-org/react";
import SidebarDocument from "./SidebarDocument";
import NavbarDocument from "./NavbarDocument";
import TextInteraction from "./TextInteraction";
import Chatbot from "./Chatbot";
import { PlusIcon, TrashIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { ListboxWrapper } from "@/components/ListboxWrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import NavbarHome from "@/components/global/NavbarHome";
import ChatWindow from "../../workspace/ChatWindow";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { getDocumentById } from "@/service/projectApi";


const chatData = [
  { id: "chat1", title: "Chat 1", messages: ["Hello", "How are you?"] },
  { id: "chat2", title: "Chat 2", messages: ["Hi", "What's up?"] },
  // Add more chats to test the dropdown
  // { id: "chat3", title: "Chat 3", messages: [] },
  // ...
  // { id: "chat10", title: "Chat 10", messages: [] },
];

const Document: React.FC = () => {
  const router = useRouter();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [chats, setChats] = useState(chatData);
  const [selectedChat, setSelectedChat] = useState<string>(chats[0]?.id || "");
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; tabId: string | null }>({
    visible: false,
    x: 0,
    y: 0,
    tabId: null,
  });
  const { project_id, document_id } = router.query;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleGetDocument = async () => {
    
  }

  const hideContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, tabId: null });
  };

  const getNextChatId = () => {
    // Find the maximum numeric ID in existing chats
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
      hideContextMenu()
      addNewChat();
    } else {
      hideContextMenu()
      setSelectedChat(key);
    }
  };

  const createNewChat = () => {
    addNewChat();
  }

  const handleContextMenu = (event: React.MouseEvent, tabId: string) => {
    event.preventDefault();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;
      setContextMenu({
        visible: true,
        x: x,
        y: y,
        tabId: tabId,
      });
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
    <ResizablePanelGroup
      direction="horizontal"
      className="w-screen h-screen"
    >

    <div className="flex h-full relative " ref={containerRef}>
      <div>
        <SidebarDocument />
      </div>
      <div className="flex flex-col w-full">
        <NavbarHome />
        <div className="flex border-box pt-1" style={{ height: "calc(100% - 48px)", width: "calc(100% - 4px)" }}>
        <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <TextInteraction />
          </ResizablePanel >
          <ResizableHandle withHandle className="bg-opacity-0"/>
          <ResizablePanel defaultSize={50}>
          <div className="flex-1 bg-neutral-800 rounded-t-md h-full">
            {chats.length > 7 ? (
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    Chat Menu
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Chat Menu">
                <DropdownSection> 
                  {chats.map((chat) => (
                    <DropdownItem key={chat.id} onClick={() => handleTabChange(chat.id)}>
                      {chat.title}
                    </DropdownItem>
                  ))}
                  </DropdownSection>
                  <DropdownItem key="add" onClick={createNewChat}>
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
                    <ChatWindow conversationId='test'/>
                  </Tab>
                ))}
                <Tab key="add" title={<PlusIcon className="h-5 w-5 text-gray-500" />} />
              </Tabs>
            )}
            <div
              ref={menuRef}
              style={{
                top: contextMenu.y,
                left: contextMenu.x,
                zIndex: 1000,
                minWidth: '150px',
              }}
              className={`${
                contextMenu.visible ? 'visible opacity-100' : 'invisible opacity-0'
              } rounded shadow-lg absolute transition-opacity bg-zinc-800`}
            >
              <ListboxWrapper>
                <Listbox aria-label="Actions">
                  <ListboxItem onClick={createNewChat} key="new">
                    <div className="flex items-center">
                      <PlusIcon className="h-4 w-4 pr-1"/> New Chat
                    </div>
                  </ListboxItem>
                  <ListboxItem onClick={() => handleMenuClick("open")} key="edit">
                    <div className="flex items-center">
                      <ChatBubbleBottomCenterIcon className="h-4 w-4 pr-1" /> Open Chat
                    </div>
                  </ListboxItem>
                  <ListboxItem className="text-danger" onClick={() => handleMenuClick("delete")} key="delete" color="danger">
                    <div className="flex items-center">
                      <TrashIcon className="h-4 w-4 pr-1" /> Delete Chat
                    </div>
                  </ListboxItem>
                </Listbox>
              </ListboxWrapper>
            </div>
          </div>
          </ResizablePanel>

          </ResizablePanelGroup>
          
        </div>
      </div>
    </div>
    </ResizablePanelGroup>

  );
};

export default Document;
