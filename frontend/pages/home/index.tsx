import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import SidebarHome from "@/components/global/SidebarHome";
import NavbarHome from "@/components/global/NavbarHome";
import HomeMain from "@/components/global/MainHome";
import { RootState } from "@/src/store";
import { getAllProjects, getUser } from "@/service/apis";
import { setProjects } from "@/src/projectsSlice";
import { Project, User } from "@/src/types/types";


const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [user, setUser] = useState<User | undefined>(undefined);
    const projects = useSelector((state: RootState) => state.projects.projects);

    useEffect(() => {
        // Gọi API để lấy danh sách dự án
        handleGetProjects();
        handleGetUser()
    }, []);

    const handleGetUser = async () => {
        try {
            const data = await getUser()
            setUser(data.data.msg)
            console.log(data)
        } catch(e){
            console.log(e)
        }
    }

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
                <NavbarHome user={user}/>
                <HomeMain userName={`${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()}  projects={projects} onProjectsUpdate={handleProjectsUpdate} />
            </div>
        </div>
    );
};

export default Home;
