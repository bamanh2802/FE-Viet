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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdownTable } from 'markdown-table';
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
        <div className="flex justify-center bg-zinc-800 rounded-t-md mt-1 ml-1"
        style={{ width: 'calc(100% - 8px)', height: 'calc(100% - 4px)'}}
        >
            <div className="w-full flex flex-col items-center px-12">
                {/* Documents */}
                <div className="w-full flex-col max-w-screen-xl mt-8">
                    <span className="text-start opacity-85 py-4 block">Documents</span>

                    <div className="flex overflow-auto w-full ">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                            spaceBetween={20}
                            slidesPerView='auto'
                            navigation
                            scrollbar
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

                {/* Tables */}
                <div className="w-full flex-col max-w-screen-xl mt-8">
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
            </div>

        </div>
    )
}
export default WorkSpace