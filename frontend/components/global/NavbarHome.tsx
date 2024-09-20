import React, {useState} from "react";
import {Button, 
    ButtonGroup, 
    Navbar, 
    NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { MagnifyingGlassCircleIcon, PlusIcon,
    
 } from "@heroicons/react/24/outline";
 import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import '../project/config.css'
import UserAvatar from '../../public/avatar.jpg'

export default function NavbarHome() {
  const [isNewProject, setIsNewProject] = useState<boolean>(false)
  const handleToggleNewProject = () => {
    setIsNewProject(!isNewProject)
    console.log('hello')
  }

  return (
    <Navbar isBordered className="navbar-custom bg-zinc-900 h-14">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">VIET</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
      <NavbarItem>
            <Button
            onClick={() => (handleToggleNewProject())}
            color="primary" variant="ghost">
                New Project
                <PlusIcon />
            </Button> 
          </NavbarItem>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
        //   startContent={<MagnifyingGlassCircleIcon  />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/458197052_1236440294376177_6824711196797531216_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=iiV5NdYpcQoQ7kNvgHfMbLi&_nc_ht=scontent.fhan14-3.fna&oh=03_Q7cD1QFQOyEG2hWyk7qxQLsWicGk13o2kUO7XyQIJVZQzSbZAw&oe=67026137"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <Dialog open={isNewProject} onOpenChange={handleToggleNewProject}>
        <DialogContent className=" bg-zinc-800 border-none">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Create your new project in one-click.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="">Name</label>
                      <Input className="rounded-md border-1 border-gray-400" required id="name" placeholder="Name of your project" />
                    </div>
                    
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="bordered">Cancel</Button>
                <Button>Create</Button>
              </CardFooter>
        </DialogContent>
      </Dialog>
    </Navbar>
  );
}
