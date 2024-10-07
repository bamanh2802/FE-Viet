import React, { FC, useEffect, useState, useRef, FormEvent, KeyboardEvent, MouseEvent } from 'react';
import { Button, Textarea, Listbox, ListboxItem, Tooltip } from "@nextui-org/react";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ClipboardIcon, HeartIcon, HandThumbDownIcon, PencilSquareIcon,
  Square2StackIcon, QuestionMarkCircleIcon, ClipboardDocumentCheckIcon, FolderIcon,
  EllipsisHorizontalIcon
 } from '@heroicons/react/24/outline';
import '@/components/project/config.css';
import { ListboxWrapper } from '@/components/ListboxWrapper';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, addServerMessage, updateServerMessage, finalizeServerMessage } from '@/src/chatSlice';
import { RootState } from '@/src/store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getDocumentsByConversation } from '@/service/documentApi';
import { Document } from '@/src/types/types';

interface ChatWindowProps {
  isDocument: boolean
}

interface Message {
  id: number;
  sender: 'Server' | 'User';
  content: string;
  status: 'loading' | 'sent' | 'streaming';
}

const ChatWindow: FC<ChatWindowProps> = ({ isDocument }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatarLoading, setAvatarLoading] = useState<boolean>(false);
  const router = useRouter()
  const { conversation_id } = router.query as { conversation_id: string };
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useRef<WebSocket | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isOpenSource, setIsOpenSource] = useState<boolean>(false)
  const [documents, setDocuments] = useState<Document[]>([])

  const handleOpenSource = () => setIsOpenSource(true)
  const handleCloseSource = () => setIsOpenSource(false)

  const dispatch = useDispatch();
  const conversation = useSelector((state: RootState) => state.chat.conversations[conversation_id] || { messages: [], isLoading: false });
  
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [buffer, setBuffer] = useState<string>('');


  const handleGetDocumentByConversation = async () => {
    try {
      const data = await getDocumentsByConversation(conversation_id)
      setDocuments(data.data)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if(conversation_id !== undefined) {
      handleGetDocumentByConversation()
    }
  }, [conversation_id])

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:8000/ws/conversations/${conversation_id}/send-message`);

    socket.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.current.onmessage = (event: MessageEvent) => {
      setLoading(true);
      setAvatarLoading(false);
      if (event.data !== 'done') {
        setBuffer((prev) => prev + event.data);
        dispatch(updateServerMessage({ conversation_id, content: event.data }));
      } else {
        setLoading(false);
        dispatch(finalizeServerMessage({ conversation_id }));
      }
    };

    socket.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
      dispatch(finalizeServerMessage({ conversation_id }));
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [conversation_id, dispatch]);

  useEffect(() => {
    if (buffer) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => {
          const nextChar = buffer.charAt(0);
          setBuffer((prevBuffer) => prevBuffer.slice(1));
          if (buffer.length === 1) {
            dispatch(updateServerMessage({ conversation_id, content: prev + nextChar }));
            return '';
          }
          return prev + nextChar;
        });
      }, 50); // Adjust typing speed here

      return () => clearInterval(interval);
    }
  }, [buffer, conversation_id, dispatch]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({ top: chatWindowRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, currentMessage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (contextMenu && !target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    setAvatarLoading(true);
    e.preventDefault();
    if (input && socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(input);
      dispatch(addUserMessage({ conversation_id, content: input }));
      setInput('');
      dispatch(addServerMessage({ conversation_id, content: '' }));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  const handleRightClick = (e: MouseEvent<HTMLDivElement>, msg: Message) => {
    e.preventDefault();
    const selected = window.getSelection()?.toString();
    if (selected) {
      setSelectedText(selected);
      setContextMenu({ x: e.pageX, y: e.pageY });
    }
  };

  const handleCopy = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      setContextMenu(null);
    }
  };

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option} for text: ${selectedText}`);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div className='flex'>
      <div 
    style={{
      height: `${isDocument ? 'calc(100vh - 114px)' : '100vh'}`
    }}
    className={`pt-14 flex flex-col relative justify-between overflow-auto bg-zinc-200 dark:bg-zinc-800 w-full`}>
      <div className={`flex flex-col ${isDocument ? 'w-full' : 'w-9/12'} max-w-2xl mx-auto flex-grow`}>
        {/* Chat window */}
        <div
          ref={chatWindowRef}
          className="w-full flex-1 relative overflow-auto"
        >
          {conversation.messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`relative group ${msg.sender === 'User' ? 'bg-neutral-700 w-fit ml-auto max-w-xl' : 'flex'} 
              mb-2 p-2 rounded-3xl px-4 ${msg.status === 'loading' ? 'bg-gray-700' : ''}`}
              onContextMenu={(e) => handleRightClick(e, msg)}
            >
              {/* Avatar bot if Server */}
              {msg.sender === 'Server' && (
                <div className="mr-2 flex-shrink-0 self-start">
                  {avatarLoading ? (
                    <Button color="primary" variant='flat' isLoading>
                  </Button>
                  ) : (
                  <img
                    src="https://i.pinimg.com/originals/02/c5/a8/02c5a82909a225411008d772ee6b7d62.png"
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  )}
                </div>
              )}
              {/* Message content */}
              <p className="text-left">
                {msg.content}
                {index === conversation.messages.length - 1 && msg.sender === 'Server' && currentMessage}
              </p>
              
              {/* Display icons on hover */}
              {msg.sender === 'Server' && (
                <div className="absolute hidden group-hover:flex space-x-2 p-2"
                style={{bottom: '-24px', left: '56px'}}
                >
                  <button><HeartIcon className="w-5 h-5 " /></button>
                  <button><HandThumbDownIcon className="w-5 h-5 " /></button>
                  <button onClick={handleCopy}><ClipboardIcon className="w-5 h-5" /></button>
                  <button><PencilSquareIcon className="w-5 h-5 " /></button>
                </div>
              )}
            </div>
          ))}

          {/* Context menu on right click */}
          {contextMenu && (
            <div
              className='fixed bg-zinc-800 rounded shadow-lg'
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <ListboxWrapper>
                <Listbox
                  aria-label="Actions"
                  onAction={(key) => handleOptionClick(key as string)}
                >
                  <ListboxItem key="copy">
                    <div className='flex items-center'>
                      <Square2StackIcon className='pr-1 w-5 h-5'/>
                      Sao chép
                    </div>
                  </ListboxItem>
                  <ListboxItem key="explain">
                    <div className='flex items-center'>
                      <QuestionMarkCircleIcon className='pr-1 w-5 h-5'/>
                      Giải thích
                    </div>
                  </ListboxItem>
                  <ListboxItem key="addNote">
                    <div className='flex items-center'>
                      <ClipboardDocumentCheckIcon className='pr-1 w-5 h-5'/>
                      Thêm vào note
                    </div>
                  </ListboxItem>
                </Listbox>
              </ListboxWrapper>
            </div>
          )}
        </div>

        {/* Message input form */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 flex justify-center items-center flex-col mt-4 sticky bottom-0">
          <form onSubmit={sendMessage} className="max-w-2xl pr-2 flex w-full justify-center items-center rounded-3xl">
            <Textarea
              minRows={1}
              variant='faded'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="flex-1 p-1 rounded-full"
              placeholder="Type your message..."
            />
            <Button isIconOnly className="ml-2 text-white p-2 rounded-full bg-slate-400" type="submit">
              <ArrowRightIcon />
            </Button>
          </form>
          <div className="text-xs opacity-75 my-2">
            Viet can make mistakes. Check important info.
          </div>
        </div>
      </div>
      <div 
      className='absolute bottom-9 right-9 z-5'>
        <Tooltip content="Document Pool!">
          <Button 
          onClick={() => handleOpenSource()}
          size="lg"  isIconOnly className='rounded-full'>
          <FolderIcon  className='w-4 h-4'/>
          </Button>
        </Tooltip>
      </div>

       
       
    </div>
    {
      isOpenSource && (
        <div className='w-96 h-full pt-14 bg-zinc-200 dark:bg-zinc-900 border-l-1 p-2'>
            <div className="grid gap-4 py-4">
              <h3 className="flex items-center justify-between text-sm font-semibold dark:text-gray-400 text-gray-700 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800">
                <span>Documents</span>
              </h3>
              <div className="ml-1 mt-1 space-y-1">
                {documents?.map((doc) => (
                  <div
                    key={doc.document_id}
                    className="transition-all ml-2 group flex justify-between items-center space-x-2 text-sm cursor-pointer p-2 rounded-lg dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-800 hover:bg-zinc-200"
                  >
                    <span>{doc.document_name}</span>
                    <div className="opacity-0 group-hover:opacity-100">
                      <EllipsisHorizontalIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      )
    }
    
    </div>
  );
};

export default ChatWindow;