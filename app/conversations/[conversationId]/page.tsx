import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams { 
    conversationId: string;
}

const ConversationId = async ({params} : {params: IParams}) => {
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if(!conversation) {
        return (
            <div>
                <div>
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-4">
            <div className="bg-onyx bg-opacity-25 backdrop-blur-lg w-full h-full rounded-lg overflow-hidden flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages}/>
                <Form />
            </div>
        </div>
    )
}

export default ConversationId