import React, { useState, useRef, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CheckSquare, Heading1, Heading2, Heading3, List, ListOrdered, Table, Bold, Italic, Underline, Code, Link } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UserIcon } from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Note } from '@/src/types/types'
const blockTypes = [
  { icon: <CheckSquare className="h-4 w-4" />, name: 'To-do list', command: 'todo' },
  { icon: <Heading1 className="h-4 w-4" />, name: 'Heading 1', command: 'h1' },
  { icon: <Heading2 className="h-4 w-4" />, name: 'Heading 2', command: 'h2' },
  { icon: <Heading3 className="h-4 w-4" />, name: 'Heading 3', command: 'h3' },
  { icon: <Table className="h-4 w-4" />, name: 'Table', command: 'table' },
  { icon: <List className="h-4 w-4" />, name: 'Bulleted list', command: 'ul' },
  { icon: <ListOrdered className="h-4 w-4" />, name: 'Numbered list', command: 'ol' },
]

const formatOptions = [
  { icon: <Bold className="h-4 w-4" />, name: 'Bold', command: 'bold' },
  { icon: <Italic className="h-4 w-4" />, name: 'Italic', command: 'italic' },
  { icon: <Underline className="h-4 w-4" />, name: 'Underline', command: 'underline' },
  { icon: <Code className="h-4 w-4" />, name: 'Code', command: 'code' },
  { icon: <Link className="h-4 w-4" />, name: 'Link', command: 'link' },
]

interface RichTextEditorProps{
  note: Note
  renameNote: (noteId: string, newName:string) => void
  editNote: (noteId: string, content:string) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({note, renameNote, editNote}) => {
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [showFormatMenu, setShowFormatMenu] = useState(false)
  const [editorContent, setEditorContent] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)
  const selectionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [title, setTitle] = useState('Untitled')
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const MIN_SELECTION_LENGTH = 2 // Minimum length of selected text to show format menu
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })

  const getSelectionPosition = () => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    setPopoverPosition({
      top: rect.top + window.scrollY + rect.height,
      left: rect.left + window.scrollX,
    })
  }

  useEffect(( ) => {
    if(note) {
      setTitle(note.title)
      setEditorContent(note.content)
      if (editorRef.current) {
        editorRef.current.innerHTML = note.content;
      }
    }
  }, [note])
  const isSelectionValid = (selection: Selection | null): boolean => {
    if (!selection) return false
    const selectedText = selection.toString().trim()
    return selectedText.length >= MIN_SELECTION_LENGTH
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // if (e.key === '/' && !showSlashMenu) {
      //   e.preventDefault()
      //   getSelectionPosition()
      //   setShowSlashMenu(true)
      // }

      // Handle delete and backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const selection = window.getSelection()
        if (selection && !selection.isCollapsed) {
          e.preventDefault()
          const range = selection.getRangeAt(0)
          range.deleteContents()
          setShowFormatMenu(false)
        }
      }
    }

    const handleSelectionChange = () => {
      if (selectionTimerRef.current) {
        clearTimeout(selectionTimerRef.current)
      }

      selectionTimerRef.current = setTimeout(() => {
        const selection = window.getSelection()
        getSelectionPosition()
        setShowFormatMenu(isSelectionValid(selection))
      }, 200) // Delay of 200ms
    }

    const handleMouseUp = () => {
      handleSelectionChange()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectionchange', handleSelectionChange)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectionchange', handleSelectionChange)
      document.removeEventListener('mouseup', handleMouseUp)
      if (selectionTimerRef.current) {
        clearTimeout(selectionTimerRef.current)
      }
    }
  }, [showSlashMenu])
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === '/') {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const rect = range.getBoundingClientRect()
          setPopoverPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
          })
        }
        setShowSlashMenu(true)
      }
    }

    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  const handleEditorChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText
    setEditorContent(content)

    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML; // Lấy nội dung từ editor

      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Thiết lập timeout mới
      const newTimeout = setTimeout(() => {
        editNote(note.note_id, newContent); // Gọi API để lưu nội dung sau 2 giây
      }, 2000);

      setTypingTimeout(newTimeout);
    }
    
    // Check if the last character is '/' and show the menu
    if (content.endsWith('/')) {
      setShowSlashMenu(true)
    } else {
      setShowSlashMenu(false)
    }
  }

  const handleBlockTypeSelect = (command: string) => {
    if (!editorRef.current) return

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    let newElement: HTMLElement
    

    switch (command) {
      case 'h1':
        newElement = document.createElement('h1')
        newElement.className = 'text-4xl font-bold mb-4'
        break
      case 'h2':
        newElement = document.createElement('h2')
        newElement.className = 'text-3xl font-bold mb-3'
        break
      case 'h3':
        newElement = document.createElement('h3')
        newElement.className = 'text-2xl font-bold mb-2'
        break
      case 'todo':
        newElement = document.createElement('div')
        newElement.className = 'flex items-center mb-2'
        newElement.innerHTML = '<input type="checkbox" class="mr-2" /><span></span>'
        break
      case 'ul':
        newElement = document.createElement('ul')
        newElement.className = 'list-disc list-inside mb-4'
        newElement.innerHTML = '<li></li>'
        break
      case 'ol':
        newElement = document.createElement('ol')
        newElement.className = 'list-decimal list-inside mb-4'
        newElement.innerHTML = '<li></li>'
        break
      case 'table':
        newElement = document.createElement('table')
        newElement.className = 'border-collapse border border-gray-300 mb-4'
        newElement.innerHTML = '<tr><td class="border border-gray-300 p-2"></td><td class="border border-gray-300 p-2"></td></tr>'
        break
      default:
        newElement = document.createElement('p')
        newElement.className = 'mb-4'
    }

    newElement.appendChild(range.extractContents())
    if (newElement.innerHTML === '') {
      newElement.innerHTML = '<br>'
    }
    range.insertNode(newElement)

    const newRange = document.createRange()
    newRange.selectNodeContents(newElement)
    newRange.collapse(false)
    selection.removeAllRanges()
    selection.addRange(newRange)

    setShowSlashMenu(false)
    editorRef.current.focus()
  }

  const handleFormatSelect = (command: string) => {
    document.execCommand(command, false)
    setShowFormatMenu(false)
  }
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
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  }
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    
    // Xóa timeout trước đó nếu có
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Thiết lập timeout mới
    const newTimeout = setTimeout(() => {
      renameNote(note.note_id, e.target.value); // Gọi API sau 2 giây
    }, 2000);

    setTypingTimeout(newTimeout);
  };


  // const handleEditorChange = (e: React.FormEvent<HTMLDivElement>) => {
  //   const content = e.currentTarget.innerText
  //   setEditorContent(content)
  //   setShowSlashMenu(content.trim().endsWith('/'))
  // }

  return (
    <div className=" w-full max-w-3xl mx-auto bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg">
     <Card className="border-b-1 w-full max-w-3xl mx-auto bg-zinc-200 dark:bg-zinc-800 shadow-none">
      <CardHeader>
        <Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="text-3xl font-bold bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
          placeholder="Untitled"
        />
      </CardHeader>
      <CardContent className='border-b border-b-gray-500 border-opacity-70'>
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4" />
            <span className="text-sm text-gray-400">Owner</span>
          </div>
          <div className="flex items-center space-x-2">
 
            <span className="text-sm">Nguyễn Bá Mạnh</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Updated at: {convertDate(note?.updated_at)}</span>
          </div>
        </div>
        </CardContent>
    </Card>
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[100px] focus:outline-none p-6"
        onInput={handleEditorChange}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setShowSlashMenu(false)
          }
        }}
      />

      {showSlashMenu && (
        <div
        style={{ position: 'absolute', top: popoverPosition.top, left: popoverPosition.left }}
        >
          <DropdownMenu open={showSlashMenu} onOpenChange={setShowSlashMenu}>
          <DropdownMenuTrigger asChild>
            <div className="h-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="top"
            className="w-64 bg-zinc-50 dark:bg-zinc-900"
          >
            {blockTypes.map((block) => (
              <DropdownMenuItem
                key={block.name}
                className="w-full justify-start hover:bg-zinc-700"
                onClick={() => handleBlockTypeSelect(block.command)}
              >
                <div className="flex items-center">
                  <div className=" mr-2">{block.icon}</div>
                  <div className="font-medium">{block.name}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )}

      <div
          style={{ position: 'absolute', top: popoverPosition.top, left: popoverPosition.left }}
      >
      <DropdownMenu open={showFormatMenu} onOpenChange={setShowFormatMenu}>
        <DropdownMenuTrigger asChild>
          <div className="h-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="top"
          className="w-auto bg-zinc-50 dark:bg-zinc-900"
        >
          <div className="flex gap-2">
            {formatOptions.map((option) => (
              <DropdownMenuItem
                key={option.name}
                className="p-2 text-white hover:bg-zinc-700"
                onClick={() => handleFormatSelect(option.command)}
              >
                {option.icon}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

    </div>
  )
}

export default RichTextEditor