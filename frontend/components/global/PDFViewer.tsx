import React, { useEffect, useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

interface FileViewerProps {
  fileUrl: string;
  fileType: 'pdf' | 'docx';
}

const FileViewer: React.FC<FileViewerProps> = ({ fileUrl, fileType }) => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const renderPDF = async () => {
      const loadingTask = pdfjsLib.getDocument(fileUrl);
      const pdf = await loadingTask.promise;
      const pageNodes: React.ReactNode[] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        const textContent = await page.getTextContent();

        const pageDiv = document.createElement('div');
        pageDiv.style.position = 'relative';
        pageDiv.style.width = `${viewport.width}px`;
        pageDiv.style.height = `${viewport.height}px`;

        const sortedItems = textContent.items.sort((a: any, b: any) => b.transform[5] - a.transform[5]);

        sortedItems.forEach((item: any) => {
          if (item.str) {
            const textDiv = document.createElement('div');
            textDiv.textContent = item.str;

            const transform = item.transform;
            const fontSize = transform[0];
            const left = transform[4] * scale;
            const top = (viewport.height - transform[5]) * scale;

            textDiv.style.position = 'absolute';
            textDiv.style.left = `${left}px`;
            textDiv.style.top = `${top}px`;
            textDiv.style.fontSize = `${fontSize * scale}px`;
            textDiv.style.color = 'black';
            textDiv.style.whiteSpace = 'pre';
            textDiv.style.lineHeight = '1.2';

            pageDiv.appendChild(textDiv);
          }
        });

        pageNodes.push(
          <div
            key={`page-${pageNum}`}
            style={{
              marginBottom: '20px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {React.createElement('div', {
              dangerouslySetInnerHTML: { __html: pageDiv.outerHTML },
              style: { userSelect: 'text', position: 'relative', maxWidth: '100%' },
            })}
          </div>
        );
      }

      setContent(pageNodes);
    };

    const renderDOCX = async () => {
      try {
        const response = await fetch(fileUrl);
        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setContent(
          <div
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'Arial, sans-serif',
              fontSize: `${16 * scale}px`,
              color: '#333',
              padding: '10px',
              lineHeight: '1.6',
            }}
          >
            {result.value}
          </div>
        );
      } catch (error) {
        console.error('Error rendering DOCX file:', error);
        setContent(<div>Error loading DOCX file.</div>);
      }
    };

    if (fileType === 'pdf') {
      renderPDF();
    } else if (fileType === 'docx') {
      renderDOCX();
    }
  }, [fileUrl, fileType, scale]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const containerWidth = entries[0].contentRect.width;
      const newScale = containerWidth / 800; // 800 là chiều rộng PDF mặc định
      setScale(newScale);
    });

    if (viewerRef.current) {
      resizeObserver.observe(viewerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={viewerRef}
      className="file-viewer-container relative"
      style={{
        width: '100%',
        height: 'calc(100vh - 160px)',
        overflowY: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        position: 'relative',
      }}
    >
      <div className="file-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {content}
      </div>
    </div>
  );
};

export default FileViewer;
