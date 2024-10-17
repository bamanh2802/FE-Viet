import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input } from "@nextui-org/react";
import { PlusIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { useRouter } from 'next/router';
import UserDropdown from "./UserDropdown";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "@/src/types/types";
import '@/components/project/config.css'
import { createProject } from "@/service/apis";
import { VisuallyHidden } from "@nextui-org/react";
import { Loader2 } from "lucide-react"

interface NavbarHomeProps {
  user: User
  updatedProject: () => void
}

const NavbarHome: React.FC<NavbarHomeProps> = ({user, updatedProject}) => {
  const router = useRouter();
  const [isNewProject, setIsNewProject] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>()

  const handleToggleNewProject = () => {
    setIsNewProject(!isNewProject);
  };

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsLoadingCreate(true);

    try {
      const data = await createProject(projectName as string);
      updatedProject();
      router.push(`/project/${data.data.project_id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCreate(false);
    }
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
          <Button className="dark:bg-zinc-900 bg-zinc-50" onClick={handleToggleNewProject} variant="outline">
            New Project
            <PlusIcon />
          </Button>
        </NavbarItem>
        <UserDropdown
        />
      </NavbarContent>

      <Dialog open={isNewProject} onOpenChange={handleToggleNewProject}>
        <DialogContent className="bg-zinc-50 dark:bg-zinc-900 border-none">
          {/* Use DialogTitle and DialogDescription */}
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Create your new project in one-click.</DialogDescription>

          <form id="create-project-form" onSubmit={handleCreateProject}>
            <div className="grid w-full items-center gap-4 mt-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name">Name</label>
                <Input
                  className="rounded-md border-1 border-gray-400"
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  id="name"
                  placeholder="Name of your project"
                />
              </div>
            </div>
          </form>

          {/* Footer for the Dialog with buttons */}
          <div className="flex justify-between mt-6">
            <Button className="bg-zinc-800"  onClick={handleToggleNewProject}>
              Cancel
            </Button>
            <Button className="bg-zinc-800" disabled={isLoadingCreate} form="create-project-form" type="submit">
              {isLoadingCreate && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </Navbar>
  );
}

export default NavbarHome