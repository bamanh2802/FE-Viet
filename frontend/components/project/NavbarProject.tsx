import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import '../project/config.css'
export default function NavbarProject() {
  return (
    <Navbar className="navbar-custom h-14 rounded-b-md bg-zinc-800 max-w-none mx-1 box-border"
    style={{ width: 'calc(100% - 8px)' }}>
      <NavbarBrand>
        <p className="font-bold text-inherit">Project Name</p>
      </NavbarBrand>



      <NavbarContent as="div" justify="end" className="max-w-none">
      <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Share
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

