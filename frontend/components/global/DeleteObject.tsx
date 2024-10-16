import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
interface DeleteObjectProps {
  id: string;
  name: string;
  isOpen: boolean
  onClose: () => void
  onRename: (id: string, newName: string) => void; // Callback function to handle renaming
}

const DeleteObject: React.FC<DeleteObjectProps> = ({ id, name, onRename, onClose, isOpen }) => {

  const handleRename = () => {
    onClose(); 
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Something...</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            Do you want delete
          </div>

          <DialogFooter>
            <Button onClick={handleRename}>Save</Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default DeleteObject;
