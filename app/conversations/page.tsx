'use client'

import clsx from "clsx"

import useConversation from "../hooks/useConversation"
import EmptyState from "../components/EmptyState"

const Home = () => {
    const { isOpen } = useConversation()

    return (
        <div className={clsx(
            'flex-1 p-4 ease-in-out duration-300',
            // isOpen ? 'flex' : 'hidden'
        )}>
            <EmptyState />
        </div>
    )
}

export default Home