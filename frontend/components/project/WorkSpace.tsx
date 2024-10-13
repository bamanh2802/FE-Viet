import React, { useState, useEffect } from "react";
import {Card, CardHeader, CardBody, Image, ScrollShadow,
     CardFooter, Divider, Button
} from "@nextui-org/react";
import 'swiper/css';
import { Tabs, Tab } from '@nextui-org/tabs';

import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import { DocumentTextIcon, 
    ChatBubbleLeftRightIcon,
    TrashIcon,
    PencilSquareIcon,
    ArrowUpOnSquareIcon,
    PlusIcon
} from "@heroicons/react/24/outline";
import { createNewNote } from "@/service/noteApi";

import 'remixicon/fonts/remixicon.css';
import '../project/config.css'
import { Project, Document, ImageType, Conversation, Note } from "@/src/types/types";
import {Skeleton, Avatar, Tooltip} from "@nextui-org/react";
interface WorkSpaceProps{
    documents: Document[],
    images: ImageType[],
    conversations: Conversation[]
    notes: Note[]
    projectId: string
    openNewDocument: () => void
    onOpenDialog: () => void
    setSelectedNote: (note: string) => void
}
const WorkSpace: React.FC<WorkSpaceProps> = ({setSelectedNote, onOpenDialog, openNewDocument, projectId, documents, images, conversations, notes}) => {


    const handleRouterWorkspace = (conversationId: string) => {
        const url = `/project/${projectId}/workspace/${conversationId}`
        window.open(url, '_blank');
    }

    const handleOpenWorkspace = (conv: Conversation) => {
        handleRouterWorkspace(conv.conversation_id)
    }
    function convertDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);
      
        // Nếu dưới 1 tuần
        if (diffInDays < 7) {
          return `${diffInDays}d ago`;
        }
        setSelectedNote
        // Nếu dưới 1 tháng
        if (diffInWeeks < 4) {
          return `${diffInWeeks}w ago`;
        }
      
        // Nếu trên 1 tháng, format là "Ngày Tháng" (VD: 1 Feb, 23 May)
        const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
        return date.toLocaleDateString("en-US", options);
      }

    const handleCreateNewNote = async () => {
        try {
            const data = await createNewNote (projectId)
            setSelectedNote(data.data.note_id)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="overflow-auto flex justify-center bg-zinc-200 dark:bg-zinc-800 w-full"
        style={{ height: 'calc(100vh - 56px)'}}
        >
            <div className="w-full flex flex-col items-center px-12">

                {/* WorkSpace */}
                <div className="w-full flex-col max-w-4xl  mt-8">
                <span className="text-start opacity-85 py-4 block">Conversation</span>
                <div className="">
                    {
                        conversations === undefined ? (
                            <>
                            <div className="max-w-[300px] w-full flex items-center gap-3">
                                <div>
                                    <Skeleton className="flex rounded-full w-12 h-12"/>
                                </div>  
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton className="h-3 w-3/5 rounded-lg"/>
                                    <Skeleton className="h-3 w-4/5 rounded-lg"/>
                                </div>
                            </div>
                            </>
                        ) :
                        (
                            <>
                            <Carousel>
                            <CarouselContent className="">
                            <CarouselItem key="plus"
                            onClick={onOpenDialog}
                            className="cursor-pointer basis-1/5 hover:scale-[1.01] transition-all">
                                <Tooltip content="Add new Conversation">
                                    <Card 
                                    className="shadow-none bg-opacity-0 w-full h-[170px] flex justify-center items-center">
                                        <PlusIcon className="w-h-16 h-16" />
                                    </Card>
                                </Tooltip>
                                </CarouselItem>
                            {
                                conversations.map((conv, index) => (
                                    <CarouselItem
                                    key={index}
                                    onClick={() => handleOpenWorkspace(conv)}
                                    className="basis-1/4">
                                    <Card 
                                    
                                    className=" hover:scale-[1.01] cursor-pointer">
                                        <CardHeader className="flex gap-3 items-center">
                                            <Image
                                                alt="nextui logo"
                                                height={40}
                                                width={40}
                                                className="flex-shrink-0"
                                                radius="sm"
                                                src="https://icons.veryicon.com/png/o/education-technology/ballicons/workspace-1.png"
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-md truncate max-w-[130px]">{conv.conversation_name}</p>
                                                <p className="text-small text-default-500">{convertDate(conv.created_at)}</p>
                                            </div>
                                            </CardHeader>

                                        <Divider/>
                                        <CardBody>
                                            Tin nhắn đầu tiên
                                        </CardBody>
                                        <Divider/>
                                        <CardFooter className="flex flex-col items-start">
                                            <div className="flex opacity-85 items-center">
                                                <DocumentTextIcon className="w-3 h-3 mr-1"/>
                                                <p className="text-xs"> 5 Documents</p>
                                            </div>
                                            <div className="flex opacity-85 items-center">
                                                <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1" />
                                                <p className="text-xs"> 12 Conversations</p>
                                            </div>
                                            
                                        </CardFooter>
                                    </Card>
                                </CarouselItem>
                                ))
                            }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                            </Carousel>
                            </>
                        )
                    }
                    </div>
                </div>  


                {/* Documents */}
                <div className="w-full flex-col max-w-4xl mt-8">
                    <span className="text-start opacity-85 py-4 block">Documents</span>

                    <div className="">
                        {documents === undefined ? (
                            <div className=" w-full flex flex-col items-center gap-3">
                                    <Skeleton className="h-12 w-full rounded-lg"/>
                                    <Skeleton className="h-12 w-full rounded-lg"/>
                            </div>
                        ) : (
                            <>
                            <Carousel>
                                <CarouselContent>
                                <CarouselItem 
                                key="plus"
                                onClick={openNewDocument}
                                className="cursor-pointer basis-1/5 hover:scale-[1.01] transition-all">
                                <Tooltip content="Add new Document">
                                    <Card className="shadow-none bg-opacity-0 max-w-[180px] h-[170px] flex justify-center items-center">
                                        <PlusIcon className="w-h-16 h-16" />
                                    </Card>
                                </Tooltip>
                                </CarouselItem>

                                {/* Lặp qua các tài liệu */}
                                {documents.map((doc, index) => (
                                    <CarouselItem 
                                    key={index}
                                    className="cursor-pointer basis-1/5 hover:scale-[1.01] transition-all" key={index}>
                                    <Card className="max-w-[180px]">
                                        <CardBody className="overflow-hidden p-0 h-[90px]">
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-t-xl"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGAA4Wd4bco5Xv33GasXrnDdQT5OFXwa3HUQ&s"
                                            width={180}
                                            height={180}

                                        />
                                        </CardBody>
                                        <CardHeader className="pb-0 h-20 py-2 pt-2 px-2 flex-col justify-between items-start">
                                        <div className="w-full h-8 truncate">
                                            <h4 className="text-md">{doc.document_name}</h4>
                                        </div>
                                        <div className="flex justify-center">
                                            <Avatar
                                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                            className="w-4 h-4 text-tiny"
                                            />
                                            <p className="text-xs opacity-80 pl-2 text-center">
                                            {convertDate(doc.created_at)}
                                            </p>
                                        </div>
                                        </CardHeader>
                                    </Card>
                                    </CarouselItem>
                                ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            </>

                        )
                    }
                    </div>
                </div>

                {/* Notes */}
                <div className="w-full flex-col max-w-4xl mt-8">
                    <span className="text-start opacity-85 py-4 block">Notes</span>
                    <div className="">
                    <Carousel>
                        <CarouselContent>
                        <CarouselItem 
                        key="plus"
                        onClick={handleCreateNewNote}
                        className="cursor-pointer basis-1/5 hover:scale-[1.01] transition-all">
                        <Tooltip content="Add new Note">
                            <Card className="shadow-none bg-opacity-0 max-w-[180px] h-[113px] flex justify-center items-center">
                                <PlusIcon className="w-h-16 h-16" />
                            </Card>
                        </Tooltip>
                        </CarouselItem>
                        {
                            notes && notes.map((note, index) => (
                                <CarouselItem 
                                key={index}
                                onClick={() => setSelectedNote(note.note_id)} 
                                className="cursor-pointer basis-1/5 hover:scale-[1.01] transition-all" key={index}>
                                    <div className="bg-zinc-800 rounded-lg shadow-lg flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 bg-[#404144] rounded-t-lg relative opacity-80">
                                            <i className="ri-booklet-line absolute left-4 top-8 text-3xl"></i>
                                        </div>
                                        <div className="mt-2 p-4">
                                            <h2 className=" truncate">{note.title}</h2>
                                            <div className="flex items-center mt-1">
                                            <img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/432733982_1611954199540695_6178013665723587549_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XmQZxVgU9HkQ7kNvgEEhCg6&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A1FPRUXT5gOpbXYMtQWSxuo&oh=00_AYB-qR5B-fumXpeNjxGGewaJ1-utlrUBk5u3VlrFW08MfA&oe=670EE2FE" alt="Avatar" className="w-5 h-5 rounded-full"/>
                                            <span className="ml-2 text-xs text-gray-400">{convertDate(note.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    </div>
                </div>
        </div>

        </div>
    )
}
export default WorkSpace