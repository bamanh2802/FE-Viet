// components/project/NewWorkspace.tsx
import { FC } from 'react';
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ListboxWrapper } from '@/components/ListboxWrapper';
import { Listbox, ListboxItem, Button } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import '../../components/project/config.css'
import { Document } from '@/src/types/types';

interface File {
    id: string;
    name: string;
    type: string;
}

interface NewWorkspaceProps {
    isOpen: boolean;
    onClose: () => void;
    documents: Document[]
}


const NewWorkspace: FC<NewWorkspaceProps> = ({ isOpen, onClose, documents }) => {
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());

    const handleSelectionChange = (keys: Set<string>) => {
        setSelectedKeys(keys);
    };

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
            <DialogContent className="sm:max-w-[425px] bg-zinc-800 border-none">
                <DialogTitle>Select Files</DialogTitle>
                <div className='custom-width'>
                <ListboxWrapper>
                    <Listbox
                        className='max-w-none'
                        aria-label="File selection"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleSelectionChange}
                    >
                        {documents?.map((doc) => (
                            <ListboxItem textValue="Add" key={doc.document_id} value={doc.document_id}>
                                {doc.document_name} ({doc.type})
                            </ListboxItem>
                        ))}
                    </Listbox>
                </ListboxWrapper>
                </div>
                <p className="text-small text-default-500">Selected files: {selectedValue}</p>
                <Button color="success" onMouseDown={onClose} startContent={<PlusIcon className='w-5 h-5'/>}>
                    Create
                </Button> 
            </DialogContent>
        </Dialog>
    );
};

export default NewWorkspace;
