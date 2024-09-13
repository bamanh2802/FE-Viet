import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon, Bars3BottomLeftIcon, PhotoIcon, TableCellsIcon } from "@heroicons/react/24/outline";

export default function SidebarDocument() {
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(true);

  const ToggleDetail = () => {
    setIsOpenDetail(!isOpenDetail);
  };

  const OpenDetail = () => {
    if (!isOpenDetail) {
      setIsOpenDetail(true);
    }
  };

  const handleTabChange = (key: string | number) => {
    OpenDetail();
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col h-screen relative group">
        {/* Sử dụng onSelectionChange thay cho onMouseDown */}
        <Tabs
          aria-label="Options"
          isVertical={true}
          className="bg-zinc-800 h-screen py-6"
          onSelectionChange={handleTabChange}
        >
          <Tab key="chunks" title={isOpenDetail ? "Chunks" : <Bars3BottomLeftIcon className="h-5 w-5" />} className={`${isOpenDetail ? "py-6" : ""} bg-zinc-800 py-6 transition ease-in-out`}>
              {isOpenDetail && (
              <Card className={`${isOpenDetail ? "w-60" : "w-0"} bg-zinc-800 transition ease-in-out`}>
                  <CardBody>
                    piscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </CardBody>
              </Card>
              )}
          </Tab>
          <Tab key="tables" title={isOpenDetail ? "Tables" : <TableCellsIcon className="h-5 w-5" />} className={`${isOpenDetail ? "py-6" : ""} bg-zinc-800 py-6 transition ease-in-out`}>
              {isOpenDetail && (
            <Card className={`${isOpenDetail ? "w-60" : "w-0"} bg-zinc-800 transition ease-in-out`}>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </CardBody>
            </Card>
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
  );
}
