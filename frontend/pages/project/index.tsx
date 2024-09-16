import Sidebar from "@/components/project/Sidebar"
import { FC } from 'react';
import React, {useState} from "react";
import NavbarProject from "@/components/project/NavbarProject"
import WorkSpace from "@/components/project/WorkSpace"
import NewWorkspace from "./NewWorkspace"

const Project: FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    return (
        <div className="flex box-border">
            <div className="">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full">
                <NavbarProject onOpenDialog={openDialog} />
                <WorkSpace />
                <NewWorkspace isOpen={isDialogOpen} onClose={closeDialog} />
            </div>
        </div>
    );
};

export default Project;