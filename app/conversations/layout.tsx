import getCoversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/users_components/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {

    const conversations = await getCoversations()
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
                    <ConversationList 
                        users={users}
                        initialItems={conversations} 
                    />
                    {children}
                </div>
            </Sidebar>
        </div>
    )
}