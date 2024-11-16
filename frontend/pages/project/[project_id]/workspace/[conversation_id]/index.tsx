import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Lấy project_id từ URL
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import PreLoader from "@/public/img/PreLoader.gif";
import Head from 'next/head';


import { Conversation, Project } from "@/src/types/types";
import { getConversationInProject, getProjectById } from "@/service/projectApi";
import UserDropdown from "@/components/global/UserDropdown";

import SidebarWorkspace from "./SidebarWorkSpace";
import ChatWindow from "./ChatWindow";

const WorkSpace: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [conversationName, setConversationName] = useState<string>("");
  const router = useRouter();
  const { project_id, conversation_id } = router.query; // Lấy project_id từ URL
  const [projectInfo, setProjectInfo] = useState<Project>();

  const handleGetConversation = async () => {
    try {
      const data = await getConversationInProject(project_id as string);

      setConversations(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRouterToProject = (project: Project) => {
    router.push(`/project/${project.project_id}`);
  };

  const handleGetProjectById = async () => {
    try {
      const data = await getProjectById(project_id as string);

      setProjectInfo(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleBackHome = () => {
    router.push("/home");
  };

  useEffect(() => {
    if (project_id !== undefined) {
      Promise.all([
        handleGetConversation(),
        handleGetProjectById()
      ])
        .then(() => setIsLoading(false))
        .catch((err) => console.error(err))
    }
  }, [project_id]);

  const handleSelectConversation = (conv: Conversation) => {
    router.push(`/project/${project_id}/workspace/${conv.conversation_id}`);
    setConversationName(conv.conversation_name);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black dark:invert-0 invert">
        <Image alt="Loading..." height={300} src={PreLoader} width={300} />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Head>
        <title>{conversationName}</title>
      </Head>
      <SidebarWorkspace
        conversations={conversations}
        updatedConversations={handleGetConversation}
        onSelectConversation={handleSelectConversation}
      />
      <div className="flex-1 flex flex-col relative">
        <div className="z-[5] absolute top-0 w-full h-11 bg-zinc-100 dark:bg-zinc-800" />
        <div className="absolute top-2 left-6 z-10">
          <Breadcrumbs>
            <BreadcrumbItem onClick={handleBackHome}>
              <HomeIcon className="w-4 h-4" />
            </BreadcrumbItem>
            <BreadcrumbItem
              onClick={() => handleRouterToProject(projectInfo as Project)}
            >
              {projectInfo?.name}
            </BreadcrumbItem>
            <BreadcrumbItem>{conversationName}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="absolute top-2 right-6">
          <UserDropdown />
        </div>
        <ChatWindow
          conversation_id={conversation_id as string}
          isDocument={false}
          project_id={project_id as string}
        />
      </div>
    </div>
  );
};

export default WorkSpace;
