import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null; 

  return (
    <ReactMarkdown
      className="markdown-content"
      components={{
        code({ node, inline, className, children, ...props }: any) { // Sử dụng any cho props
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <div className="markdown-content" style={{ position: "relative" }}>
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={oneDark}
                {...props}
                customStyle={{
                  maxWidth: "95%",
                  overflowX: "auto",
                }}
                wrapLongLines={true}
              >
                {String(children).trimEnd()} 
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
