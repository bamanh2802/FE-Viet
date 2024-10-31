import React, { useState, useRef, useEffect } from "react";
import { Skeleton } from "@nextui-org/react";
import { UserIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Note } from "@/src/types/types";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface RichTextEditorProps {
  selectedNote: string;
  note: Note;
  renameNote: (noteId: string, newName: string) => void;
  editNote: (noteId: string, content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  selectedNote,
  note,
  renameNote,
  editNote,
}) => {
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [title, setTitle] = useState("Untitled");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const isLoading = !(selectedNote === note?.note_id && note);

  const Editor = useMemo(
    () => dynamic(() => import("@/components/project/Editor"), { ssr: false }),
    [],
  );

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setEditorContent(note.content);
    }
  }, [note]);

  const handleEditorChange = (content: any) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Đặt lại timeout mới sau 1s
    const timeout = setTimeout(() => {
      const contentJson = JSON.stringify(content.document);

      editNote(note.note_id, contentJson);
    }, 1000);

    setDebounceTimeout(timeout);
  };

  function convertDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    // Nếu dưới 1 phút
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }
    // Nếu dưới 1 giờ
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    // Nếu dưới 1 ngày
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    // Nếu dưới 1 tuần
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    // Nếu dưới 1 tháng
    if (diffInWeeks < 4) {
      return `${diffInWeeks}w ago`;
    }

    // Nếu trên 1 tháng, format là "Ngày Tháng" (VD: 1 Feb, 23 May)
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };

    return date.toLocaleDateString("en-US", options);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      renameNote(note.note_id, e.target.value);
    }, 2000);

    setTypingTimeout(newTimeout);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#1f1f1f] p-4 rounded-lg">
      <Card className=" border-none border-b-1 w-full max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#1f1f1f] shadow-none">
        <CardHeader>
          {isLoading ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : (
            <Input
              className="text-3xl font-bold bg-transparent border-none opacity-75 focus:outline-none placeholder-gray-500"
              placeholder="Untitled"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          )}
        </CardHeader>
        <CardContent className="border-none border-b-gray-500 border-opacity-70">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4 rounded-md" /> {/* Owner */}
              <Skeleton className="h-4 w-1/2 rounded-md" /> {/* User Name */}
              <Skeleton className="h-4 w-1/3 rounded-md" /> {/* Updated at */}
            </div>
          ) : (
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4" />
                <span className="text-sm text-gray-400">Owner</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Nguyễn Bá Mạnh</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                  Updated at: {convertDate(note?.updated_at)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <Skeleton className="h-60 w-full rounded-md" /> // Skeleton cho phần Editor
      ) : (
        selectedNote === note?.note_id &&
        note && (
          <Editor
            editable={true}
            initialContent={note?.content}
            onChange={handleEditorChange}
            docId={note?.note_id}
          />
        )
      )}
    </div>
  );
};

export default RichTextEditor;
