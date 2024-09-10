import React from "react";
import {Tabs, Tab, Card, CardBody, Switch} from "@nextui-org/react";

export default function SidebarDocument() {
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col h-screen ">
        <Tabs aria-label="Options" isVertical={true} className="bg-zinc-800 h-screen">
          <Tab key="chunks" title="Chunks" className="bg-zinc-800 ">
            <Card  className="w-60 bg-zinc-800">
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="tables" title="Tables"  className="bg-zinc-800">
            <Card  className="w-60 bg-zinc-800">
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="images" title="Images"  className="bg-zinc-800">
            <Card  className="w-60 bg-zinc-800">
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>  
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
