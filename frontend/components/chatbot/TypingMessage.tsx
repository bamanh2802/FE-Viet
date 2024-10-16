import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


interface TypingMessageProps {
  message: string;
}

const TypingMessage: React.FC<TypingMessageProps> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + message[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 10); 

      return () => clearTimeout(timeout);
    }
  }, [index, message]);

  useEffect(() => {
    if (message.length > displayedText.length) {
      setIndex(displayedText.length); 
    }
  }, [message, displayedText]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>
};

export default TypingMessage;
