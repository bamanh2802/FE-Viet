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
interface RenameObjectProps {
  id: string;
  name: string;
  isOpen: boolean
  onClose: () => void
  onRename: (id: string, newName: string) => void; // Callback function to handle renaming
}

const RenameObject: React.FC<RenameObjectProps> = ({ id, name, onRename, onClose, isOpen }) => {
  const [newName, setNewName] = useState(name);

  const handleRename = () => {
    onRename(id, newName);
    onClose(); 
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Object</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <Input 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder="Enter new name" 
            />
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

export default RenameObject;
