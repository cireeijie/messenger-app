'use client'

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
    users: User[];
    initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    users,
    initialItems
}) => {
    const session = useSession()
    const [ items, setItems ] = useState(initialItems)
    const [ isModalOpen, setIsModalOpen ] = useState(false)

    console.log(users)
    console.log(initialItems)

    const router = useRouter()

    const {
        conversationId,
        isOpen
    } = useConversation()

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        if(!pusherKey) {
            return;
        }
        pusherClient.subscribe(pusherKey)

        const newHandler = (conversation: FullConversationType) => {
            setItems(current => {
                if(find(current, {id:conversation.id})) {
                    return current
                }
                return [conversation, ...current]
            })
        }

        const updateHandler = (conversation: FullConversationType) => {
            setItems(current => current.map(currentConversation => {
                if(currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }

                return currentConversation
            }))
        }

        const removeHandler = (conversation: FullConversationType) => {
            setItems(current => {
                return [...current.filter(convo => convo.id === conversation.id)]
            })

            if(conversationId === conversation.id) {
                router.push('/conversations')
            }
        }

        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unbind(pusherKey)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:remove', removeHandler)
        }
    }, [pusherKey, router, conversationId])

    return (
        <>
            <GroupChatModal 
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div
                className={clsx(`
                    h-full
                    bg-onyx
                    bg-opacity-50
                    backdrop-blur-md
                    p-4
                    lg:flex
                    flex-col
                    w-full
                    min-w-[200px]
                    lg:max-w-[300px]
                `,
                    isOpen ? 'hidden': 'flex'
                )}
            >
                <div className="flex justify-between items-center p-2">
                    <h1 className="text-white ">Messages</h1>
                    <div 
                        onClick={() => setIsModalOpen(true)}
                        className="text-white cursor-pointer bg-white bg-opacity-20 p-2 rounded-full hover:opacity-75"
                    >
                        <MdOutlineGroupAdd size={18}/>
                    </div>
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
        </>
    );
}
 
export default ConversationList;