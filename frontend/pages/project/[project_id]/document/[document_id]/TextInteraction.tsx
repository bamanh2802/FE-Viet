import { useState, useEffect, useRef } from 'react';
import { ListboxWrapper } from '@/components/ListboxWrapper';
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Square2StackIcon, QuestionMarkCircleIcon, ClipboardDocumentCheckIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { getChunkDocument } from '@/service/documentApi';
import { useRouter } from 'next/router';
import { Chunk } from '@/src/types/types';


interface DropdownPosition {
  x: number;
  y: number;
}

const TextInteraction: React.FC = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter()
  const { project_id, document_id} = router.query
  const [chunks, setChunks] = useState<Chunk[]> ([])

  const handleGetChunkDocument = async () => {
    try {
      const data = await getChunkDocument(document_id)
      setChunks(data.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if(document_id !== 'undefined') {
      handleGetChunkDocument()
    }
  }, [document_id])

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      const selectedText = window.getSelection()?.toString();
      const range = window.getSelection()?.rangeCount ? window.getSelection()?.getRangeAt(0) : null;
      const selectionContainer = range?.commonAncestorContainer as Node;

      const isInTextRef = textRef.current?.contains(selectionContainer);

      if (selectedText && range && selectedText.trim().length > 0 && isInTextRef && event.button === 2) {
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

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
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

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option} for text: ${selection}`);
    setShowDropdown(false);
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div className="h-full flex-1 bg-zinc-200 border-l-1 dark:bg-zinc-800">
     
      <Tabs variant='underlined' aria-label="Raw">
        <Tab key="raw" title="Raw">
          <div
            ref={textRef}
            className=" p-4 rounded relative leading-relaxed"
          >
            Đây là một đoạn văn bản từ tài liệu PDF nào đó. Bạn có thể bôi đen đoạn văn bản để xem các tùy chọn. Khi bạn bôi đen một đoạn văn bản, các tùy chọn sẽ xuất hiện ở dưới cùng của đoạn văn bản được bôi đen.
          </div>

        </Tab>
        <Tab key="chunks" title="Chunks" className=''>
          <div className="p-4 h-[calc(100vh-128px)] overflow-auto">
              <h3 className="text-lg font-semibold">Document Chunks</h3>
              {chunks.length > 0 ? (
                <ul>
                  {chunks?.map((chunk: Chunk, index: number) => (
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
          </Tab>
      </Tabs>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className=
          {`
          ${showDropdown ? '' : ''}
          absolute z-50 opacity-100 transition-opacity duration-300 ease-out rounded-md bg-zinc-800
          `}
          style={{ top: dropdownPosition.y, left: dropdownPosition.x }}
        >
          {selection ? (
            <ListboxWrapper>
              <Listbox
                aria-label="Actions"
                onAction={(key) => handleOptionClick(key as string)}
              >
                <ListboxItem key="copy">
                  <div className='flex items-center'>
                    <Square2StackIcon className='pr-1 w-5 h-5'/> Sao chép
                  </div>
                </ListboxItem>
                <ListboxItem key="explain">
                  <div className='flex items-center'>
                    <QuestionMarkCircleIcon className='pr-1 w-5 h-5'/> Giải thích
                  </div>
                </ListboxItem>
                <ListboxItem key="addNote">
                  <div className='flex items-center'>
                    <ClipboardDocumentCheckIcon className='pr-1 w-5 h-5'/> Thêm vào ghi chú
                  </div>
                </ListboxItem>
                <ListboxItem key="summarize">
                  <div className='flex items-center'>
                    <ListBulletIcon className='pr-1 w-5 h-5'/> Tóm tắt
                  </div>
                </ListboxItem>
              </Listbox>
            </ListboxWrapper>
          ) : (
            <ListboxWrapper>
              <Listbox
                aria-label="Actions"
                onAction={() => handleOptionClick('Tóm tắt')}
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
