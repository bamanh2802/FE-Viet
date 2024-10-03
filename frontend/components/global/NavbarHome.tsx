import React, {useState} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import { useTheme } from "next-themes";
import {Button, 
    ButtonGroup, 
    Navbar, 
    NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,
    Switch
  
  } from "@nextui-org/react";
import { MagnifyingGlassCircleIcon, PlusIcon, HomeIcon
    
 } from "@heroicons/react/24/outline";
 import { createProject, Logout } from "@/service/apis";
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
import { useRouter } from 'next/router';
import useDarkMode from "@/src/hook/useDarkMode";
import { MoonIcon } from "../icon/MoonIcon";
import { SunIcon } from "../icon/SunIcon";

const languages = [
  {key: "Vietnamese", label: "Tiếng Việt"},
  {key: "English", label: "English"},
]

export default function NavbarHome() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const router = useRouter()
  const [isNewProject, setIsNewProject] = useState<boolean>(false)
  const [projectName, setProjectName] = useState<string>('')
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false)
  const handleToggleNewProject = () => {
    setIsNewProject(!isNewProject)
  }

  const handleTheme = () => {
    toggleDarkMode()
    if(isDarkMode) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const handleCreateProject = async () => {
    setIsLoadingCreate(true)
    try {
      const data = await createProject(isNewProject)
      setIsLoadingCreate(false)
      router.push(`/project/${data.data.project_id}`)
      console.log(data)

    } catch (e) {
      setIsLoadingCreate(false)
      console.log(e)
    }
  }

  const handleLogout = async () => {
    try {
      const data = await Logout()
      console.log(data)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      router.push('/')
    } catch (e) {
    console.log(e)
    }
  }

  return (
    <Navbar isBordered className="navbar-custom dark:bg-zinc-900 bg-zinc-50 h-14">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <HomeIcon  className="w-5 h-5 dark:text-slate-600 text-gray-900"/>
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
            inputWrapper: "h-full font-normal text-default-500 bg-default-200/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
        //   startContent={<MagnifyingGlassCircleIcon  />}
          type="search"
        />
        <Switch
          isSelected={!isDarkMode}
          size="sm"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
          onClick={handleTheme}
        >
        </Switch>
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
              
            
            <DropdownItem key="">
            <Select
              isRequired
              defaultSelectedKeys={["Vietnamese"]}
              className="max-w-xs"
            >
              {languages.map((language) => (
                <SelectItem key={language.key}>
                  {language.label}
                </SelectItem>
              ))}
            </Select>
            </DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem 
            onClick={() => handleLogout()}
            key="logout" color="danger">
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
                      <Input 
                      className="rounded-md border-1 border-gray-400" 
                      onChange={(e) => (setIsNewProject(e.target.value))}
                      required id="name" 
                      placeholder="Name of your project" />
                    </div>
                    
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="bordered">Cancel</Button>
                <Button isLoading={isLoadingCreate} onClick={() => handleCreateProject()}>Create</Button>
              </CardFooter>
        </DialogContent>
      </Dialog>
    </Navbar>
  );
}

