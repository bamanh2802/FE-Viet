import { useEffect, useState, useRef, FormEvent } from 'react';
import { Input, Button } from "@nextui-org/react";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

// Định nghĩa kiểu cho các tin nhắn
interface Message {
  sender: 'Server' | 'You';
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useRef<WebSocket | null>(null);

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
            { sender: 'Server', content: event.data },
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
      setMessages((prev) => [...prev, { sender: 'You', content: input }]);
      setInput('');
      console.log(messages)

      // Thêm tin nhắn "loading..." từ server
      setMessages((prev) => [...prev, { sender: 'Server', content: 'loading...' }]);
      setLoading(true);
    }
  };

  return (
    <div className='bg-neutral-800 flex-1 flex flex-col relative' style={{ height: 'calc(100vh - 140px)' }}>
      <div className='h-full overflow-y-auto scrollbar-hide'>
        {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
              >
                {msg.content}
              </p>
            </div>
          ))}
      </div>
      <form onSubmit={sendMessage}>
        <div className='flex w-full bg-zinc-800 rounded-2xl px-2'>
          <Input
            type="text"
            value={input}
            className='rounded-none'
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading} // Vô hiệu hóa input khi loading
          />
          <Button variant="light" isIconOnly type="submit" disabled={loading}>
            <PaperAirplaneIcon className='h-4 w-4 p-0' />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
