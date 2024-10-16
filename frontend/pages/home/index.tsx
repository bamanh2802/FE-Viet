import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import SidebarHome from "@/components/global/SidebarHome";
import NavbarHome from "@/components/global/NavbarHome";
import HomeMain from "@/components/global/MainHome";
import { RootState } from "@/src/store";
import { getAllProjectsWithInfo, refreshToken, getAllDocumentByUser, getAllConversationByUser } from "@/service/apis";
import { setProjects } from "@/src/projectsSlice";
import { Project, User, Document, Conversation } from "@/src/types/types";


const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const projects = useSelector((state: RootState) => state.projects.projects);
    const [documents, setDocuments] = useState<Document[]>([])
    const [conversations, setConversations] = useState<Conversation[]>([])

    useEffect(() => {
        // Gọi API để lấy danh sách dự án
        handleGetProjects();
        handleGetConversations()
        handleGetDocuments()
    }, []);

    const handleGetDocuments = async () => {
        try {
            const data = await getAllDocumentByUser()
            setDocuments(data.data)
            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    const handleGetConversations = async () => {
        try {
            const data = await getAllConversationByUser()
            setConversations(data.data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleGetProjects = async () => {
        try {
            const data = await getAllProjectsWithInfo();
            dispatch(setProjects(data.data)); 
        } catch (e) {
           console.log(e)
        }
    };

    const handleProjectsUpdate = (updatedProjects: Project[]) => {
        dispatch(setProjects(updatedProjects));
    };

    return (
        <div className="flex">
            <SidebarHome projects={projects} documents={documents} conversations={conversations}/>
            <div className="flex flex-col w-full">
                <NavbarHome 
                updatedProject={handleGetProjects}
                user={user}/>
                <HomeMain userName={`${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()}  projects={projects} onProjectsUpdate={handleProjectsUpdate} />
            </div>
        </div>
    );
};

export default Home;
