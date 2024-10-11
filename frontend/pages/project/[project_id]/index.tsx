'use client';

import Sidebar from "@/components/project/Sidebar";
import { FC, useEffect, useState } from "react";
import NavbarProject from "@/components/project/NavbarProject";
import WorkSpace from "@/components/project/WorkSpace";
import NewWorkspace from "./NewWorkspace";
import { useRouter } from "next/router";
import ShareWorkspace from "./ShareWorkspace";
import { getDocumentInProject, getConversationInProject, getImagesInProject, getNotesInProject } from "@/service/projectApi";
import { Document, ImageType, Conversation, Note } from "@/src/types/types";
import Image from "next/image";
import PreLoading from "@/public/img/project_preloading.gif";
import NewDocument from "./NewDocument";
import { useSSR } from "react-i18next";
import RichTextEditor from "./Note";

const Project: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // State cho loading
  const router = useRouter();
  const { project_id } = router.query;

  const [documents, setDocuments] = useState<Document[]>([]);
  const [images, setImages] = useState<ImageType[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isOpenNewDocument, setIsOpenNewDocument] = useState<boolean> (false)
  const [notes, setNotes] = useState<Note[]> ([])
  const [selectedNote, setSelectedNote] = useState<string>()

  const openDialog = () => setIsDialogOpen(true);
  const openShare = () => setIsOpenShare(true);
  const closeDialog = () => setIsDialogOpen(false);
  const closeShare = () => setIsOpenShare(false);
  const closeNewDocument = () => setIsOpenNewDocument(false)
  const openNewDocument = () => {
    setIsOpenNewDocument(true)
    console.log('hello')
  }

  const handleGetDocuments = async () => {
    try {
      const data = await getDocumentInProject(project_id as string); // Sử dụng `as string` cho `project_id`
      setDocuments(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetNotes = async () => {
    try {
      const data = await getNotesInProject(project_id as string)
      setNotes(data.data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleGetImages = async () => {
    try {
      const data = await getImagesInProject(project_id as string);
      setImages(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetConversations = async () => {
    try {
      const data = await getConversationInProject(project_id as string);
      setConversations(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (project_id !== undefined) {
      Promise.all([handleGetDocuments(), handleGetConversations(), handleGetNotes()])
        .then(() => setIsLoading(false)) // Tắt loading khi dữ liệu đã tải xong
        .catch((err) => console.error(err));
    }
  }, [project_id]);

  if (isLoading) {
    // Hiển thị ảnh loading khi dữ liệu đang được tải
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800">
        <Image src={PreLoading} alt="Loading..." width={150} height={150} />
      </div>
    );
  }

  return (
    <div className="flex box-border">
      <div>
        <Sidebar 
        notes={notes}
        documents={documents} 
        images={images} 
        conversations={conversations} />
      </div>
      <div className="flex flex-col w-full">
        <NavbarProject onOpenShare={openShare} onOpenDialog={openDialog} />
        <div>
          {/* <WorkSpace 
          onOpenDialog={openDialog}
          openNewDocument={openNewDocument}
          projectId={project_id as string} 
          documents={documents} 
          images={images} 
          conversations={conversations} 
          notes={notes}
          /> */}
          <div className="w-full h-[calc(100vh-56px)] bg-zinc-200 dark:bg-zinc-800">
          <RichTextEditor />
          </div>
        </div>
        <NewWorkspace 
        updateConversation={handleGetConversations}
        projectId={project_id as string} 
        documents={documents} 
        isOpen={isDialogOpen} 
        onClose={closeDialog} />
        <ShareWorkspace isOpen={isOpenShare} onClose={closeShare} />
        <NewDocument 
        updateDocument={handleGetDocuments}
        documents={documents}
        isOpen={isOpenNewDocument} 
        onClose={closeNewDocument} 
        projectId={project_id as string}/>
      </div>
    </div>
  );
};

export default Project;
