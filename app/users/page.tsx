'use client'

import { signOut } from 'next-auth/react'
import EmptyState from '../components/EmptyState'

import Stories from '../components/Stories'
import AccountInfo from '../components/AccountInfo'
import Conversations from '../components/Conversations'

export default function Users() {
    return (
        <div className='w-full h-full flex flex-col p-4 gap-4'>
            <div className='flex gap-4'>
                <Stories />
                <AccountInfo />
            </div>
            <div className='flex-1 flex gap-4'>
                <Conversations />
                <EmptyState />
            </div>
            <button onClick={() => signOut()}>logout</button>
        </div>
    )
}