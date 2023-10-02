import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";

export default async function Sidebar({ 
    children 
} : {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()
    return (
        <div className="flex h-full">
            <DesktopSidebar currentUser={currentUser!} />
            <main className="flex flex-1">
                {children}
            </main>
        </div>
    )
}