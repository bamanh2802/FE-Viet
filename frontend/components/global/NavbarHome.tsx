import React, { useState } from "react";
import { useRouter } from "next/router";

// NextUI imports
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";


// Heroicons imports
import { PlusIcon, HomeIcon } from "@heroicons/react/24/outline";

// Lucide imports
import { Loader2 } from 'lucide-react';

// Component imports
import UserDropdown from "./UserDropdown";

// Service imports
import { createProject } from "@/service/apis";

// Type imports
import { User } from "@/src/types/types";

interface NavbarHomeProps {
  user: User;
  updatedProject: () => void;
}

const NavbarHome: React.FC<NavbarHomeProps> = ({ user, updatedProject }) => {
  const router = useRouter();
  const [isNewProject, setIsNewProject] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");

  const handleToggleNewProject = () => {
    setIsNewProject(!isNewProject);
  };

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingCreate(true);

    try {
      const data = await createProject(projectName);
      updatedProject();
      router.push(`/project/${data.data.project_id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCreate(false);
      setIsNewProject(false);
    }
  };

  return (
    <Navbar
      isBordered
      className="navbar-custom dark:bg-zinc-900 bg-zinc-50 h-14"
    >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <HomeIcon className="w-5 h-5 dark:text-slate-600 text-gray-900" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <NavbarItem>
          <Button
            className="dark:bg-zinc-900 bg-zinc-50"
            variant="ghost"
            onClick={handleToggleNewProject}
          >
            <PlusIcon className="w-5 h-5" />
            New Project
          </Button>
        </NavbarItem>
        <UserDropdown />
      </NavbarContent>

      <Modal 
        isOpen={isNewProject} 
        onClose={handleToggleNewProject}
        classNames={{
          base: "dark:bg-zinc-900 bg-zinc-50",
          header: "border-b border-gray-200 dark:border-gray-700",
          body: "py-6",
          footer: "border-t border-gray-200 dark:border-gray-700"
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create Project
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-500 dark:text-gray-400">
              Create your new project in one-click.
            </p>
            <form id="create-project-form" onSubmit={handleCreateProject}>
              <div className="grid w-full items-center gap-4 mt-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    label="Name"
                    required
                    placeholder="Name of your project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onClick={handleToggleNewProject}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoadingCreate}
              form="create-project-form"
              type="submit"
              isLoading={isLoadingCreate}
            >

              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Navbar>
  );
};

export default NavbarHome;
