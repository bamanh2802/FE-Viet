import { FC, useEffect, useState } from 'react';

interface ChatWindowProps {
  conversationId: string;
}

const ChatWindow: FC<ChatWindowProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (conversationId) {
      const socket = new WebSocket('ws://localhost:4000');
      setWs(socket);

      socket.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);
      };

      return () => {
        socket.close();
      };
    }
  }, [conversationId]);

  const handleSend = () => {
    if (ws && input) {
      ws.send(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-200 rounded">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
