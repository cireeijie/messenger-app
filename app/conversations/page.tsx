'use client'

import clsx from "clsx"

import useConversation from "../hooks/useConversation"
import EmptyState from "../components/EmptyState"

const Home = () => {
    return (
        <div className={clsx(
            'flex-1 p-4 ease-in-out duration-300 hidden lg:flex',
        )}>
            <EmptyState />
        </div>
    )
}

export default Home