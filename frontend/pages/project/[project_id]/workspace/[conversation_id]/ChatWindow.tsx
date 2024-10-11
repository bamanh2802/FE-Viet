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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { SiMicrosoftpowerpoint } from "react-icons/si";
import { PiFilePdfDuotone } from "react-icons/pi";
import { TbWorldWww } from "react-icons/tb";
import { getDocumentsByConversation } from '@/service/documentApi';
import { Document, Message, Chunk} from '@/src/types/types';
import {createRoot} from 'react-dom/client'
import ReactMarkdown from 'react-markdown';
import { RiRobot2Line } from "react-icons/ri";

import DocumentViewer from '@/components/global/DocumentViewer';
import BotLoading from '@/public/svg/activity.json'
import dynamic from 'next/dynamic';
import TypingMessage from '@/components/chatbot/TypingMessage';


interface ChatWindowProps {
  isDocument: boolean
  conversation_id: string
}


const ChatWindow: FC<ChatWindowProps> = ({ isDocument, conversation_id }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter()
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useRef<WebSocket | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isOpenSource, setIsOpenSource] = useState<boolean>(false)
  const [documents, setDocuments] = useState<Document[]>([])
  const [isOpenDocument, setIsOpenDocument] = useState<boolean>(false)
  const [selectedDocument, setSelectedDocument] = useState<Document>()
  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

  const handleOpenDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsOpenDocument(true)
  }
  const handleCloseDocument = () => setIsOpenDocument(false)

  const handleOpenSource = () => setIsOpenSource(true)
  const handleCloseSource = () => setIsOpenSource(false)
  const handleToggleSource = () => setIsOpenSource(!isOpenSource)

  const dispatch = useDispatch();
  const conversation = useSelector((state: RootState) => state.chat.conversations[conversation_id] || { messages: [], isLoading: false });
  
  const [currentMessage, setCurrentMessage] = useState<string>('');


  const handleGetDocumentByConversation = async () => {
    try {
      const data = await getDocumentsByConversation(conversation_id)
      setDocuments(data.data)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  function findDocumentNameById(document_id: string): string | undefined {
    const document = documents.find(doc => doc.document_id === document_id);
    
    return document ? document.document_name : undefined;
  }
  function convertISOToDate(isoString: string) {
    const date = new Date(isoString);
  
    const day = date.getDate(); // Ngày
    const year = date.getFullYear(); // Năm
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const month = monthNames[date.getMonth()]; // Tháng (0 - 11)
  
    return `${day} ${month} ${year}`;
  }
  function getIconByFileType(fileName: string) {
    if (fileName?.endsWith('.pptx')) {
      return <SiMicrosoftpowerpoint />; // Replace with your PowerPoint icon component
    } else if (fileName?.endsWith('.pdf')) {
      return <PiFilePdfDuotone />; // Replace with your PDF icon component
    } else if (fileName?.startsWith('https')) {
      return <TbWorldWww />; // Replace with your web icon component
    }
    return null; // Default case if no match
  }

  
  

  useEffect(() => {
    if(conversation_id !== undefined && !isDocument) {
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
      const response = event.data
      if (response !== '<END_OF_CONTEXT>' && !response.includes('chunk_id') && response !== '<END_OF_RESPONSE>') {
        dispatch(updateServerMessage({ conversation_id, content: event.data }));
      
      } else if(response.includes('chunk_id')) {
          const chunk_ids = JSON.parse(response);
          const currentChunkIds = chunk_ids.context.map(chunk_id => JSON.parse(chunk_id));
          console.log(currentChunkIds)
          setTimeout(() => {
            dispatch(finalizeServerMessage({ 
              conversation_id, 
              chunk_ids: currentChunkIds 
            }));
          }, 1000)
        
      } else {
        setLoading(false);
        // dispatch(finalizeServerMessage({ conversation_id }));
      }
    };

    socket.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [conversation_id, dispatch]);



  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({ top: chatWindowRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

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
    e.preventDefault();
    if (input && socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(input);
      dispatch(addUserMessage({ conversation_id, content: input }));
      setInput('');
      dispatch(addServerMessage({ conversation_id, content: '' }));
    }
  };

  const handleExplainWord = async () => {
    
  }

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
      height: `${isDocument ? 'calc(100vh - 112px)' : '100vh'}`
    }}
    className={`flex flex-col relative justify-between overflow-auto bg-zinc-200 dark:bg-zinc-800 w-full`}>
      <div className={`flex flex-col ${isDocument ? 'w-full px-7' : 'w-9/12 pr-16 pl-10 pt-14 '} max-w-3xl  mx-auto flex-grow`}>
        {/* Chat window */}
        <div
          ref={chatWindowRef}
          className="w-full flex-1 relative overflow-auto"
        >
          {conversation.messages.map((msg, index) => (
            
            <div
              key={msg.id}
              className={` group flex  ${msg.sender === 'User' ? 'bg-neutral-700 w-fit ml-auto max-w-md' : 'flex'} 
              mb-2 p-2 rounded-3xl mt-3 px-4 ${msg.status === 'streaming' ? 'bg-gray-700' : ''}`}
              onContextMenu={(e) => handleRightClick(e, msg)}
            >
              {/* Avatar bot if Server */}
              {msg.sender === 'Server' && msg.content === '' && (
                <div className="animate-pulse mr-2 flex items-center flex-shrink-0 self-start ">
                  <Lottie animationData={BotLoading} loop={true} />
                  <span className=' text-xs'>Viet is thinking ...</span>
                </div>
              )}
              {msg.sender === 'Server' && msg.content !== '' && (
                <div className="mr-2 flex items-center flex-shrink-0 self-start ">
                <RiRobot2Line className='w-4 h-4'/>
              </div>
              )}
              {/* Message content */}

              <div className={`flex flex-col ${msg.sender === 'Server' ? 'ml-2' : ''}`}>
                  {
                    msg.sender === 'Server' && msg.status === 'streaming' ? (
                      <TypingMessage message={msg.content}/>
                    ) : (
                      <ReactMarkdown>
                      {msg.content}
                      </ReactMarkdown>
                    )
                  }
                  
                {Array.isArray(msg.chunk_ids) && msg.chunk_ids.length > 0 && msg.sender === 'Server' && (
                  <div className="flex flex-wrap mt-2 items-center">
                    <i>Learn more:</i> 
                    {msg.chunk_ids.map((chunkId) => {
                      const documentName = findDocumentNameById(chunkId.document_id);
                      const icon = getIconByFileType(documentName);

                      return (
                        <HoverCard key={chunkId.chunk_id}>
                          <HoverCardTrigger asChild>
                            <Button className='ml-3' variant="shadow" isIconOnly key={chunkId.chunk_id}>
                              {icon} {/* Render the icon here */}
                              {/* You can also include the order number if desired */}
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80 dark:bg-zinc-900 bg-zinc-50">
                            <div className="flex justify-between space-x-4">
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{documentName}</h4>
                                <p className="text-sm">{chunkId.content}</p>
                                <div className="flex items-center pt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {convertISOToDate(chunkId.created_at)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      );
                    })}
                  </div>
                )}

                {/* Display icons on hover */}
                {msg.sender === 'Server' && msg.content !== '' && (
                  <div className="space-x-2 p-2"
                  style={{bottom: '-24px', left: '56px'}}
                  >
                    <button><HeartIcon className="w-5 h-5 " /></button>
                    <button><HandThumbDownIcon className="w-5 h-5 " /></button>
                    <button onClick={handleCopy}><ClipboardIcon className="w-5 h-5" /></button>
                    <button><PencilSquareIcon className="w-5 h-5 " /></button>
                  </div>
                )}
              </div>
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
        <div className="pl-6 w-full bg-zinc-200 dark:bg-zinc-800 flex justify-center items-center flex-col mt-4 sticky bottom-0">
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
      
      {!isDocument && (
        <div 
        className='fixed bottom-9 right-9 z-5'>
          <Tooltip content="Document Pool!">
            <Button 
            onClick={() => handleToggleSource()}
            size="lg"  isIconOnly className='rounded-full'>
            <FolderIcon  className='w-4 h-4'/>
            </Button>
          </Tooltip>
        </div>
      )}

       
       
    </div>
    {
      isOpenSource && (
        <div className='w-60 h-full pt-14 border-opacity-80 bg-zinc-200 dark:bg-zinc-900 border-l-1 p-2'>
            <div className="grid gap-4 py-4">
              <h3 className="flex items-center justify-between text-sm font-semibold dark:text-gray-400 text-gray-700 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800">
                <span>Documents</span>
              </h3>
              <div className="ml-1 mt-1 space-y-1">
                {documents?.map((doc) => (
                  <div
                  onClick={() => handleOpenDocument(doc)}
                    key={doc.document_id}
                    className="p-2 transition-all ml-2 group flex justify-between items-center space-x-2 text-sm cursor-pointer rounded-lg dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-800 hover:bg-zinc-200"
                  >
                    <Tooltip content={doc.document_name}>
                    <span  className='w-40 truncate'>{doc.document_name}</span>
                    </Tooltip>
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


<DocumentViewer document={selectedDocument} isOpen={isOpenDocument} onClose={handleCloseDocument}/>
    
    </div>
  );
};

export default ChatWindow;