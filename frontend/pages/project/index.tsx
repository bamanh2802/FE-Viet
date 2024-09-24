import Sidebar from "@/components/project/Sidebar"
import { FC } from 'react';
import React, {useState} from "react";
import NavbarProject from "@/components/project/NavbarProject"
import WorkSpace from "@/components/project/WorkSpace"
import NewWorkspace from "./NewWorkspace"
import { useRouter } from 'next/router';

const Project: FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const router = useRouter();

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    const { projectId } = router.query;
    const validProjectId = Array.isArray(projectId) ? projectId[0] : projectId || '';

    return (
        <div className="flex box-border">
<<<<<<< HEAD
            <div className="">
                <Sidebar projectId={validProjectId}/>
=======
            {/* <div className="">
                <Sidebar />
>>>>>>> 4719c2c9c0bce0672807650f513cb01493c1ab16
            </div>
            <div className="flex flex-col w-full">
                <NavbarProject onOpenDialog={openDialog} />
                <WorkSpace />
                <NewWorkspace isOpen={isDialogOpen} onClose={closeDialog} />
            </div> */}
        </div>
    );
};

export default Project;