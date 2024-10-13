import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import SidebarHome from "@/components/global/SidebarHome";
import NavbarHome from "@/components/global/NavbarHome";
import HomeMain from "@/components/global/MainHome";
import { RootState } from "@/src/store";
import { getAllProjects, getUser, getAllProjectsWithInfo, refreshToken } from "@/service/apis";
import { setProjects } from "@/src/projectsSlice";
import { Project, User } from "@/src/types/types";


const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const projects = useSelector((state: RootState) => state.projects.projects);

    useEffect(() => {
        // Gọi API để lấy danh sách dự án
        handleGetProjects();
    }, []);



    const handleGetProjects = async () => {
        try {
            const data = await getAllProjectsWithInfo();
            dispatch(setProjects(data.data)); 
        } catch (e) {
            if (e.response && e.response.status === 403) {
                try {
                    await refreshToken();
    
                    const data = await getAllProjectsWithInfo();
                    
                    dispatch(setProjects(data.data));
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                }
            } else {
                console.error('Error fetching projects:', e);
            }
        }
    };

    const handleProjectsUpdate = (updatedProjects: Project[]) => {
        dispatch(setProjects(updatedProjects));
    };

    return (
        <div className="flex">
            <SidebarHome projects={projects} />
            <div className="flex flex-col w-full">
                <NavbarHome user={user}/>
                <HomeMain userName={`${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()}  projects={projects} onProjectsUpdate={handleProjectsUpdate} />
            </div>
        </div>
    );
};

export default Home;
