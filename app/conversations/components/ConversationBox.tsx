'use client'

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()

    const handleClick = useCallback(()=> {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const hasSeen = useMemo(() => {
        if(!lastMessage) {
            return false
        }

        const seenArray = lastMessage.seen || []

        if(!userEmail) {
            return false
        }

        return seenArray
        .filter(user => user.email === userEmail).length !== 0

    }, [userEmail, lastMessage])

    const lastMessageText = useMemo(() => {
        if(lastMessage?.image) {
            return 'Sent an image'
        }

        if(lastMessage?.body) {
            return lastMessage.body
        }

        return "Start a conversation"

    }, [lastMessage])

    return (
        <div
            onClick={handleClick}
            className={clsx(`
                    group
                    flex
                    gap-2
                    items-center
                    cursor-pointer
                    hover:bg-white
                    hover:bg-opacity-25
                    max-w-md
                    p-2
                    rounded-sm
                    ease-in-out
                    duration-300
                `,
                selected && 'bg-white bg-opacity-25'
            )}
        >
            {data.isGroup ? (
                <AvatarGroup users={data.users}/>
            ): (
                <Avatar user={otherUser} />
            )}
            <div className="flex-1">
                <div 
                    className="
                        flex
                        justify-between
                        items-center      
                    "
                >
                    <p className="text-white text-sm">
                        {data.name || otherUser.name}
                    </p>
                    {lastMessage?.createdAt && (
                        <p className="text-[12px] text-pale">
                            {format(new Date(lastMessage.createdAt), 'p')}
                        </p>
                    )}
                </div>
                <div>
                    <p className={clsx(`
                            text-[12px]
                        `,
                        hasSeen ? 'text-pale' : 'text-white font-medium'
                    )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default ConversationBox;