import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import '@/components/project/config.css'

// Sử dụng dynamic import để chỉ import trên client-side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NoteInput = () => {
const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }], // Dropdown với các tiêu đề
        ['bold', 'italic', 'underline', 'strike'], // Tùy chọn in đậm, in nghiêng, gạch chân, gạch ngang
        [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Danh sách có thứ tự và không thứ tự
        ['link', 'image'], // Chèn link và hình ảnh
        [{ 'color': [] }, { 'background': [] }], // Tùy chọn màu chữ và nền
        ['clean'] // Xóa định dạng
    ],
    };
    
    const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image', 'color', 'background'
    ];
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    console.log('Nội dung đã nhập:', content);
    // Bạn có thể xử lý việc gửi nội dung ở đây
  };

  return (
    <div 
    className="h-full bg-zinc-900 text-white p-6 w-full rounded-lg max-w-4xl mx-auto">

      {/* Editor sẽ chỉ được tải trên client-side */}
      <ReactQuill 
        value={content}
        onChange={handleContentChange}
        modules={modules} 
        formats={formats}
        theme="snow"
        className="ql-custom bg-zinc-900 text-white rounded-md w-full border-none h-full"
      />

    </div>
  );
};

export default NoteInput;
