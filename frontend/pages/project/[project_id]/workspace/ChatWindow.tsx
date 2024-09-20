import React, { FC, useEffect, useState, useRef, FormEvent, KeyboardEvent, MouseEvent } from 'react';
import { Button, Textarea, Listbox, ListboxItem } from "@nextui-org/react";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import PlusIcon from '@heroicons/react/24/outline';
import { ClipboardIcon, HeartIcon, HandThumbDownIcon, PencilSquareIcon,
  Square2StackIcon, QuestionMarkCircleIcon, ClipboardDocumentCheckIcon
 } from '@heroicons/react/24/outline';
import '../../../components/project/config.css';
import { ListboxWrapper } from '@/components/ListboxWrapper';

interface ChatWindowProps {
  conversationId: string;
}

interface Message {
  id: number;
  sender: 'Server' | 'User';
  content: string;
  status: 'loading' | 'sent' | 'streaming';
}

const ChatWindow: FC<ChatWindowProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useRef<WebSocket | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:3001/api/websocket');

    socket.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.current.onmessage = (event: MessageEvent) => {
      setMessages((prev) => {
        if (prev[prev.length - 1]?.content === 'loading...') {
          return [
            ...prev.slice(0, -1),
            { id: prev.length, sender: 'Server', content: event.data, status: 'sent' },
          ];
        }
        return prev.map((msg, index) =>
          index === prev.length - 1 && msg.sender === 'Server'
            ? { ...msg, content: msg.content + " " + event.data }
            : msg
        );
      });

      setLoading(false);
    };

    socket.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

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
      setMessages((prev) => [
        ...prev,
        { id: prev.length, sender: 'User', content: input, status: 'sent' }
      ]);
      setInput('');

      setMessages((prev) => [
        ...prev,
        { id: prev.length, sender: 'Server', content: 'loading...', status: 'loading' }
      ]);
      setLoading(true);
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
    <div className="pt-4 flex flex-col relative justify-between h-screen overflow-auto bg-zinc-800 w-full">
      <div className="flex flex-col w-9/12 max-w-2xl mx-auto flex-grow">
        {/* Chat window */}
        <div
          ref={chatWindowRef}
          className="w-full flex-1 relative overflow-auto"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`relative group ${msg.sender === 'User' ? 'bg-neutral-700 w-fit ml-auto max-w-xl' : 'flex'} 
              mb-2 p-2 rounded-3xl px-4 ${msg.status === 'loading' ? 'bg-gray-700' : ''}`}
              onContextMenu={(e) => handleRightClick(e, msg)}
            >
              {/* Avatar bot if Server */}
              {msg.sender === 'Server' && (
                <div className="mr-2 flex-shrink-0 self-start">
                  <img
                    src="https://i.pinimg.com/originals/02/c5/a8/02c5a82909a225411008d772ee6b7d62.png"
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              {/* Message content */}
              <p className="text-left">{msg.content}</p>
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
        <div className="w-full bg-zinc-800 flex justify-center items-center flex-col mt-4 sticky bottom-0">
          <form onSubmit={sendMessage} className="max-w-2xl pr-2 flex w-full justify-center items-center bg-neutral-700 rounded-3xl">
            <Textarea
              minRows={1}
              variant="bordered"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="flex-1 p-1 rounded-full bg-neutral-700 border-custom-none"
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
    </div>
  );
};

export default ChatWindow;
