import React from "react";
import SidebarDocument from "./SidebarDocument";
import NavbarDocument from "./NavbarDocument";

const Document: React.FC = () => {
    return (
        <div className="flex">
            <SidebarDocument /> 
            <NavbarDocument />
        </div>
    )
}

export default Document