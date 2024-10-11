import React, { useState, useRef, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CheckSquare, Heading1, Heading2, Heading3, List, ListOrdered, Table, Bold, Italic, Underline, Code, Link } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UserIcon } from '@heroicons/react/24/outline'
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

export default function RichTextEditor() {
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [showFormatMenu, setShowFormatMenu] = useState(false)
  const [editorContent, setEditorContent] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)
  const selectionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [title, setTitle] = useState('Untitled')

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
  const isSelectionValid = (selection: Selection | null): boolean => {
    if (!selection) return false
    const selectedText = selection.toString().trim()
    return selectedText.length >= MIN_SELECTION_LENGTH
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !showSlashMenu) {
        getSelectionPosition()
        setShowSlashMenu(true)
      }

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

  const handleEditorChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText
    setEditorContent(content)
    setShowSlashMenu(content.trim().endsWith('/'))
  }

  return (
    <div className=" w-full max-w-3xl mx-auto bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg">
     <Card className="w-full max-w-3xl mx-auto bg-zinc-200 dark:bg-zinc-800 border-none shadow-none">
      <CardHeader>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
          placeholder="Untitled"
        />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4" />
            <span className="text-sm text-gray-400">Owner</span>
          </div>
          <div className="flex items-center space-x-2">
 
            <span className="text-sm">Nguyễn Bá Mạnh</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Empty</span>
          </div>
        </div>
        </CardContent>
    </Card>
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[100px] focus:outline-none"
        onInput={handleEditorChange}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setShowSlashMenu(false)
          }
        }}
      />

      {showSlashMenu && (
        <Popover open={showSlashMenu} onOpenChange={setShowSlashMenu}>
          <PopoverTrigger asChild>
            <div className="h-0" />
          </PopoverTrigger>
          <PopoverContent
          style={{ position: 'absolute', top: popoverPosition.top, left: popoverPosition.left }}
          className="w-64 bg-zinc-800 border-zinc-700">
            <div className="grid gap-2">
              {blockTypes.map((block) => (
                <Button
                  key={block.name}
                  variant="ghost"
                  className="w-full justify-start hover:bg-zinc-700"
                  onClick={() => handleBlockTypeSelect(block.command)}
                >
                  <div className="flex items-center">
                    <div className="bg-white rounded p-1 mr-2">{block.icon}</div>
                    <div className="font-medium">{block.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      <Popover open={showFormatMenu} onOpenChange={setShowFormatMenu}>
        <PopoverTrigger asChild>
          <div className="h-0" />
        </PopoverTrigger>
        <PopoverContent 
        style={{ position: 'absolute', top: popoverPosition.top, left: popoverPosition.left }}
        className="w-auto bg-zinc-800 border-zinc-700">
          <div className="flex gap-2">
            {formatOptions.map((option) => (
              <Button
                key={option.name}
                variant="ghost"
                className="p-2 text-white hover:bg-zinc-700"
                onClick={() => handleFormatSelect(option.command)}
              >
                {option.icon}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}