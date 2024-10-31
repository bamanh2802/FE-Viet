import { CopyIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import React from "react";
import { Button, Input } from "@nextui-org/react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShareWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareWorkspace: FC<ShareWorkspaceProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-200 dark:bg-zinc-900 border-none">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label className="sr-only" htmlFor="link">
              Link
            </label>
            <Input
              readOnly
              defaultValue="https://sharing@project_id"
              id="link"
            />
          </div>
          <Button className="px-3" size="sm" type="submit">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="bordered">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareWorkspace;
