import React, { useState, useRef } from 'react';

const WebsiteViewer: React.FC<{ websiteUrl: string }> = ({ websiteUrl }) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        visible: true,
      });
    } else {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  const handleCloseContextMenu = () => setContextMenu({ ...contextMenu, visible: false });

 

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 160px)',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Website iframe */}
      <iframe
        src={websiteUrl}
        title="Website Viewer"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      ></iframe>

      {/* Overlay for context menu */}
     
    </div>
  );
};

export default WebsiteViewer;
