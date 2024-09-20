import React, { useState, useEffect, useRef } from "react";
import NavbarHome from "@/components/global/NavbarHome";
import "../../components/project/config.css";
import { useRouter } from 'next/router';
import { Card, CardBody, Tabs, Tab, Listbox, ListboxItem, cn, Button, Input } from "@nextui-org/react";
import { ListboxWrapper } from "@/components/ListboxWrapper";
import { DeleteDocumentIcon } from '@/components/icon/DeleteDocumentIcon';
import { EditDocumentIcon } from '@/components/icon/EditDocumentIcon';
import { format } from 'date-fns';
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

type Project = {
    project_id: string;
    name: string;
    created_at: string;
    updated_at: string;
};

const Home = () => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([]);
    const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null); // Tạo ref cho dropdown
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [projects, setProjects] = useState<Project[]>([]);
    const [isOpenRename, setIsOpenRename] = useState<boolean>(false);
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Thông tin dự án được chọn

    // Toggle dropdown menu on right-click (context menu)
    const toggleDropdown = (index: number, x: number, y: number) => {
        const updatedState = [...isDropdownOpen];
        updatedState[index] = !isDropdownOpen[index];
        setIsDropdownOpen(updatedState);
        setDropdownPosition({ x, y });
    };

    // Handle right-click (context menu) event
    const handleContextMenu = (event: React.MouseEvent, index: number, project: Project) => {
        event.preventDefault(); // Prevent default context menu
        toggleDropdown(index, event.clientX, event.clientY); // Open dropdown at mouse click position
        setSelectedProject(project); // Set selected project for editing
    };

    const dataProject = [
        {
            "project_id": "proj-3ca65cfd-92d0-4384-99c1-995f612e388d",
            "name": "admin-project",
            "created_at": "2024-09-15T07:35:30",
            "updated_at": "2024-09-15T07:35:30"
        }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen([]); // Đóng tất cả các dropdown
                setDropdownPosition(null)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const formatDate = (dateString: string) => {
        // Convert date string to Date object
        const date = new Date(dateString);
        // Format date to "M/d/yyyy"
        return format(date, 'M/d/yyyy');
    };

    useEffect(() => {
        // Gọi api
        handleGetProjects();
    }, []);

    const handleToggleRename = () => {
        setIsOpenRename(!isOpenRename);
    };
    const handleToggleDelete = () => {
        setIsOpenDelete(!isOpenDelete);
    };

    const handleGetProjects = async () => {
        setProjects(dataProject);
    };

    const handleSaveChanges = () => {
        // Logic để lưu thay đổi cho dự án
        console.log("Project updated:", selectedProject);
        setIsOpenRename(false);
    };

    const handleProjectClick = (projectId: string) => {
        router.push(`/project/${projectId}`);
      };

    return (
        <div>
            <NavbarHome />
            <section className="flex w-full justify-center bg-zinc-800" style={{ height: 'calc(100vh - 56px)' }}>
                <div className="flex w-full flex-col mt-4 max-w-5xl">
                    <Tabs aria-label="Options">
                        <Tab key="all" title="Tất cả">
                            <Card className="bg-opacity-0 border-none shadow-none">
                                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {projects.map((project, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleProjectClick(project.project_id)}
                                            className=" cursor-pointer relative bg-zinc-700 text-white rounded-lg shadow-md p-4"
                                            onContextMenu={(e) => handleContextMenu(e, index, project)} // Capture right-click event
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex justify-center items-center">
                                                        <svg
                                                            className="w-5 h-5 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H4z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <h2 className="text-lg font-semibold">{project.name}</h2>
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                <p>{formatDate(project.updated_at)} · 4 tài liệu</p>
                                            </div>

                                            {/* Dropdown menu */}
                                           
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Tab>

                        {/* Các tab khác */}
                    </Tabs>
                </div>
                {dropdownPosition && (
                    <div
                        ref={dropdownRef} // Đặt ref cho dropdown
                        className="fixed z-50 rounded-lg shadow-lg bg-zinc-800 text-white"
                        style={{
                            top: dropdownPosition.y,
                            left: dropdownPosition.x,
                        }}
                    >
                        <ListboxWrapper>
                            <Listbox variant="faded" aria-label="Listbox menu with icons">
                                <ListboxItem
                                    key="edit"
                                    onClick={() => handleToggleRename()}
                                    startContent={<EditDocumentIcon className={iconClasses} />}
                                >
                                    Edit Project
                                </ListboxItem>
                                <ListboxItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    onClick={() => handleToggleDelete()}
                                    startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                                >
                                    Delete Project
                                </ListboxItem>
                            </Listbox>
                        </ListboxWrapper>
                    </div>
                )}
            </section>

            <Dialog open={isOpenRename} onOpenChange={handleToggleRename}>
                <DialogContent className="bg-zinc-800 border-none">
                        <DialogTitle >Edit Project</DialogTitle>
                    <CardHeader>
                        <CardDescription>Edit the details of your project.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="projectName">Name</label>
                                    <Input
                                        className="rounded-md border-1 border-gray-400"
                                        required
                                        id="projectName"
                                        placeholder="Name of your project"
                                        value={selectedProject?.name || ''}
                                        onChange={(e) => setSelectedProject(prev => prev ? { ...prev, name: e.target.value } : null)}
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="bordered" onClick={() => handleToggleRename()}>Cancel</Button>
                        <Button onClick={handleSaveChanges}>Save</Button>
                    </CardFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isOpenDelete} onOpenChange={handleToggleDelete}>
                <AlertDialogContent className="bg-zinc-800 border-none">
                    <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center">
                        <ExclamationCircleIcon className="w-6 h-6 mr-2"/>
                        Do you really want to delete {selectedProject?.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Project cannot be restored.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <Button onClick={() => handleToggleDelete()}>Cancel</Button>
                    <Button color="danger">Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Home;
