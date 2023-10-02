'use client'

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {
    const routes = useRoutes()
    const [ isOpen, setIsOpen ] = useState(false)

    return (  
        <div 
            className="
                h-full
                bg-onyx
                p-4
                flex
                flex-col
                justify-between
            "
        >
            <nav>
                <ul 
                    className="
                        flex
                        flex-col
                        gap-3
                    "   
                >
                    {
                        routes.map((item) => (
                            <DesktopItem 
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                active={item.active}
                                onClick={item.onClick}
                            />
                        ))
                    }
                </ul>
            </nav>
            <nav>
                <div
                    onClick={() => setIsOpen(true)}
                    className="avatar-div"
                >
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </div>
    );
}
 
export default DesktopSidebar;