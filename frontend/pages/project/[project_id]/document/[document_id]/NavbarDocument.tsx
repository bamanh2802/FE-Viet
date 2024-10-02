import React from "react";
import {Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button,
  Breadcrumbs, 
  BreadcrumbItem
} from "@nextui-org/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import '@/components/project/config.css'

interface NavbarDocumentProps {
  projectName: string,
  documentName: string
}

const NavbarDocument: React.FC<NavbarDocumentProps> = ({projectName, documentName}) => {
  return (
    <Navbar isBordered className="bg-zinc-800 navbar-custom mx-1 rounded-b-md h-12" style={{width: 'calc(100% - 8px)'}}>
      <NavbarBrand>
      <Breadcrumbs>
      <BreadcrumbItem><HomeIcon className="w-4 h-4"/></BreadcrumbItem>
      <BreadcrumbItem>{projectName}</BreadcrumbItem>
      <BreadcrumbItem>{documentName}</BreadcrumbItem>
    </Breadcrumbs>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="">

        </NavbarItem>
        
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarDocument
