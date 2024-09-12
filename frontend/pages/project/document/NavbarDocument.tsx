import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import '../../../components/project/config.css'


export default function NavbarDocument() {
  return (
    <Navbar isBordered className="bg-zinc-800 navbar-custom mx-1 rounded-b-md" style={{width: 'calc(100% - 8px)'}}>
      <NavbarBrand>
        <p className="font-bold text-inherit">Document Name</p>
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
