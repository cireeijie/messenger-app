'use client'

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
    initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems
}) => {
    const [ items, setItems ] = useState(initialItems)

    const router = useRouter()

    const {
        conversationId,
        isOpen
    } = useConversation()

    return (
        <div
            className={clsx(`
                h-full
                bg-onyx
                bg-opacity-50
                backdrop-blur-md
                p-4
                flex
                flex-col
                w-full
                min-w-[200px]
                max-w-[300px]
            `,
                // isOpen ? 'hidden': 'flex'
            )}
        >
            <div className="flex justify-between items-center p-2">
                <h1 className="text-white ">Messages</h1>
                <span className="text-white cursor-pointer bg-white bg-opacity-20 p-2 rounded-full hover:opacity-75">
                    <MdOutlineGroupAdd size={18}/>
                </span>
            </div>
            {
                items.map(item => (
                    <ConversationBox 
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                    />
                ))
            }
        </div>
    );
}
 
export default ConversationList;