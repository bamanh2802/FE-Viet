// Sidebar.tsx
import React from 'react';
import {Listbox, ListboxItem} from "@nextui-org/react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen dark:bg-zinc-900 bg-zinc-50 p-4 ">
      <div className="text-left">
        <h1 className="text-sm font-semibold">Document:</h1>
        <p className="text-lg font-bold">NLP-book</p>
      </div>
      
      <div className="my-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
        />
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-500">Analysis</h2>
        <Listbox className="mt-2 space-y-2">
          <ListboxItem  key="summarize" className="text-sm text-gray-300 cursor-pointer hover:text-black">Summarize</ListboxItem>
          <ListboxItem key="create-outline" className="text-sm text-gray-300 cursor-pointer hover:text-black">Create Outlines</ListboxItem>
          <ListboxItem key="translate" className="text-sm text-gray-300 cursor-pointer hover:text-black">Translate</ListboxItem>
        </Listbox>
      </div>
    </div>
  );
}
