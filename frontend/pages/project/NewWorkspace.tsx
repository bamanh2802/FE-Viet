// components/project/NewWorkspace.tsx
import { FC } from 'react';
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ListboxWrapper } from '@/components/ListboxWrapper';
import { Listbox, ListboxItem, Button } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import '../../components/project/config.css'

interface File {
    id: string;
    name: string;
    type: string;
}

interface NewWorkspaceProps {
    isOpen: boolean;
    onClose: () => void;
}

const fileData: File[] = [
    { id: '1', name: 'Document1.pdf', type: 'PDF' },
    { id: '2', name: 'Spreadsheet1.xlsx', type: 'Excel' },
    { id: '3', name: 'Presentation1.pptx', type: 'PowerPoint' },
    { id: '4', name: 'Image1.jpg', type: 'Image' },
    { id: '5', name: 'TextFile1.txt', type: 'Text' },
    { id: '6', name: 'Archive1.zip', type: 'Archive' },
    { id: '7', name: 'CodeFile1.js', type: 'JavaScript' },
    { id: '8', name: 'StyleSheet1.css', type: 'CSS' },
];

const NewWorkspace: FC<NewWorkspaceProps> = ({ isOpen, onClose }) => {
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());

    const handleSelectionChange = (keys: Set<string>) => {
        setSelectedKeys(keys);
    };

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).map(key => {
            const file = fileData.find(file => file.id === key);
            return file ? file.name : '';
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
                        {fileData.map((file) => (
                            <ListboxItem key={file.id} value={file.id}>
                                {file.name} ({file.type})
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
