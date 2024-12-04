import React, {
  FC,
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import {
  Button,
  Textarea,
  Listbox,
  ListboxItem,
  Tooltip,
} from "@nextui-org/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  ClipboardIcon,
  HeartIcon,
  HandThumbDownIcon,
  PencilSquareIcon,
  Square2StackIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  FolderIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  PaperClipIcon,
  LanguageIcon
} from "@heroicons/react/24/outline";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RiRobot2Line } from "react-icons/ri";
import dynamic from "next/dynamic";

import { ListboxWrapper } from "@/components/ListboxWrapper";
import {
  addUserMessage,
  addServerMessage,
  updateServerMessage,
  finalizeServerMessage,
} from "@/src/store/chatSlice";
import { RootState } from "@/src/store/store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/hooks/use-toast";
import { getDocumentsByConversation } from "@/service/documentApi";
import { Chunk, Document, Message } from "@/src/types/types";
import { createNewNote } from "@/service/noteApi";
import DocumentViewer from "@/components/global/DocumentViewer";
import BotLoading from "@/public/svg/activity.json";
import TypingMessage from "@/components/chatbot/TypingMessage";
import MarkdownRenderer from "@/components/chatbot/CodeBlock";
import API_URL from "@/service/ApiUrl";

interface ChatWindowProps {
  isDocument: boolean;
  conversation_id: string;
  project_id: string;
  content: string;
  option: string;
}

const ChatWindow: FC<ChatWindowProps> = ({
  project_id,
  isDocument,
  conversation_id,
  content,
  option
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const socket = useRef<WebSocket | null>(null);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isOpenSource, setIsOpenSource] = useState<boolean>(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isOpenDocument, setIsOpenDocument] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<Document>();
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [contentChat, setContentChat] = useState<string>('')
  const [optionChat, setOptionChat] = useState<string>('')

  useEffect(() => {
    if(content !== undefined && option !== undefined) {
      console.log(content, option)
      if(option === 'quote') {  
        setContentChat(content)
        setOptionChat(option)
      } else if (option === 'explain') {
        handleExplainWord(content)
      }
    }
  },[content, option])
  const handleClearQuoted = () => {
    setContentChat('')
    setOptionChat('')
  }
  const handleQuoted = (content: string) => {
    setContextMenu(null);
    setOptionChat('quote')
    setContentChat(content)
  }
  const handleTranslate = (content: string) => {
    setContextMenu(null);

  }

  const handleOpenDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsOpenDocument(true);
  };
  const handleCloseDocument = () => setIsOpenDocument(false);
  const handleToggleSource = () => setIsOpenSource(!isOpenSource);

  const dispatch = useDispatch();
  const conversation = useSelector(
    (state: RootState) =>
      state.chat.conversations[conversation_id] || {
        messages: [],
        isLoading: false,
      },
  );

  const handleGetDocumentByConversation = async () => {
    try {
      const data = await getDocumentsByConversation(conversation_id);

      setDocuments(data.data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleCreateNewNote = async (content: string) => {
    setContextMenu(null);
    toast({
      description: "Loading...",
    });
    try {
      const id = uuidv4(); // Tạo ID ngẫu nhiên

      const formattedContent = [
        {
          id: id, // Sử dụng ID ngẫu nhiên
          type: "paragraph",
          props: {
            textColor: "default",
            backgroundColor: "default",
            textAlignment: "left",
          },
          content: [
            {
              type: "text",
              text: content, // Sử dụng content từ tham số
              styles: {},
            },
          ],
          children: [],
        },
      ];

      const jsonContent = JSON.stringify(formattedContent);
      const data = await createNewNote(
        project_id,
        "Viet Generate",
        jsonContent,
      );

      toast({
        title: "Create by Viet successfully",
        description:
          "Please reload your current project page to refresh the data ",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.log(e);
    }
  };

  function findDocumentNameById(document_id: string): string | undefined {
    const document = documents.find((doc) => doc.document_id === document_id);

    return document ? document.document_name : undefined;
  }
  function convertISOToDate(isoString: string) {
    const date = new Date(isoString);

    const day = date.getDate(); // Ngày
    const year = date.getFullYear(); // Năm

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()]; // Tháng (0 - 11)

    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    if (conversation_id !== undefined && !isDocument) {
      handleGetDocumentByConversation();
    }
  }, [conversation_id]);

  const convertApiUrlToWebSocketUrl = (
    apiUrl: string,
    conversationId: string,
  ): string => {
    const protocol = apiUrl.startsWith("https") ? "wss" : "ws"; // Sử dụng 'wss' nếu là 'https'

    const wsUrl =
      apiUrl.replace(/^https?/, protocol) +
      `/ws/conversations/${conversationId}/send-message`;

    return wsUrl;
  };

  useEffect(() => {
    if (conversation_id !== undefined) {
      socket.current = new WebSocket(
        convertApiUrlToWebSocketUrl(API_URL, conversation_id),
      );
      console.log(API_URL);
      socket.current.onopen = () => {
        console.log("Connected to WebSocket server");
      };

      socket.current.onmessage = (event: MessageEvent) => {
        const response = event.data;
        console.log(response)

        if (
          response !== "<END_OF_CONTEXT>" &&
          !response.includes("chunk_id") &&
          response !== "<END_OF_RESPONSE>" && 
          response !== "{\"context\":null}"
        ) {
          dispatch(
            updateServerMessage({ conversation_id, content: event.data }),
          );
        } else if (response.includes("chunk_id")) {
          const chunk_ids = JSON.parse(response);
          const currentChunkIds = chunk_ids.context.map((chunk_id: string) =>
            JSON.parse(chunk_id),
          );

          console.log(currentChunkIds);
          dispatch(
            finalizeServerMessage({
              conversation_id,
              chunk_ids: currentChunkIds,
            }),
          );
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
          setLoading(false);
          console.log("stop loading");
          // dispatch(finalizeServerMessage({ conversation_id }));
        }
      };

      socket.current.onclose = () => {
        console.log("Disconnected from WebSocket server");
      };

      return () => {
        if (socket.current) {
          socket.current.close();
          console.log("close");
        }
      };
    }
  }, [conversation_id, dispatch]);

  const sendMessage = (userMessage: string, e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (
      !loading &&
      userMessage &&
      socket.current &&
      socket.current.readyState === WebSocket.OPEN
    ) {
      if (optionChat === 'quote') {
        const userMessageWithQuote = `> ${contentChat}\n${userMessage}`;
        socket.current.send(userMessageWithQuote);
        dispatch(addUserMessage({ conversation_id, content: userMessageWithQuote }));
        setInput("");
        dispatch(addServerMessage({ conversation_id, content: "" }));
        setLoading(true);
      } else {
        socket.current.send(userMessage);
        dispatch(addUserMessage({ conversation_id, content: userMessage }));
        setInput("");
        dispatch(addServerMessage({ conversation_id, content: "" }));
        setLoading(true);
      }
      handleClearQuoted()
    }
  };

  useLayoutEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [conversation.messages]);

  useEffect(() => {
    if (conversation.messages.length > 0) {
      const lastMessageElement = document.getElementById(
        `message-${conversation.messages[conversation.messages.length - 1].id}`,
      );

      if (lastMessageElement) {
        lastMessageElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [conversation.messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
  
      if (contextMenu && !target.closest(".context-menu")) {
        setContextMenu(null); // Hide the context menu if clicking outside
      }
    };
  
    // Add event listener with type casting
    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
  
    return () => {
      // Cleanup: remove the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, [contextMenu]);
  

  const handleExplainWord = async (input: string) => {
    const message = `giải thích "${input}"`;

    sendMessage(message);

    setContextMenu(null);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input as string, e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  const handleRightClick = (e: MouseEvent<HTMLDivElement>, msg: Message) => {
    e.preventDefault();
    setSelectedMessage(msg.content);
    const selected = window.getSelection()?.toString();

    if (selected) {
      setSelectedText(selected);
      setContextMenu({ x: e.pageX, y: e.pageY });
    }
  };

  const handleCopy = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setContextMenu(null);
    }
  };

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option} for text: ${selectedText}`);
    window.getSelection()?.removeAllRanges();
  };
  const renderMessage = (content: string) => {
    // Check if message starts with quote syntax
    if (content.startsWith("> ")) {
      const [quote, ...response] = content.split("\n");
      
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">↳</span>
            <blockquote className="rounded dark:bg-zinc-800 px-3 py-1 italic text-xs bg-zinc-300 font-w">
              {quote.replace("> ", "")}
            </blockquote>
          </div>
          {response.length > 0 && (
            <p className="pl-6 text-sm text-muted-foreground">
              {response.join("\n")}
            </p>
          )}
        </div>
      );
    }
  
    // Regular message
    return <p className="text-sm">{content}</p>;
  };


  return (
    <div className="flex">
      <div
        className={`flex flex-col relative justify-between overflow-auto bg-zinc-100 dark:bg-zinc-800 w-full`}
        style={{
          height: `${isDocument ? "calc(100vh - 112px)" : "100vh"}`,
        }}
      >
        <div
          className={`flex flex-col ${isDocument ? "w-full px-7" : "w-10/12 pr-16 pl-10 pt-14 "} max-w-3xl  mx-auto flex-grow`}
        >
          {/* Chat window */}
          <div
            ref={chatWindowRef}
            className="w-full flex-1 relative overflow-auto"
          >
            {conversation.messages.map((msg, index) => (
              <div
                key={msg.id}
                className={` group flex  ${msg.sender === "User" ? "dark:bg-neutral-700 bg-neutral-50 w-fit ml-auto max-w-md" : "flex"} 
              mb-2 p-2 rounded-3xl mt-5 px-4 `}
                id={`message-${msg.id}`}
                onContextMenu={(e) => handleRightClick(e, msg)}
              >
                {/* Avatar bot if Server */}
                {msg.sender === "Server" && msg.content === "" && (
                  <div className="animate-pulse mr-2 flex items-center flex-shrink-0 self-start ">
                    <Lottie
                      animationData={BotLoading}
                      className="dark:invert"
                      loop={true}
                    />
                    <span className=" text-xs">Viet is thinking ...</span>
                  </div>
                )}
                {msg.sender === "Server" && msg.content !== "" && (
                  <div className="mr-2 flex items-center flex-shrink-0 self-start ">
                    <RiRobot2Line className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`flex flex-col  ${msg.sender === "Server" ? "ml-2 w-[96%]" : ""}`}
                >
                  {msg.sender === "Server" && msg.status === "streaming" ? (
                    <TypingMessage message={msg.content} />
                  ) : msg.sender === "Server" ? (
                    // <ReactMarkdown className="markdown-content">
                    //   {msg.content}
                    // </ReactMarkdown>
                    <MarkdownRenderer content={msg.content} />
                  ) : (
                    <div>{renderMessage(msg.content as string)}</div>
                  )}

                  {Array.isArray(msg.chunk_ids) &&
                    msg.chunk_ids.length > 0 &&
                    msg.sender === "Server" && (
                      <div className="flex flex-wrap  mt-2 items-center">
                        <i>Learn more:</i>
                        {msg.chunk_ids.map((chunkId, index) => {
                          // Thêm index vào tham số
                          const documentName = findDocumentNameById(
                            chunkId.document_id,
                          );

                          return (
                            <HoverCard key={chunkId.chunk_id}>
                              <HoverCardTrigger asChild>
                                <Button
                                  key={chunkId.chunk_id}
                                  isIconOnly
                                  className="ml-3"
                                  size="sm"
                                  variant="shadow"
                                >
                                  {index + 1} {/* Render số thứ tự ở đây */}
                                  {/* Bạn có thể thêm khoảng trắng nếu muốn */}
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80 dark:bg-zinc-900 bg-zinc-50">
                                <div className="flex justify-between space-x-4">
                                  <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">
                                      {documentName}
                                    </h4>
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
                  {msg.sender === "Server" && msg.content !== "" && (
                    <div
                      className="space-x-2 p-2"
                      style={{ bottom: "-24px", left: "56px" }}
                    >
                      <Tooltip content="Like this message">
                        <Button
                          isIconOnly
                          radius="full"
                          size="sm"
                          variant="light"
                        >
                          <HeartIcon className="w-5 h-5 " />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Feedback for bad message">
                        <Button
                          isIconOnly
                          radius="full"
                          size="sm"
                          variant="light"
                        >
                          <HandThumbDownIcon className="w-5 h-5 " />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Copy">
                        <Button
                          isIconOnly
                          radius="full"
                          size="sm"
                          variant="light"
                          onClick={() => handleCopy(msg.content)}
                        >
                          <ClipboardIcon className="w-5 h-5" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Pin to your note">
                        <Button
                          isIconOnly
                          radius="full"
                          size="sm"
                          variant="light"
                          onClick={() => handleCreateNewNote(msg.content)}
                        >
                          <PencilSquareIcon className="w-5 h-5 " />
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Context menu on right click */}
            {contextMenu && (
              <div
                className="fixed dark:bg-zinc-800 bg-zinc-200 rounded-md shadow-lg"
                style={{ top: contextMenu.y, left: contextMenu.x }}
              >
                <ListboxWrapper>
                  <Listbox
                  className="p-0"
                    aria-label="Actions"
                    onAction={(key) => handleOptionClick(key as string)}
                  >
                    <ListboxItem key="copy" textValue="copy">
                      <div
                        className="flex items-center"
                        onClick={() => handleCopy(selectedText as string)}
                      >
                        <Square2StackIcon className="pr-1 w-5 h-5" />
                        Sao chép
                      </div>
                    </ListboxItem>
                    <ListboxItem
                      key="explain"
                      textValue="explain"
                      onClick={() => handleExplainWord(selectedText as string)}
                    >
                      <div className="flex items-center">
                        <QuestionMarkCircleIcon className="pr-1 w-5 h-5" />
                        Giải thích
                      </div>
                    </ListboxItem>
                    <ListboxItem key="addNote" textValue="addNote">
                      <div
                        className="flex items-center"
                        onClick={() =>
                          handleCreateNewNote(selectedText as string)
                        }
                      >
                        <ClipboardDocumentCheckIcon className="pr-1 w-5 h-5" />
                        Thêm vào note
                      </div>
                    </ListboxItem>
                    <ListboxItem key="quote" textValue="quote">
                      <div
                        className="flex items-center"
                        onClick={() =>
                          handleQuoted(selectedText as string)
                        }
                      >
                        <PaperClipIcon className="pr-1 w-5 h-5" />
                        Quote
                      </div>
                    </ListboxItem>
                    <ListboxItem key="translate" textValue="translate">
                      <div
                        className="flex items-center"
                        onClick={() =>
                          handleTranslate(selectedText as string)
                        }
                      >
                        <LanguageIcon className="pr-1 w-5 h-5" />
                        Translate
                      </div>
                    </ListboxItem>
                  </Listbox>
                </ListboxWrapper>
              </div>
            )}
          </div>

          {/* Message input form */}
          <div className="pl-6 w-full bg-zinc-100 dark:bg-zinc-800 flex justify-center items-center flex-col mt-4 sticky bottom-0">
                {optionChat === 'quote' && contentChat && (
                  <div className="w-full max-w-2xl mb-2 px-4 py-2 bg-slate-100 border border-slate-300 rounded-xl shadow-md flex items-center gap-2">
                    <div className="text-slate-600 text-sm italic flex-1">
                      <span className="font-medium text-slate-800">Quoted:</span> {contentChat}
                    </div>
                    <button
                      onClick={handleClearQuoted} 
                      className="text-slate-400 hover:text-slate-600 transition"
                    >
                      <XMarkIcon className="w-4 h-4"/>
                    </button>
                  </div>
                )}

            <form
              className="max-w-2xl pr-2 flex w-full justify-center items-center rounded-3xl"
              onSubmit={(e) => sendMessage(input, e)}
            >
              <Textarea
                className="flex-1 p-1 rounded-full"
                minRows={1}
                placeholder="Type your message..."
                value={input}
                variant="faded"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <Button
                isIconOnly
                className="ml-2 text-white p-2 rounded-full bg-slate-400"
                type="submit"
              >
                <ArrowRightIcon />
              </Button>
            </form>
            <div className="text-xs opacity-75 my-2">
              Viet can make mistakes. Check important info.
            </div>
          </div>
        </div>

        {!isDocument && (
          <div className="fixed bottom-9 right-9 z-5">
            <Tooltip content="Document Pool!">
              <Button
                isIconOnly
                className="rounded-full"
                size="lg"
                onClick={() => handleToggleSource()}
              >
                <FolderIcon className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        )}
      </div>
      {isOpenSource && (
        <div className="w-60 h-full pt-14 border-opacity-80 bg-zinc-200 dark:bg-zinc-900 border-l-1 p-2">
          <div className="grid gap-4 py-4">
            <h3 className="flex items-center justify-between text-sm font-semibold dark:text-gray-400 text-gray-700 transition-all rounded-lg px-2 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <span>Documents</span>
            </h3>
            <div className="ml-1 mt-1 space-y-1">
              {documents?.map((doc) => (
                <div
                  key={doc.document_id}
                  className="p-2 transition-all ml-2 group flex justify-between items-center space-x-2 text-sm cursor-pointer rounded-lg dark:text-gray-400 text-gray-700 dark:hover:bg-zinc-800 hover:bg-zinc-200"
                  onClick={() => handleOpenDocument(doc)}
                >
                  <Tooltip content={doc.document_name}>
                    <span className="w-40 truncate">{doc.document_name}</span>
                  </Tooltip>
                  <div className="opacity-0 group-hover:opacity-100">
                    <EllipsisHorizontalIcon className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <DocumentViewer
        document={selectedDocument as Document}
        isOpen={isOpenDocument}
        onClose={handleCloseDocument}
      />
    </div>
  );
};

export default ChatWindow;
