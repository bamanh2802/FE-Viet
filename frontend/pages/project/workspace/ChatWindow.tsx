import { FC, useEffect, useState, useRef, FormEvent, KeyboardEvent } from 'react';
import { Button, Textarea } from "@nextui-org/react";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import '../../../components/project/config.css';

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

  useEffect(() => {
    // Kết nối tới WebSocket server
    socket.current = new WebSocket('ws://localhost:3001/api/websocket');

    socket.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.current.onmessage = (event: MessageEvent) => {
      console.log('Received from server:', event.data);

      setMessages((prev) => {
        // Xóa "loading..." và thay thế bằng từ đầu tiên của phản hồi
        if (prev[prev.length - 1]?.content === 'loading...') {
          return [
            ...prev.slice(0, -1),
            { id: prev.length, sender: 'Server', content: event.data, status: 'sent' },
          ];
        }
        // Ghép từ mới vào nội dung tin nhắn cuối cùng
        return prev.map((msg, index) =>
          index === prev.length - 1 && msg.sender === 'Server'
            ? { ...msg, content: msg.content + " " + event.data }
            : msg
        );
      });

      // Đặt trạng thái loading về false khi nhận tin nhắn đầu tiên từ server
      setLoading(false);
    };

    socket.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Đóng kết nối WebSocket khi component unmount
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && socket.current && socket.current.readyState === WebSocket.OPEN) {
      // Gửi tin nhắn từ người dùng
      socket.current.send(input);
      setMessages((prev) => [
        ...prev,
        { id: prev.length, sender: 'User', content: input, status: 'sent' }
      ]);
      setInput('');

      // Thêm tin nhắn "loading..." từ server
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

  const handleScroll = () => {
    if (chatWindowRef.current && chatWindowRef.current.scrollTop === 0) {
      // Logic to fetch more history (if applicable)
      // fetchMoreHistory();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-zinc-800 w-full">
      <div className='h-full flex flex-col w-9/12 max-w-2xl'>
        <div ref={chatWindowRef} className="w-full flex-1 overflow-y-auto" onScroll={handleScroll}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${msg.sender === 'User' ? 'bg-gray-800 w-fit ml-auto' : ''} 
            mb-2 p-2 rounded max-w-xl
            ${msg.status === 'loading' ? 'bg-gray-700' : ''}`}>
              <p className={`${msg.sender === 'User' ? 'text-right' : 'text-left'}`}>
                {msg.content}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full flex mt-4">
          <form onSubmit={sendMessage} className='pr-2 flex w-full justify-center items-center bg-neutral-700 rounded-3xl'>
            <Textarea
              minRows={1}
              variant={'bordered'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-1 rounded-full bg-neutral-700 border-custom-none"
              placeholder="Type your message..."
            />
            <Button isIconOnly className="ml-2 text-white p-2 rounded-full bg-slate-400" type="submit">
              <ArrowRightIcon />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
