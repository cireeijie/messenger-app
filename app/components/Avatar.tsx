'use client'

import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { IoPersonCircleOutline } from 'react-icons/io5'
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    const {
        members
    } = useActiveList()
    const isActive = members.indexOf(user?.email!) !== -1;

    return (
        <div className="relative w-10 h-10">
            <div 
                className={clsx(`
                    relative
                    rounded-full
                    overflow-hidden
                    text-white
                    text-2xl
                    cursor-pointer`,
                    user?.image && 'h-[40px] w-[40px]'
                    )}
            >
                {
                    user?.image ?
                    <Image 
                        alt=""
                        src={user?.image}
                        width='40'
                        height='40'
                    />
                    :
                    <IoPersonCircleOutline size={40}/>
                }
            </div>
            {isActive && (
                <span 
                    className="
                        absolute
                        block
                        rounded-full
                        bg-green-500
                        ring-1
                        ring-white
                        top-1
                        right-1
                        h-2
                        w-2
                    "
                />
            )
            }
            
        </div>
    );
}
 
export default Avatar;