import { FC } from 'react';
import { useRouter } from 'next/router';
import React from "react";
import {Navbar, 
  NavbarBrand,
   NavbarContent, 
   NavbarItem, 
   Link, 
   DropdownItem, 
   DropdownTrigger, 
   Dropdown, 
   DropdownMenu, 
   Avatar,
   Button,
   Breadcrumbs, 
   BreadcrumbItem
  } from "@nextui-org/react";
  import { PlusIcon, UsersIcon } from "lucide-react";
  import { HomeIcon } from '@heroicons/react/24/outline';
import '../project/config.css'
import { useSelector, useDispatch } from "react-redux";


interface NavbarProjectProps {
  onOpenDialog: () => void;
  onOpenShare: () => void;
}
const NavbarProject: FC<NavbarProjectProps> = ({ onOpenDialog, onOpenShare }) => {
  const router = useRouter();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const { project_id } = router.query;
  
  const getProjectNameById = (projectId: string | null) => {
    const project = projects.find(proj => proj.project_id === projectId);

    return project ? project.name : "Loading...";
  };
  
  
  
  return (
    <Navbar className="dark:bg-zinc-900 bg-zinc-50 navbar-custom h-14 max-w-none w-full">
      <NavbarBrand>
        <Breadcrumbs>
        <BreadcrumbItem><HomeIcon className='w-4 h-4'/></BreadcrumbItem>
        <BreadcrumbItem>{getProjectNameById(project_id)}</BreadcrumbItem>
      </Breadcrumbs>
      </NavbarBrand>



      <NavbarContent as="div" justify="end" className="max-w-none">
      <NavbarItem>
          <Link color="foreground" href="#">
          <Button
           size="sm"
          onClick={onOpenDialog}
          color="primary" variant="bordered" startContent={<PlusIcon className="w-5 h-5"/>}>
            New
          </Button>  
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
          <Button
           size="sm"
          onClick={onOpenShare}
          color="primary" variant="bordered" startContent={<UsersIcon className="w-5 h-5"/>}>
            Share
          </Button>  
          </Link>
        </NavbarItem>
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
              <p className="font-semibold">nguyenbamanh2802@gmail.com</p>
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
    </Navbar>
  );
}

export default NavbarProject

