import React, { useState } from "react";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Input } from "@nextui-org/react";
import { PlusIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import UserDropdown from "./UserDropdown";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "@/src/types/types";
import '@/components/project/config.css'

interface NavbarHomeProps {
  user: User
}

const NavbarHome: React.FC<NavbarHomeProps> = ({user}) => {
  const router = useRouter();
  const [isNewProject, setIsNewProject] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);

  const handleToggleNewProject = () => {
    setIsNewProject(!isNewProject);
  };

  const handleCreateProject = async () => {
    setIsLoadingCreate(true);
    // handle project creation logic...
    setIsLoadingCreate(false);
  };

  return (
    <Navbar isBordered className="navbar-custom dark:bg-zinc-900 bg-zinc-50 h-14">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <HomeIcon className="w-5 h-5 dark:text-slate-600 text-gray-900" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <NavbarItem>
          <Button onClick={handleToggleNewProject} color="primary" variant="ghost">
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
          type="search"
        />

        <UserDropdown
        />
      </NavbarContent>

      <Dialog open={isNewProject} onOpenChange={handleToggleNewProject}>
        <DialogContent className="bg-zinc-200 dark:bg-zinc-900 border-none">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Create your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="name">Name</label>
                  <Input
                    className="rounded-md border-1 border-gray-400"
                    onChange={(e) => (setIsNewProject(e.target.value))}
                    required
                    id="name"
                    placeholder="Name of your project"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="bordered">Cancel</Button>
            <Button isLoading={isLoadingCreate} onClick={handleCreateProject}>
              Create
            </Button>
          </CardFooter>
        </DialogContent>
      </Dialog>
    </Navbar>
  );
}

export default NavbarHome