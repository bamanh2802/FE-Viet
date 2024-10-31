import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import React, { useEffect, useMemo, useState } from "react";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc"; // Sử dụng WebRTC để đồng bộ hóa
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

interface EditorProps {
  onChange: (content: any) => void;
  initialContent?: string;
  editable?: boolean;
  docId: string; 
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable = true,
  docId,
}) => {
  const [isDarkmode, setIsDarkmode] = useState<string | null>(
    localStorage.getItem("dark-mode"),
  );

  // Lắng nghe thay đổi dark mode từ localStorage
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "dark-mode") {
        setIsDarkmode(event.newValue);
      }
    };

    // Thêm sự kiện listener cho storage
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener khi component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Sử dụng useMemo để khởi tạo Y.Doc và WebrtcProvider chỉ một lần
  const { ydoc, provider } = useMemo(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(`blocknote-${docId}`, ydoc);

    return { ydoc, provider };
  }, [docId]); // Chỉ khởi tạo lại khi docId thay đổi

  const editor: BlockNoteEditor | null = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    collaboration: {
      // The Yjs Provider responsible for transporting updates:
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: ydoc.getXmlFragment("document-store"),
      // Information (name and color) for this user:
      user: {
        name: "My Username",
        color: "#ff0000",
      },
    },
  });

  // Cleanup Yjs khi component unmount
  useEffect(() => {
    return () => {
      provider.disconnect();
      ydoc.destroy();
    };
  }, [provider, ydoc]);

  // Kiểm tra nếu editor chưa khởi tạo
  if (!editor) {
    return <div>Loading editor...</div>; // Hiển thị thông báo hoặc loader
  }

  return (
    <BlockNoteView
      editable={editable}
      editor={editor}
      theme={isDarkmode === "true" ? "dark" : "light"} // Sử dụng giá trị isDarkmode
      onChange={() => {
        onChange(editor);
      }}
    />
  );
};

export default Editor;
