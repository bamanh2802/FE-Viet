import { useState, useEffect, useRef } from 'react';
import { ListboxWrapper } from '@/components/ListboxWrapper';
import { Listbox, ListboxItem } from "@nextui-org/react";

const TextInteraction = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selectedText = window.getSelection()?.toString();
      const range = window.getSelection()?.rangeCount ? window.getSelection()?.getRangeAt(0) : null;
      const selectionContainer = range?.commonAncestorContainer as Node;

      // Kiểm tra xem phần tử chứa văn bản bôi đen có nằm trong textRef hay không
      const isInTextRef = textRef.current?.contains(selectionContainer);

      if (selectedText && range && selectedText.trim().length > 0 && isInTextRef) {
        setSelection(selectedText);
        setShowDropdown(true);
        console.log(selectedText);

        // Lấy vị trí của đoạn bôi đen và tính toán vị trí của dropdown
        const rect = range.getBoundingClientRect();
        setDropdownPosition({ x: rect.left, y: rect.bottom });
      } else {
        // Không có văn bản nào được bôi đen hoặc bôi đen không nằm trong textRef, ẩn dropdown ngay lập tức
        setSelection(null);
        setShowDropdown(false);
        // Xóa lựa chọn văn bản
        // window.getSelection()?.removeAllRanges();
      }
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !textRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSelection(null);
        window.getSelection()?.removeAllRanges(); // Xóa lựa chọn văn bản khi nhấp bên ngoài
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!showDropdown) {
      setSelection(null);
    }
    if (selection === null) {
      setShowDropdown(false);
    }
    console.log(showDropdown, selection);
  }, [showDropdown, selection]);

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option} for text: ${selection}`);
    setShowDropdown(false);
    setSelection(null);
    window.getSelection()?.removeAllRanges(); // Xóa lựa chọn văn bản khi chọn một tùy chọn
  };

  return (
    <div className="p-5 flex-1">
      <div
        ref={textRef}
        className="border border-gray-300 p-4 rounded relative leading-relaxed"
      >
        Đây là một đoạn văn bản từ tài liệu PDF nào đó. Bạn có thể bôi đen đoạn văn bản để xem các tùy chọn. Khi bạn bôi đen một đoạn văn bản, các tùy chọn sẽ xuất hiện ở dưới cùng của đoạn văn bản được bôi đen.
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 opacity-100 transition-opacity duration-300 ease-out bg-zinc-800"
          style={{ top: dropdownPosition.y, left: dropdownPosition.x }}
        >
          {selection ? (
            <ListboxWrapper>
              <Listbox
                aria-label="Actions"
                onAction={(key) => handleOptionClick(key)}
              >
                <ListboxItem key="copy">Sao chép</ListboxItem>
                <ListboxItem key="explain">Giải thích</ListboxItem>
                <ListboxItem key="addNote">Thêm vào ghi chú</ListboxItem>
                <ListboxItem key="summarize">Tóm tắt</ListboxItem>
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
