import { useState, useEffect, useRef } from "react";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import {
  Square2StackIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { Tabs, Tab } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Textarea } from "@nextui-org/react";

import { getChunkDocument, keywordSearchChunks } from "@/service/documentApi";
import { Chunk } from "@/src/types/types";
import { ListboxWrapper } from "@/components/ListboxWrapper";

interface DropdownPosition {
  x: number;
  y: number;
}

const TextInteraction: React.FC = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    x: 0,
    y: 0,
  });
  const textRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { project_id, document_id } = router.query;

  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [originalChunks, setOriginalChunks] = useState<Chunk[]>([]); // Store the initial full chunk data
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleGetChunkDocument = async () => {
    try {
      const data = await getChunkDocument(document_id as string);
      const sortedChunks = data.data.sort(
        (a: any, b: any) => a.order_in_ref - b.order_in_ref,
      );

      setChunks(sortedChunks);
      setOriginalChunks(sortedChunks); // Store the original full chunk data
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (document_id !== undefined) {
      handleGetChunkDocument();
    }
  }, [document_id]);

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        setIsSearching(true);
        try {
          const result = await keywordSearchChunks(
            document_id as string,
            searchTerm,
          ); // Replace with your actual API call

          setChunks(result.data); // Assuming API response has `data`
        } catch (error) {
          console.error("Error fetching chunks:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        // If search term is empty, restore the original chunks
        setChunks(originalChunks);
      }
    }, 1000); // 1-second delay

    // Cleanup the timeout if the user types again before 1 second
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, originalChunks]);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      const selectedText = window.getSelection()?.toString();
      const range = window.getSelection()?.rangeCount
        ? window.getSelection()?.getRangeAt(0)
        : null;
      const selectionContainer = range?.commonAncestorContainer as Node;
      const isInTextRef = textRef.current?.contains(selectionContainer);

      if (
        selectedText &&
        range &&
        selectedText.trim().length > 0 &&
        isInTextRef &&
        event.button === 2
      ) {
        event.preventDefault();
        setSelection(selectedText);
        setShowDropdown(true);
        const x = event.clientX;
        const y = event.clientY;

        setDropdownPosition({ x, y });
      } else {
        setSelection(null);
        setShowDropdown(false);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSelection(null);
        window.getSelection()?.removeAllRanges();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option} for text: ${selection}`);
    setShowDropdown(false);
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div className="h-full flex-1 bg-zinc-100 border-l-1 dark:bg-zinc-800">
      <Tabs aria-label="Raw" variant="underlined">
        <Tab key="raw" title="Raw">
          <div ref={textRef} className="p-4 rounded relative leading-relaxed">
            Đây là một đoạn văn bản từ tài liệu PDF nào đó. Bạn có thể bôi đen
            đoạn văn bản để xem các tùy chọn.
          </div>
        </Tab>

        <Tab key="chunks" title="Chunks">
          <div className="p-4 h-[calc(100vh-128px)] overflow-hidden relative">
            <Textarea
              className="max-w-none border-1 rounded-xl absolute top-0 left-0 w-full z-10"
              label="Search Chunks"
              maxRows={3}
              minRows={1}
              placeholder="Enter your query..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="mt-16 h-[calc(100%-64px)] overflow-auto">
              <h3 className="text-lg font-semibold">Document Chunks</h3>
              {isSearching ? (
                <div className="flex items-center justify-center h-32">
                  <Spinner color="primary" size="lg" />
                </div>
              ) : chunks.length > 0 ? (
                <ul className="overflow-auto">
                  {chunks.map((chunk: Chunk, index: number) => (
                    <li key={index} className="mb-2">
                      <span className="font-bold">Chunk {index + 1}: </span>
                      {chunk.content}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No chunks available</p>
              )}
            </div>
          </div>
        </Tab>
      </Tabs>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 opacity-100 transition-opacity duration-300 ease-out rounded-md bg-zinc-800"
          style={{ top: dropdownPosition.y, left: dropdownPosition.x }}
        >
          {selection ? (
            <ListboxWrapper>
              <Listbox
                aria-label="Actions"
                onAction={(key) => handleOptionClick(key as string)}
              >
                <ListboxItem key="copy">
                  <div className="flex items-center">
                    <Square2StackIcon className="pr-1 w-5 h-5" /> Sao chép
                  </div>
                </ListboxItem>
                <ListboxItem key="explain">
                  <div className="flex items-center">
                    <QuestionMarkCircleIcon className="pr-1 w-5 h-5" /> Giải
                    thích
                  </div>
                </ListboxItem>
                <ListboxItem key="addNote">
                  <div className="flex items-center">
                    <ClipboardDocumentCheckIcon className="pr-1 w-5 h-5" /> Thêm
                    vào ghi chú
                  </div>
                </ListboxItem>
                <ListboxItem key="summarize">
                  <div className="flex items-center">
                    <ListBulletIcon className="pr-1 w-5 h-5" /> Tóm tắt
                  </div>
                </ListboxItem>
              </Listbox>
            </ListboxWrapper>
          ) : (
            <ListboxWrapper>
              <Listbox
                aria-label="Actions"
                onAction={() => handleOptionClick("Tóm tắt")}
              >
                <ListboxItem key="summarize">Tóm tắt</ListboxItem>
              </Listbox>
            </ListboxWrapper>
          )}
        </div>
      )}
    </div>
  );
};

export default TextInteraction;
