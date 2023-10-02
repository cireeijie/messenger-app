import Sidebar from "../components/users_components/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode
}) {
    const users = await getUsers()

    return (
        <div className="bg-radial h-full">
            <Sidebar>
                <div 
                    className="
                        flex
                        flex-1
                    "
                >
                    <UserList items={users} />
                    {children}
                </div>
            </Sidebar>
        </div>
    )
}