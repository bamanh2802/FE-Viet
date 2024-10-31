import React, { useState, useEffect } from "react";
import {
  ChevronDoubleRightIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Document, Note, Conversation, Project } from "@/src/types/types";

interface SearchComponentProps {
  documents: Document[];
  conversations: Conversation[];
  projects: Project[];
  notes: Note[];
  isOpen: boolean;
  onClose: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onClose,
  isOpen,
  documents = [],
  notes = [],
  conversations = [],
  projects = [],
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]); // State for filtered conversations
  const router = useRouter();

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setFilteredDocuments([]);
      setFilteredNotes([]);
      setFilteredProjects([]);
      setFilteredConversations([]); // Reset conversations when search term is empty
    }
  }, [searchTerm]);

  const handleRouterToConversation = (conv: Conversation) => {
    const url = `/project/${conv.project_id}/workspace/${conv.conversation_id}`;

    window.open(url, "_blank");
  };
  const handleRouterToDocument = (document: Document) => {
    const url = `/project/${document.project_id}/document/${document.document_id}`;

    window.open(url, "_blank");
  };

  const handleRouterToProject = (project: Project) => {
    router.push(`/project/${project.project_id}`);
  };

  const handleSearch = () => {
    // Filter documents
    const docs = documents.filter((doc) =>
      doc.document_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredDocuments(docs);

    // Filter notes
    const nts = notes.filter((note) => {
      const titleMatch = note.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const contentMatch = note.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return titleMatch || contentMatch;
    });

    setFilteredNotes(nts);

    // Filter projects
    const prj = projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredProjects(prj);

    // Filter conversations
    const convs = conversations.filter((conversation) =>
      conversation.conversation_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

    setFilteredConversations(convs);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[620px] dark:bg-zinc-900 bg-slate-50">
        <DialogHeader>
          <DialogTitle className="sr-only">Search</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Input
            className="w-full  placeholder-gray-400 border-none"
            placeholder="Search in project"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Kbd
            className="absolute right-2 top-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border font-mono"
            keys={["escape"]}
          >
            ESC
          </Kbd>
        </div>
        <ScrollArea className="h-[300px] mt-4">
          {filteredDocuments.length > 0 ||
          filteredNotes.length > 0 ||
          filteredProjects.length > 0 ||
          filteredConversations.length > 0 ? (
            <div className="space-y-4">
              {/* Document section */}
              {filteredDocuments.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-400">
                    Documents
                  </h3>
                  <Listbox className="space-y-2">
                    {filteredDocuments.map((doc, index) => (
                      <ListboxItem
                        key={index}
                        className="group flex items-center justify-between "
                        endContent={
                          <ChevronDoubleRightIcon className="h-4 w-4 dark:text-gray-400 text-gray-700 opacity-0 group-hover:opacity-95 transition-all" />
                        }
                        onClick={() => handleRouterToDocument(doc)}
                      >
                        <span className="flex items-center">
                          <DocumentTextIcon className="w-4 h-4 mr-2" />
                          {doc.document_name}
                        </span>
                      </ListboxItem>
                    ))}
                  </Listbox>
                </div>
              )}
              {/* Notes section */}
              {filteredNotes.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-400">
                    Notes
                  </h3>
                  <Listbox className="space-y-2">
                    {filteredNotes.map((note, index) => (
                      <ListboxItem
                        key={index}
                        className="group flex items-center justify-between"
                        endContent={
                          <ChevronDoubleRightIcon className="h-4 w-4 dark:text-gray-400 text-gray-700 opacity-0 group-hover:opacity-95 transition-all" />
                        }
                      >
                        <span className="flex items-center">
                          <DocumentTextIcon className="w-4 h-4 mr-2" />
                          {note.title}
                        </span>
                      </ListboxItem>
                    ))}
                  </Listbox>
                </div>
              )}
              {/* Projects section */}
              {filteredProjects.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-400">
                    Projects
                  </h3>
                  <Listbox className="space-y-2">
                    {filteredProjects.map((project, index) => (
                      <ListboxItem
                        key={index}
                        className="group flex items-center justify-between"
                        endContent={
                          <ChevronDoubleRightIcon className="h-4 w-4 dark:text-gray-400 text-gray-700 opacity-0 group-hover:opacity-95 transition-all" />
                        }
                        onClick={() => handleRouterToProject(project)}
                      >
                        <span className="flex items-center">
                          <UserGroupIcon className="w-4 h-4 mr-2" />
                          {project.name}
                        </span>
                      </ListboxItem>
                    ))}
                  </Listbox>
                </div>
              )}
              {/* Conversations section */}
              {filteredConversations.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-gray-400">
                    Conversations
                  </h3>
                  <Listbox className="space-y-2">
                    {filteredConversations.map((conversation, index) => (
                      <ListboxItem
                        key={index}
                        className="group flex items-center justify-between"
                        endContent={
                          <ChevronDoubleRightIcon className="h-4 w-4 dark:text-gray-400 text-gray-700 opacity-0 group-hover:opacity-95 transition-all" />
                        }
                        onClick={() => handleRouterToConversation(conversation)}
                      >
                        <span className="flex items-center">
                          <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
                          {conversation.conversation_name}
                        </span>
                      </ListboxItem>
                    ))}
                  </Listbox>
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
};

export default SearchComponent;
