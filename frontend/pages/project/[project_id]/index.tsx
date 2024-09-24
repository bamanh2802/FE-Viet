'use client'
import Sidebar from "@/components/project/Sidebar"
import { FC } from 'react';
import React, {useState} from "react";
import NavbarProject from "@/components/project/NavbarProject"
import WorkSpace from "@/components/project/WorkSpace"
import NewWorkspace from "../NewWorkspace";
import { useRouter } from 'next/router'
import NoteInput from "@/components/project/NoteInput";
import Note from "./Note";
import ShareWorkspace from "./ShareWorkspace";


const Project: FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
    const router = useRouter()
    const openDialog = () => setIsDialogOpen(true);
    const openShare = () => setIsOpenShare(true);
    const closeDialog = () => setIsDialogOpen(false);
    const closeShare = () => setIsOpenShare(false);
    const { projectId } = router.query;
    const validProjectId = Array.isArray(projectId) ? projectId[0] : projectId || '';

    return (
        <div className="flex box-border">
            <div className="">
                <Sidebar projectId = {validProjectId}/>
            </div>
            <div className="flex flex-col w-full">
                <NavbarProject onOpenShare={openShare} onOpenDialog={openDialog} />
                <div>
                <WorkSpace />
                {/* <Note /> */}
                </div>
                <NewWorkspace isOpen={isDialogOpen} onClose={closeDialog} />
                <ShareWorkspace isOpen={isOpenShare} onClose={closeShare}/>
            </div>
        </div>
    );
};

export default Project;