import React from "react";
import SidebarDocument from "./SidebarDocument";
import NavbarDocument from "./NavbarDocument";
import TextInteraction from "./TextInteraction";
import Chatbot from "./Chatbot";

const Document: React.FC = () => {
    return (
        <div className="flex">
            <div>
                <SidebarDocument /> 
            </div>
            <div className="flex flex-col">
                <NavbarDocument />
                <div className="flex border-box">
                    <TextInteraction />
                    <Chatbot />
                </div>
            </div>
        </div>
    )
}

export default Document