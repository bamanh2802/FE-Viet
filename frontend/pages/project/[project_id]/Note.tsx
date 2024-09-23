import NoteNavbar from "@/components/project/NoteNavbar";
import NoteInput from "@/components/project/NoteInput";

const Note = () => {

    return (
        <div className="relative overflow-auto flex flex-col justify-center bg-zinc-900 rounded-t-md mt-1 ml-1">
            <NoteNavbar title="Workspace Name / Note name" lastModified="hôm qua" />
            <div 
            style={{ height: 'calc(100vh - 98px)'}}
            className="w-full overflow-auto">
                <NoteInput />
            </div>
        </div>
    )

}

export default Note