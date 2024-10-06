import { FC, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, Link, FileText, Loader2, CheckCircle } from 'lucide-react'
import { Document } from '@/src/types/types'
import { Progress } from "@/components/ui/progress"
import { uploadDocument } from '@/service/documentApi'

interface NewDocumentProps {
  isOpen: boolean
  onClose: () => void
  documents: Document[]
  projectId: string
  updateDocument: () => void
}

const NewDocument: FC<NewDocumentProps> = ({ updateDocument, isOpen, onClose, documents, projectId }) => {
  const [limit, setLimit] = useState<number>(documents?.length)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const maxFiles = 5 // Set the max limit for file uploads
  const [isMaxFile, setIsMaxFile] = useState<boolean>(false)

  // Calculate the progress based on the number of files selected
  const progress = (limit + selectedFiles.length) / maxFiles * 100

  // Handle file selection from input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = [...selectedFiles, ...Array.from(files)]
      if (limit + newFiles.length > maxFiles) {
        setSelectedFiles(newFiles)
        setIsMaxFile(true)
      } else {
        setSelectedFiles(newFiles)
        setIsMaxFile(false)
      }
    }
  }

  // Handle file drop into the drop zone
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const files = event.dataTransfer.files
    if (files) {
      const newFiles = [...selectedFiles, ...Array.from(files)]
      if (limit + newFiles.length > maxFiles) {
        setSelectedFiles(newFiles)
        setIsMaxFile(true)
      } else {
        setSelectedFiles(newFiles)
        setIsMaxFile(false)
      }
    }
    setIsDragging(false)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  // Remove a specific file from the list
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles]
    updatedFiles.splice(index, 1)
    setSelectedFiles(updatedFiles)
    if(updatedFiles.length + limit <= 5) {
        setIsMaxFile(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFiles.length) {
      return
    }

    setIsLoading(true)
    setIsSuccess(false)

    try {
      const data = await uploadDocument(projectId, selectedFiles)
      console.log(data)
      setLimit(limit + selectedFiles.length)
      setSelectedFiles([]) // Clear the selected files after upload
      setIsLoading(false)
      setIsSuccess(true)
      updateDocument()
      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error uploading file:', error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-4/5 max-w-7xl dark:bg-zinc-900 bg-zinc-50">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Thêm nguồn</DialogTitle>
          <label className='block text-sm font-medium text-zinc-400 mb-2'>
            Các nguồn cho phép VIET trả lời dựa trên những thông tin quan trọng nhất đối với bạn.
          </label>
        </DialogHeader>

        <div className="mt-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-500' : 'border-zinc-700'} relative overflow-hidden`} 
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            onDragLeave={handleDragLeave}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50 transition-opacity duration-300">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : isSuccess ? (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50 transition-opacity duration-300">
                <CheckCircle className="h-16 w-16 text-green-500 animate-scale-up" />
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-zinc-400" />
                <p className="mt-2 text-sm text-zinc-400">Tải nguồn lên</p>
                <p className="mt-1 text-xs text-zinc-500">Kéo và thả hoặc chọn tệp để tải lên</p>
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  onChange={handleFileChange} 
                  multiple
                />
                <label htmlFor="file-upload">
                  <Button onClick={() => document.getElementById('file-upload')?.click()} variant="outline" className="mt-4">
                    Chọn tệp
                  </Button>
                </label>
              </>
            )}
          </div>

          <div className="mt-4">
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex justify-between text-zinc-400 text-sm">
                    <span>{file.name}</span>
                    <Button variant="link" onClick={() => handleRemoveFile(index)} className="text-red-500">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {isMaxFile && (
            <div className='text-red-500'>
                Max file is 5
            </div>
          )}

          <div className="mt-4">
            <Button 
              onClick={handleFileUpload} 
              disabled={!selectedFiles.length || limit + selectedFiles.length > maxFiles || isLoading} 
              className="w-full mt-4"
            >
              {isLoading ? 'Uploading...' : 'Upload File'}
            </Button>
          </div>
          <label className='block text-sm font-medium text-zinc-400 mb-2 mt-6'>
            Documents allow
          </label>
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col items-center justify-center h-24">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-xs">PDF</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24">
              <Link className="h-6 w-6 mb-2" />
              <span className="text-xs">TXT</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-xs">DOCS</span>
            </Button>
          </div>

          <div className="mt-6">
            <label className={`${isMaxFile ? 'text-red-500' : 'text-zinc-400'} block text-sm font-medium  mb-2`}>
              Limit Document {limit + selectedFiles.length}/{maxFiles}
            </label>
            <Progress value={progress} className="w-full" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewDocument