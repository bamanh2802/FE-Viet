import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import SidebarHome from "@/components/global/SidebarHome";
import NavbarHome from "@/components/global/NavbarHome";
import HomeMain from "@/components/global/MainHome";
import { RootState } from "@/src/store";
import { getAllProjects } from "@/service/apis";
import { setProjects } from "@/src/projectsSlice";

type Project = {
    project_id: string;
    name: string;
    created_at: string;
    updated_at: string;
};

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.projects.projects);

    useEffect(() => {
        // Gọi API để lấy danh sách dự án
        handleGetProjects();
    }, []);

    const handleGetProjects = async () => {
        try {
            const data = await getAllProjects();
            console.log(data);
            dispatch(setProjects(data.data)); // Cập nhật Redux state
        } catch (e) {
            console.log(e);
        }
    };

    const handleProjectsUpdate = (updatedProjects: Project[]) => {
        dispatch(setProjects(updatedProjects)); // Cập nhật Redux state với danh sách dự án mới
    };

    return (
        <div className="flex">
            <SidebarHome projects={projects} />
            <div className="flex flex-col w-full">
                <NavbarHome />
                <HomeMain projects={projects} onProjectsUpdate={handleProjectsUpdate} />
            </div>
        </div>
    );
};

export default Home;
