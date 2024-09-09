import Sidebar from "@/components/project/Sidebar"
import NavbarProject from "@/components/project/NavbarProject"
import WorkSpace from "@/components/project/WorkSpace"

const Project = () => {
    return (
        <div className="flex w-screen box-border">
            <div className="">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full">
                <NavbarProject />
                <WorkSpace />
            </div>
        </div>
    )
}

export default Project