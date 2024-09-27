'use client'
import Sidebar from "@/components/project/Sidebar"
import { FC, useEffect } from 'react';
import React, {useState} from "react";
import NavbarProject from "@/components/project/NavbarProject"
import WorkSpace from "@/components/project/WorkSpace"
import NewWorkspace from "../NewWorkspace";
import { useRouter } from 'next/router'
import NoteInput from "@/components/project/NoteInput";
import Note from "./Note";
import ShareWorkspace from "./ShareWorkspace";
import { getDocumentInProject, getConversationInProject, getImagesInProject } from '@/service/projectApi';
import { Document, Image, Conversation } from "@/src/types/types";



const Project: FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
    const router = useRouter()
    const openDialog = () => setIsDialogOpen(true);
    const openShare = () => setIsOpenShare(true);
    const closeDialog = () => setIsDialogOpen(false);
    const closeShare = () => setIsOpenShare(false);
    const { project_id } = router.query;
    const [documents, setDocuments] = useState<Document[]> ([])
    const [images, setImages] = useState<Image[]> ([])
    const [conversations, setConversations] = useState<Conversation[]> ([])
    const handleGetDocuments = async () => {
        try {
            const data = await getDocumentInProject(project_id)
            setDocuments(data.data)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }
    
    const handleGetTables = async () => {
    
    }
    
    const handleGetImages = async () => {
        try {
            const data = await getImagesInProject(project_id)
            setImages(data.data)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    
    }
    const handleGetNotes = async () => {
    
    }
    const handleGetConversations = async () => {
        try {
            const data = await getConversationInProject(project_id)
            setConversations(data.data)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (project_id !== undefined) {
          handleGetDocuments()
          handleGetImages()
          handleGetConversations()
        }
      
      }, [project_id])
    return (
        <div className="flex box-border">
            <div className="">
                <Sidebar documents={documents} images={images} conversations={conversations}/>
            </div>
            <div className="flex flex-col w-full">
                <NavbarProject onOpenShare={openShare} onOpenDialog={openDialog} />
                <div>
                <WorkSpace />
                {/* <Note /> */}
                </div>
                <NewWorkspace documents={documents} isOpen={isDialogOpen} onClose={closeDialog} />
                <ShareWorkspace isOpen={isOpenShare} onClose={closeShare}/>
            </div>
        </div>
    );
};

export default Project;