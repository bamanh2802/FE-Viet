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
import UserDropdown from '../global/UserDropdown';


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
    <Navbar className="bg-zinc-200 dark:bg-zinc-800 navbar-custom h-14 max-w-none w-full">
      <NavbarBrand>
        <Breadcrumbs>
        <BreadcrumbItem><HomeIcon className='w-4 h-4'/></BreadcrumbItem>
        <BreadcrumbItem>{getProjectNameById(project_id)}</BreadcrumbItem>
      </Breadcrumbs>
      </NavbarBrand>



      <NavbarContent as="div" justify="end" className="max-w-none">
      <NavbarItem>
          {/* <Button
           size="sm"
          onClick={onOpenDialog}
          color="primary" variant="bordered" startContent={<PlusIcon className="w-5 h-5"/>}>
            New
          </Button>   */}
        </NavbarItem>
        <NavbarItem>
          <Button
           size="sm"
          onClick={onOpenShare}
          color="primary" variant="bordered" startContent={<UsersIcon className="w-5 h-5"/>}>
            Share
          </Button>  
        </NavbarItem>
       <UserDropdown />
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarProject

