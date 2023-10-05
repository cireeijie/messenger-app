'use client'

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({
    data
}) => {
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false)

    const handleClick = useCallback(() => {
        setIsLoading(true)
        axios.post('/api/conversations', {
            userId: data.id
        })
        .then(data => {
            router.push(`/conversations/${data.data.id}`)
        })
        .finally(() => setIsLoading(false))
    }, [data, router])
 
    return (
        <>  
            {isLoading && (
                <LoadingModal />
            )}
            <div
                onClick={handleClick}
                className="
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
                "
            >
                <Avatar user={data}/>
                <div
                    className="
                        flex
                        gap-2
                    "
                >
                    <div
                        className="
                            text-sm
                            text-white
                        "
                    >
                        {data.name}
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default UserBox;