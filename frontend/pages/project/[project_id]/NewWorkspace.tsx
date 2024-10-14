// components/project/NewWorkspace.tsx
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ListboxWrapper } from '@/components/ListboxWrapper';
import { Listbox, ListboxItem, Button } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import '@/components/project/config.css'
import { Document } from '@/src/types/types';
import React, { useState, useEffect, FC } from 'react';
import { createNewConversation } from '@/service/projectApi';
import { useRouter } from 'next/router';
interface NewWorkspaceProps {
    isOpen: boolean;
    onClose: () => void;
    documents: Document[]
    projectId: string
    updateConversation: () => void
}


const NewWorkspace: FC<NewWorkspaceProps> = ({ updateConversation, projectId, isOpen, onClose, documents }) => {
    const router = useRouter()
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());
    const [conversationName, setConversationName] = useState<string>('');
    const [isDisable, setIsDisable] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleSelectionChange = (keys: Set<string>) => {
        setSelectedKeys(keys);
    };

    const handleCreateNewConversation = async () => {
        console.log(Array.from(selectedKeys), projectId)
        setIsLoading(true)
        try {
            const data = await createNewConversation(conversationName, projectId, Array.from(selectedKeys))
            setIsLoading(false)
            handleRouterWorkspace(data.data.conversation_id)
        } catch(e) {
            console.log(e)
            setIsLoading(false)
        }
        onClose()
    }

    const handleRouterWorkspace = (conversationId: string) => {
        updateConversation()
        const url = `/project/${projectId}/workspace/${conversationId}`
        window.open(url, '_blank');
    }

    useEffect(() => {
        if(documents !== undefined) {
            if(documents.length !== 0 && Array.from(selectedKeys).length !== 0 && conversationName !== '' ) {
                setIsDisable(false)
            }
        }

    }, [documents, conversationName, selectedKeys])


    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).map(key => {
            const doc = documents.find(doc => doc.document_id === key);
            return doc ? doc.document_name : '';
        }).join(", "),
        [selectedKeys]
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                {/* Trigger button or component can be added here */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[827px] bg-zinc-200 dark:bg-zinc-900 border-none">
                <DialogTitle>Select Files</DialogTitle>
                
                {/* Thêm trường input cho tên */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-white">Conversation Name</label>
                    <input
                        type="text"
                        value={conversationName}
                        onChange={(e) => setConversationName(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-zinc-700 text-white"
                        placeholder="Enter conversation name"
                    />
                </div>
        
                <div className="custom-width mt-4">
                    <ListboxWrapper>
                        <Listbox
                            className="max-w-none"
                            aria-label="File selection"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="multiple"
                            selectedKeys={selectedKeys}
                            onSelectionChange={(key) => handleSelectionChange(key)}
                        >
                            {documents?.map((doc) => (
                                <ListboxItem textValue="Add" key={doc.document_id} value={doc.document_id}>
                                    {doc.document_name} ({doc.type})
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </ListboxWrapper>
                </div>
        
                <p className="text-small text-default-500 mt-2">Selected files: {selectedValue}</p>
        
                <Button
                    isLoading={isLoading}
                    isDisabled={isDisable}
                    color="default"
                    onClick={() => handleCreateNewConversation()}
                    startContent={!isLoading && <PlusIcon className="w-5 h-5" />}
                    className="mt-4"
                >
                    Create
                </Button>
            </DialogContent>
        </Dialog>
    
    );
};

export default NewWorkspace;
