import React, { useState, useEffect } from "react";
import {Card, CardHeader, CardBody, Image, ScrollShadow,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
     CardFooter, Divider, Button
} from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
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
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/mousewheel'
import 'swiper/css/scrollbar'

import { DocumentTextIcon, 
    ChatBubbleLeftRightIcon,
    TrashIcon,
    PencilSquareIcon,
    ArrowUpOnSquareIcon,
    PlusIcon
} from "@heroicons/react/24/outline";

import 'remixicon/fonts/remixicon.css';
import '../project/config.css'
import { Project, Document, ImageType, Conversation } from "@/src/types/types";
import {Skeleton, Avatar, Tooltip} from "@nextui-org/react";
import { Plus } from "lucide-react";
interface WorkSpaceProps{
    documents: Document[],
    images: ImageType[],
    conversations: Conversation[]
    projectId: string
    openNewDocument: () => void
    onOpenDialog: () => void
}
const WorkSpace: React.FC<WorkSpaceProps> = ({onOpenDialog, openNewDocument, projectId, documents, images, conversations}) => {
   

    const dataTables = [
        `
    | STT | Tên        | Tuổi | Địa chỉ                |
    |-----|------------|------|------------------------|
    | 1   | Nguyễn An  | 25   | 123 Đường ABC, Hà Nội  |
    | 2   | Trần Bình  | 30   | 456 Đường DEF, TP HCM  |
    | 3   | Lê Cường   | 28   | 789 Đường GHI, Đà Nẵng |
        `,
        `
    | STT | Sản phẩm   | Giá  | Số lượng               |
    |-----|------------|------|------------------------|
    | 1   | Bánh mì    | 15k  | 50                     |
    | 2   | Sữa tươi   | 20k  | 30                     |
    | 3   | Cà phê     | 25k  | 40                     |
    | 1   | Bánh mì    | 15k  | 50                     |
    | 2   | Sữa tươi   | 20k  | 30                     |
    | 3   | Cà phê     | 25k  | 40                     |
    | 3   | Cà phê     | 25k  | 40                     |
    | 1   | Bánh mì    | 15k  | 50                     |
    | 2   | Sữa tươi   | 20k  | 30                     |
    | 3   | Cà phê     | 25k  | 40                     |
        `,
        `***gello***`
        // Thêm các bảng khác tại đây
    ];



    function parseMarkdownTable(markdown: string): string[][] {
        // Xóa khoảng trắng ở đầu và cuối và bỏ các ký tự không cần thiết
        markdown = markdown.trim().replace(/^\|/, '').replace(/\|$/, '');
    
        // Tách các dòng và lọc các dòng không cần thiết
        const lines = markdown.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
        // Nếu không có đủ dòng dữ liệu, trả về mảng rỗng
        if (lines.length < 2) return [];
    
        // Trích xuất tiêu đề
        const headers = lines[0].split('|').map(cell => cell.trim()).filter(cell => cell.length > 0);
        
        // Trích xuất hàng phân cách và các hàng dữ liệu
        const separator = lines[1];
        const table: string[][] = [headers];
        
        // Xử lý dữ liệu từ dòng thứ ba trở đi
        for (let i = 2; i < lines.length; i++) {
            const row = lines[i].split('|').map(cell => cell.trim()).filter(cell => cell.length > 0);
            if (row.length === headers.length) { // Chỉ thêm hàng nếu có số lượng ô khớp với tiêu đề
                table.push(row);
            }
        }
    
        return table;
    }

    const tableDatas = dataTables.map((data, index) => {
        return parseMarkdownTable(data)
    })

    const tableData = parseMarkdownTable(dataTables[1]);
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
      
        // Nếu dưới 1 tháng
        if (diffInWeeks < 4) {
          return `${diffInWeeks}w ago`;
        }
      
        // Nếu trên 1 tháng, format là "Ngày Tháng" (VD: 1 Feb, 23 May)
        const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
        return date.toLocaleDateString("en-US", options);
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
                            <CarouselItem 
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
                                {/* Thẻ "Plus" thêm mới */}
                                <CarouselItem 
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
                                    <CarouselItem className="basis-1/5 hover:scale-[1.01] transition-all" key={index}>
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
                <div className="w-full flex-col max-w-screen-lg mt-8">
                    <span className="text-start opacity-85 py-4 block">Notes</span>
                    <div className="flex overflow-auto w-full ">
                    {/* <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                            spaceBetween={20}
                            slidesPerView='auto'
                            navigation
                            mousewheel
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            >
                        
                        {
                            dataNotes && dataNotes.map((note, index) => (
                                <SwiperSlide key={index} className="w-44" style={{ width: '11rem !important'}}>
                                <div className="bg-zinc-800 rounded-lg shadow-lg flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 bg-[#404144] rounded-t-lg relative opacity-80">
                                        <i className="ri-booklet-line absolute left-4 top-8 text-3xl"></i>
                                    </div>
                                    <div className="mt-2 p-4">
                                        <h2 className="text-sm font-semibold opacity-80">{note.name}</h2>
                                        <div className="flex items-center mt-1">
                                        <img src="https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/458197052_1236440294376177_6824711196797531216_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=iiV5NdYpcQoQ7kNvgHfMbLi&_nc_ht=scontent.fhan14-3.fna&oh=03_Q7cD1QFQOyEG2hWyk7qxQLsWicGk13o2kUO7XyQIJVZQzSbZAw&oe=67026137" alt="Avatar" className="w-5 h-5 rounded-full"/>
                                        <span className="ml-2 text-xs text-gray-400">{note.createAt}</span>
                                        </div>
                                    </div>
                                </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper> */}
                    </div>
                </div>
        </div>

        </div>
    )
}
export default WorkSpace