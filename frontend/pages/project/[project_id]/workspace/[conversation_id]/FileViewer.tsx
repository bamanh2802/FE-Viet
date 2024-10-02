import { FC } from 'react';

interface FileViewerProps {
  files: { name: string; type: string }[];
}

const FileViewer: FC<FileViewerProps> = ({ files }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Files</h2>
      <div className="grid grid-cols-1 gap-2">
        {files.map((file, index) => (
          <div key={index} className="p-2 bg-gray-100 border rounded">
            <div>{file.name}</div>
            <div className="text-sm text-gray-500">{file.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileViewer;
