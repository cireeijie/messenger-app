'use client'

import { User } from "@prisma/client";
import Image from "next/image";
import { IoPersonCircleOutline } from 'react-icons/io5'

interface AvatarProps {
    user?: User
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className="relative">
            <div 
                className="
                    relative
                    flex
                    justify-center
                    rounded-full
                    overflow-hidden
                    text-white
                    text-2xl
                    cursor-pointer
                "
            >
                {
                    user?.image ?
                    <Image 
                        alt=""
                        src={user?.image}
                        fill
                    />
                    :
                    <IoPersonCircleOutline size={32}/>
                }
            </div>
            <span 
                className="
                    absolute
                    block
                    rounded-full
                    bg-green-500
                    ring-2
                    ring-white
                    top-0
                    right-0
                    h-2
                    w-2
                "
            />
        </div>
    );
}
 
export default Avatar;