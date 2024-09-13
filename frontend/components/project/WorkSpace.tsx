import React, { useState, useEffect } from "react";
import {Card, CardHeader, CardBody, Image, ScrollShadow,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/mousewheel'
import 'swiper/css/scrollbar'

import 'remixicon/fonts/remixicon.css';
import '../project/config.css'
const WorkSpace: React.FC = () => {
    const dataDocuments = [
        {
            name: "Báo cáo nhóm 15",
            uploadBy: "Nguyễn Bá Mạnh",
            type: "pdf"
        },
        {
            name: "Báo cáo nhóm 15",
            uploadBy: "Nguyễn Bá Mạnh",
            type: "pdf"
        },
        {
            name: "Báo cáo nhóm 15",
            uploadBy: "Nguyễn Bá Mạnh",
            type: "pdf"
        },
        {
            name: "Báo cáo nhóm 15",
            uploadBy: "Nguyễn Bá Mạnh",
            type: "pdf"
        },
        {
            name: "Báo cáo nhóm 15",
            uploadBy: "Nguyễn Bá Mạnh",
            type: "pdf"
        },
        {
            name: "Báo cáo nhóm 15",
            uploadBy: "Nguyễn Bá Mạnh",
            type: "pdf"
        },
        {
            name: "Báo cáo nhóm 15",
            uploadBy: "Nguyễn Bá Mạnh",
            type: "pdf"
        },
        {
            name: "Báo cáo nhóm 15",
            uploadBy: "Nguyễn Bá Mạnh",
            type: "pdf"
        }
    ]

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

    const dataImages = [
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
        {
            name: 'Figure 1',
            document: 'Không biết',
            link: 'https://nextui.org/images/hero-card-complete.jpeg'
        },
    ]

    const dataNotes = [
        {
            name: 'Untitled Note',
            createBy: 'Nguyễn Bá Mạnh',
            createAt: '22/1/1221'
        },
        {
            name: 'Untitled Note',
            createBy: 'Nguyễn Bá Mạnh',
            createAt: '22/1/1221'
        },
        {
            name: 'Untitled Note',
            createBy: 'Nguyễn Bá Mạnh',
            createAt: '22/1/1221'
        },
        {
            name: 'Untitled Note',
            createBy: 'Nguyễn Bá Mạnh',
            createAt: '22/1/1221'
        },
        {
            name: 'Untitled Note',
            createBy: 'Nguyễn Bá Mạnh',
            createAt: '22/1/1221'
        },

    ]

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
    const headers = tableData[0];
    const rows = tableData.slice(1);
    return (
        <div className="overflow-auto flex justify-center bg-zinc-900 rounded-t-md mt-1 ml-1"
        style={{ width: 'calc(100% - 8px)', height: 'calc(100vh - 60px)'}}
        >
            <div className="w-full flex flex-col items-center px-12">
                {/* Documents */}
                <div className="w-full flex-col max-w-screen-lg mt-8">
                    <span className="text-start opacity-85 py-4 block">Documents</span>

                    <div className="flex overflow-auto w-full ">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                            spaceBetween={20}
                            slidesPerView='auto'
                            scrollbar
                            navigation
                            mousewheel
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            >
                            

                            {dataDocuments.map((document, index) => (
                                <SwiperSlide key={index} className="w-44" style={{ width: '11rem !important'}}>
                                    <Card className="flex-shrink-0 w-44 py-4 bg-zinc-700 gap-2 mx-2">
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                            <p className="text-tiny uppercase font-bold">{document.name}</p>
                                            <small className="text-default-500">{document.uploadBy}</small>
                                            <p className="text-default-500 text-xs">14/4/2023</p>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2 flex justify-center items-center">
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl"
                                                src="https://static.vecteezy.com/system/resources/previews/023/234/824/original/pdf-icon-red-and-white-color-for-free-png.png"
                                                width={70}
                                                height={70}
                                            />
                                        </CardBody>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* Notes */}
                <div className="w-full flex-col max-w-screen-lg mt-8">
                    <span className="text-start opacity-85 py-4 block">Notes</span>
                    <div className="flex overflow-auto w-full ">
                    <Swiper
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
                    </Swiper>
                    </div>
                </div>
                

                {/* Images */}

                <div className="w-full flex-col max-w-screen-lg mt-8">
                <span className="text-start opacity-85 py-4 block">Images</span>
                    <div className="flex overflow-auto w-full ">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                            spaceBetween={20}
                            slidesPerView='auto'
                            navigation
                            mousewheel
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            >
                            

                            {dataImages.map((image, index) => (
                                <SwiperSlide key={index} className="w-44" style={{ width: '11rem !important'}}>
                                    <Card className="flex-shrink-0 w-44 bg-zinc-700 gap-2 mx-2">
                                        <CardBody className="overflow-visible flex justify-center items-center p-0">
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl"
                                                src={image.link}
                                                height={140}
                                            />
                                        </CardBody>
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start py-2">
                                            <p className="text-tiny uppercase font-bold">{image.name}</p>
                                            <small className="text-default-500">{image.document}</small>
                                            <p className="text-default-500 text-xs">14/4/2023</p>
                                        </CardHeader>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                {/* Tables */}
                <div className="w-full flex-col max-w-screen-lg mt-8">
                <span className="text-start opacity-85 py-4 block">Tables</span>

                <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                        spaceBetween={20}
                        slidesPerView={1}
                        scrollbar
                        mousewheel
                    >
                    {tableDatas.map((table, index) => (
                        table.length > 0 && (
                            <SwiperSlide key={index}  className="w-44 min-h-600px overflow-auto" style={{ width: '11rem !important'}}>
                                <Table key={index} aria-label="Static collection table" className="h-96 overflow-auto select-none">
                                    <TableHeader>
                                        {table[0].map((header, index) => (
                                            <TableColumn key={index}>{header}</TableColumn>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.slice(1).map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <TableCell key={cellIndex}>{cell}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </SwiperSlide>
                            )
                        ))}
                    </Swiper>
                </div>

        {/* Images */}
                    
        <div className="w-full flex-col max-w-screen-xl mt-8">
        <span className="text-start opacity-85 py-4 block">Images</span>


        </div>
                
            </div>

        </div>
    )
}
export default WorkSpace