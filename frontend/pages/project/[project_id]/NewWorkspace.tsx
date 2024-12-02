import { Listbox, ListboxItem, Button, Selection } from "@nextui-org/react";
import {
  PlusIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
  GlobeAltIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ListboxWrapper } from "@/components/ListboxWrapper";

import { Document } from "@/src/types/types";

import React, { useState, useEffect, FC } from "react";

import { createNewConversation } from "@/service/projectApi";
import { getAllConversationByUser } from "@/service/apis";
import { setConversations } from "@/src/store/conversationSlice";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";

interface NewWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
  projectId: string;
  updateConversation: () => void;
  from: string;
}

const NewWorkspace: FC<NewWorkspaceProps> = ({
  from,
  updateConversation,
  projectId,
  isOpen,
  onClose,
  documents,
}) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const [conversationName, setConversationName] = useState<string>("");
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch()

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys as Set<string>);
  };
  const handleCreateNewConversation = async () => {
    const selectedDocsArray = Array.from(selectedKeys).filter(key => key !== '');
    setIsLoading(true);
    try {
      const data = await createNewConversation(
        conversationName,
        projectId,
        selectedDocsArray,
      );

      setIsLoading(false);
      handleRouterWorkspace(data.data.conversation_id);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
    onClose();
  };

  const handleGetConversations = async () => {
    try {
      const data = await getAllConversationByUser();
      dispatch(setConversations(data.data))
    } catch (e) {
      console.log(e);
    }
  };

  const handleRouterWorkspace = (conversationId: string) => {
    updateConversation();
    if (from === "project") {
      const url = `/project/${projectId}/workspace/${conversationId}`;

      window.open(url, "_blank");
    } else if (from === "conversation") {
      router.push(`/project/${projectId}/workspace/${conversationId}`);
    }
  };

  useEffect(() => {
    if (documents !== undefined) {
      if (
        documents.length !== 0 &&
        Array.from(selectedKeys).length !== 0 &&
        conversationName !== ""
      ) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    }
  }, [documents, conversationName, selectedKeys]);

  const selectedValue = React.useMemo(
    () =>
      Array.from(selectedKeys)
        .map((key) => {
          const doc = documents?.find((doc) => doc.document_id === key);

          return doc ? doc.document_name : "";
        })
        .join(", "),
    [selectedKeys],
  );

  // Function to get the icon based on document type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <DocumentTextIcon className="w-5 h-5 inline-block mr-1" />;
      case "pptx":
        return (
          <PresentationChartBarIcon className="w-5 h-5 inline-block mr-1" />
        );
      case "web":
        return <GlobeAltIcon className="w-5 h-5 inline-block mr-1" />;
      case "word":
        return <NewspaperIcon className="w-5 h-5 inline-block mr-1" />;
      default:
        return null; // Default case if type doesn't match
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[827px] bg-zinc-50 dark:bg-zinc-900 border-none">
        <DialogTitle>Select Files</DialogTitle>

        <div className="mt-4">
          <span className="block text-sm font-medium">Conversation Name</span>
          <input
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            placeholder="Enter conversation name"
            type="text"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
          />
        </div>

        <div className="custom-width mt-4">
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="File selection"
              className="max-w-none"
              selectionMode="multiple"
              variant="flat"
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionChange}
            >
              {documents?.map((doc) => (
                <ListboxItem
                  key={doc.document_id}
                  textValue="Add"
                  value={doc.document_id}
                >
                  {getDocumentIcon(doc.type)} {/* Add the icon here */}
                  {doc.document_name} ({doc.type})
                </ListboxItem>
              ))}
            </Listbox>
          </ListboxWrapper>
        </div>

        <p className="text-small text-default-500 mt-2">
          Selected files: {selectedValue}
        </p>

        <Button
          className="mt-4"
          color="default"
          isDisabled={isDisable}
          isLoading={isLoading}
          startContent={!isLoading && <PlusIcon className="w-5 h-5" />}
          onClick={() => handleCreateNewConversation()}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewWorkspace;
