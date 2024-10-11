import { useEffect, useState } from 'react';
import { Modal, Button, Tabs, Tab } from '@nextui-org/react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Document, Chunk } from '@/src/types/types';
import { getChunkDocument } from '@/service/documentApi';

// Định nghĩa interface cho đối tượng Document
interface DocumentProps {
  document: Document;
  isOpen: boolean;
  onClose: () => void
}

const DocumentViewer: React.FC<DocumentProps> = ({ document, isOpen, onClose  }) => {
  const [selectedTab, setSelectedTab] = useState<string>('raw'); // Quản lý tab hiện tại
  const defaultLayoutPluginInstance = defaultLayoutPlugin(); // Sử dụng plugin layout cho PDF Viewer

    const [chunks, setChunks] = useState<Chunk[]> ([])

    const handleGetChunkDocument = async () => {
        try {
            const data = await getChunkDocument(document.document_id)
            setChunks(data.data)
        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (document) {
            handleGetChunkDocument()
        }
    }, [document])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="ghost">View Document</Button>
      </DialogTrigger> */}
      <DialogContent className="block w-5/6 max-w-6xl h-5/6 p-4 dark:bg-zinc-900 bg-zinc-50">
        <DialogHeader>
          <DialogTitle>{document?.document_name}</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs
        variant='underlined'
          aria-label="Document Tabs"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)} // Chuyển đổi key về string
          className="mt-4"
        >
          <Tab key="raw" title="Raw">
            {/* Hiển thị PDF bằng react-pdf-viewer */}
            <div className="p-4 h-full">
              <h3 className="text-lg font-semibold">Raw PDF Content</h3>
              <div className="border border-gray-300 h-full">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={document?.document_path} />
                </Worker>
              </div>
            </div>
          </Tab>
          <Tab key="chunks" title="Chunks" className='h-full'>
            {/* Hiển thị chunks của tài liệu */}
            <div className="p-4 h-[90%] overflow-auto">
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
          <Tab key="image" title="Image">
            {/* Hiển thị hình ảnh của tài liệu */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">Document Image</h3>
              {/* {document.image_path ? (
                <img
                  src={document.image_path}
                  alt="Document preview"
                  className="w-full h-auto"
                />
              ) : (
                <p>No image available</p>
              )} */}
            </div>
          </Tab>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
