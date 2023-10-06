import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiChat } from "react-icons/hi"
import { 
    HiArrowLeftOnRectangle,
    HiUsers 
} from "react-icons/hi2"
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation()
    const router = useRouter()

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId,
            onClick: () => router.refresh()
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users',
            onClick: () => router.refresh()
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, conversationId])

    return routes
}

export default useRoutes