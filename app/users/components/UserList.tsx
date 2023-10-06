'use client'

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserListProps {
    items: User[]
}

const UserList: React.FC<UserListProps> = ({
    items
}) => {
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [items, router])

    return (
        <div 
            className="
                h-full
                bg-onyx
                bg-opacity-50
                backdrop-blur-md
                p-4
                flex
                flex-col
                w-full
                min-w-[200px]
                lg:max-w-[300px]
            "
        >
            <div>
                <h1 className="text-white p-2">People</h1>
            </div>
            {
                items.map((item) => (
                    <UserBox 
                        key={item.id}
                        data={item}
                    />
                ))
            }
        </div>
    );
}
 
export default UserList;