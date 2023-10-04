import getCoversations from "../actions/getConversations";
import Sidebar from "../components/users_components/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {

    const conversations = await getCoversations()

    return (
        <div className="bg-radial h-full">
            <Sidebar>
                <div 
                    className="
                        flex
                        flex-1
                    "
                >
                    <ConversationList initialItems={conversations} />
                    {children}
                </div>
            </Sidebar>
        </div>
    )
}