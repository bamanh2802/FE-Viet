import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Document, Note } from '@/src/types/types';

interface SearchComponentProps {
  documents: Document[];
  notes: Note[];
  isOpen: boolean;
  onClose: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onClose, isOpen, documents, notes }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setFilteredDocuments([]);
      setFilteredNotes([]);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    // Filter documents
    const docs = documents.filter(doc =>
      doc.document_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocuments(docs);

    // Filter notes
    const nts = notes.filter(note => {
      const titleMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
      const contentMatch = note.content.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || contentMatch;
    });
    setFilteredNotes(nts);
  };

  // Function to highlight matching text
  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi'); // case insensitive
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : part
    );
  };

  // Function to get a portion of content with the search term highlighted
  const getHighlightedContent = (content: string) => {
    if (!searchTerm) return content;
    const regex = new RegExp(`(.{0,30}${searchTerm}.?){0,1}`, 'gi'); // Show 30 characters before and after the term
    const match = content.match(regex);
    return match ? (
      <span>
        {match[0].slice(0, match[0].indexOf(searchTerm))}
        <span className="bg-yellow-300">{match[0].slice(match[0].indexOf(searchTerm), match[0].indexOf(searchTerm) + searchTerm.length)}</span>
        {match[0].slice(match[0].indexOf(searchTerm) + searchTerm.length)}
      </span>
    ) : (
      content
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[620px] dark:bg-zinc-900 bg-slate-50">
        <DialogHeader>
          <DialogTitle className="sr-only">Search</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search in project"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-500"
          />
          <kbd className="absolute right-2 top-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-700 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
            <span className="text-xs">ESC</span>
          </kbd>
        </div>
        <ScrollArea className="h-[300px] mt-4">
          {filteredDocuments.length > 0 || filteredNotes.length > 0 ? (
            <div className="space-y-4">
              {/* Document section */}
              {filteredDocuments.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-400">Documents</h3>
                  <ul className="space-y-2">
                    {filteredDocuments.map((doc, index) => (
                      <li key={index} className="p-2 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out">
                        {highlightText(doc.document_name)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Notes section */}
              {filteredNotes.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-400">Notes</h3>
                  <ul className="space-y-2">
                    {filteredNotes.map((note, index) => (
                      <li key={index} className="p-2 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out">
                        {highlightText(note.title)}
                        <div className="mt-1 text-gray-300">{getHighlightedContent(note.content)}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-400">No recent searches</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default SearchComponent;
