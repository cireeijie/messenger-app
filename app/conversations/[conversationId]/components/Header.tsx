'use client'

import { useMemo, useState } from "react";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
};

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {
    const otherUser = useOtherUser(conversation)
    const [ drawerOpen, setDrawerOpen ] = useState(false)
    const { members } = useActiveList()
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const statusText = useMemo(() => {
        if(conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return isActive ? 'Active' : 'Offline'
    }, [conversation, isActive])

    return (
        <>
            <ProfileDrawer 
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="flex items-center justify-between p-4 bg-onyx fixed top-0 right-0 left-0 z-50">
                <div className="flex items-center">
                    <Link 
                        href='/conversations'
                        className="text-white flex lg:hidden"
                    >
                        <HiChevronLeft size={28} />
                    </Link>
                    {conversation.isGroup ? (
                        <AvatarGroup users={conversation.users} />
                    ) : (
                        <Avatar user={otherUser} />
                    )}
                    <div className="ml-2 flex flex-col">
                        <div className="text-white text-md">
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-[12px] text-pale">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className={clsx(
                        `text-white cursor-pointer`
                    )}
                />
            </div>
        </>
        
    );
}
 
export default Header;