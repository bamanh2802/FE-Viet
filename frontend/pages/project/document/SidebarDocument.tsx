import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon, Bars3BottomLeftIcon, PhotoIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SidebarDocument() {
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(true);
  const [itemSelected, setItemSelected] = useState<Object>( {
    id: 2,
    tableName: "Product List",
    markdownContent: `
| Product Name  | Price | Quantity |
| ------------- | ----- | -------- |
| Laptop        | $999  | 20       |
| Smartphone    | $699  | 50       |
| Tablet        | $399  | 30       |
`
  });
  const dataChunks = [
    {
      chunkId: '1',
      content: 'đoạn văn thứ nhất'
    },
    {
      chunkId: '2',
      content: 'đoạn văn thứ hai'
    },
    {
      chunkId: '3',
      content: 'đoạn văn thứ ba'
    },
    {
      chunkId: '4',
      content: 'đoạn văn thứ tư'
    },
  ]

  const dataTables = [
    {
      id: 1,
      tableName: "User Information",
      markdownContent: `
  | Name          | Age  | Email                |
  | ------------- | ---- | -------------------- |
  | John Doe      | 28   | john.doe@example.com |
  | Jane Smith    | 34   | jane.smith@example.com |
  | Bob Johnson   | 45   | bob.johnson@example.com |
  `
    },
    {
      id: 2,
      tableName: "Product List",
      markdownContent: `
  | Product Name  | Price | Quantity |
  | ------------- | ----- | -------- |
  | Laptop        | $999  | 20       |
  | Smartphone    | $699  | 50       |
  | Tablet        | $399  | 30       |
  `
    },
    {
      id: 3,
      tableName: "Project Deadlines",
      markdownContent: `
  | Project Name      | Deadline   | Status  |
  | ----------------- | ---------- | ------- |
  | Website Redesign  | 2024-09-20 | Ongoing |
  | Mobile App Launch | 2024-10-15 | Pending |
  | Marketing Campaign| 2024-08-30 | Completed |
  `
    }
  ];
  


  const ToggleDetail = () => {
    setIsOpenDetail(!isOpenDetail);
  };

  const OpenDetail = () => {
    if (!isOpenDetail) {
      setIsOpenDetail(true);
    }
  };

  const handleSelectedObject = () => {
    setItemSelected(
      {
        id: 3,
        tableName: "Project Deadlines",
        markdownContent: `
    | Project Name      | Deadline   | Status  |
    | ----------------- | ---------- | ------- |
    | Website Redesign  | 2024-09-20 | Ongoing |
    | Mobile App Launch | 2024-10-15 | Pending |
    | Marketing Campaign| 2024-08-30 | Completed |
    `
      }
    )
  }

  const handleTabChange = (key: string | number) => {
    OpenDetail();
  };

  return (
    <Dialog>

    <div className="flex flex-col">
      <div className="flex w-full flex-col h-screen relative group">
        {/* Sử dụng onSelectionChange thay cho onMouseDown */}
        <Tabs
          aria-label="Options"
          isVertical={true}
          className="bg-zinc-800 h-screen py-6"
          onSelectionChange={handleTabChange}
        >
         <Tab
          key="chunks"
          title={isOpenDetail ? "Chunks" : <Bars3BottomLeftIcon className="h-5 w-5" />}
          className={`${isOpenDetail ? "py-6" : ""} bg-zinc-800 py-6 transition ease-in-out`}
        >
          {isOpenDetail && (
            <div className="grid grid-cols-1 gap-4" style={{width: '240px'}}> {/* Dùng grid hoặc flex để sắp xếp các Card */}
              {dataChunks && dataChunks.map((data, index) => (
                <Card key={index} className="bg-zinc-800 transition ease-in-out w-60">
                  <CardBody>
                    {data.content}
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </Tab>

          <Tab key="tables" title={isOpenDetail ? "Tables" : <TableCellsIcon className="h-5 w-5" />} className={`${isOpenDetail ? "py-6" : ""} bg-zinc-800 py-6 transition ease-in-out`}>
              {isOpenDetail && (
                <div className="grid grid-cols-1 gap-4" style={{width: '240px'}}> {/* Dùng grid hoặc flex để sắp xếp các Card */}
                {dataTables && dataTables.map((data, index) => (
                  <Card key={index} className="bg-zinc-800 transition ease-in-out w-60">
                    <DialogTrigger asChild>
                    <CardBody onMouseDown={() => {handleSelectedObject()}}>
                      {data.tableName} {/* Nội dung từng card */}
                    </CardBody>
                  </DialogTrigger>
                  </Card>
                ))}
              </div>
              )}
          </Tab>
          <Tab key="images" title={isOpenDetail ? "Images" : <PhotoIcon className="h-5 w-5" />} className={`${isOpenDetail ? "py-6" : ""} bg-zinc-800 py-6 transition ease-in-out`}>
              {isOpenDetail && (
            <Card className={`${isOpenDetail ? "w-60" : "w-0"} bg-zinc-800 transition ease-in-out`}>
                <CardBody>
                  Lorem ipsum dolor si sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
            </Card>
              )}
          </Tab>
        </Tabs>
        <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <ChevronLeftIcon
            className={`${isOpenDetail ? "" : "rotate-180"} h-5 w-5 bg-zinc-700 rounded-full transition ease-in-out opacity-85`}
            onMouseDown={ToggleDetail}
          />
        </div>
      </div>
    </div>
    <DialogContent className="sm:max-w-[425px] bg-gray-950">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {itemSelected.tableName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
              Name
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              Username
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
