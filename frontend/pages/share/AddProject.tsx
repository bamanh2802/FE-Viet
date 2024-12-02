import { Listbox, ListboxItem, Button, Selection } from "@nextui-org/react";
import {
  PlusIcon,
  UserIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ListboxWrapper } from "@/components/ListboxWrapper";
import { Project } from "@/src/types/types";
import { getAllProjectsWithInfo } from "@/service/apis";
import React, { useState, useEffect, FC } from "react";

import { useRouter } from "next/router";

interface AddProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProject: FC<AddProjectProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys as Set<string>);
  };

  const handleGetProjects = async () => {
    try {
      const data = await getAllProjectsWithInfo();
      setProjects(data.data);
      setFilteredProjects(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddProject = async () => {
    const selectedDocsArray = Array.from(selectedKeys).filter(key => key !== '');
    console.log(selectedDocsArray)
    // Implement your add project logic here
  };

  // Search functionality
  const handleSearch = (value: string) => {
    setSearchValue(value);
    
    // Filter projects based on search input
    const filtered = projects.filter(project => 
      project.name.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredProjects(filtered);
  };

  useEffect(() => {
    if (filteredProjects !== undefined) {
        const selectedDocsArray = Array.from(selectedKeys).filter(key => key !== '');
      if (
        filteredProjects.length !== 0 &&
        selectedDocsArray.length !== 0
      ) {
        setIsDisable(false);
      } else {
        setIsDisable(true);

      }
    }
  }, [filteredProjects, selectedKeys]);

  useEffect(() => {
    handleGetProjects()
  }, [])
 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[827px] transition-all bg-zinc-50 dark:bg-zinc-900 border-none">
        <DialogTitle>Project List</DialogTitle>

        <div className="mt-4">
          <input
            className="w-full mt-2 p-2 py-1 border border-gray-300 rounded-md"
            placeholder="Search Project"
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="custom-width mt-4">
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="File selection"
              className="max-w-none"
              selectionMode="single"
              variant="flat"
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionChange}
            >
              {filteredProjects?.map((project) => (
                <ListboxItem
                  key={project.project_id}
                  textValue="Add"
                  value={project.project_id}
                >
                <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-1"/>
                  {project.name} 
                </div>
                </ListboxItem>
              ))}
            </Listbox>
          </ListboxWrapper>
        </div>

        <Button
          className="mt-4"
          color="default"
          isDisabled={isDisable}
          isLoading={isLoading}
          startContent={!isLoading && <PlusIcon className="w-5 h-5" />}
          onClick={() => handleAddProject()}
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;