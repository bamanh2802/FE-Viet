import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


interface TypingMessageProps {
  message: string;
}

const TypingMessage: React.FC<TypingMessageProps> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // Nếu có tin nhắn mới, tiếp tục từ vị trí hiện tại
    if (index < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 10); // Thay đổi tốc độ gõ bằng cách điều chỉnh thời gian này

      return () => clearTimeout(timeout);
    }
  }, [index, message]);

  useEffect(() => {
    // Nếu tin nhắn mới đến và chưa gõ hết
    if (message.length > displayedText.length) {
      setIndex(displayedText.length); // Tiếp tục từ vị trí hiện tại
    }
  }, [message, displayedText]);

  // Trả về chuỗi đã hiển thị
  return <ReactMarkdown>{displayedText}</ReactMarkdown>
};

export default TypingMessage;
