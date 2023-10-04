'use client'

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/app/components/Avatar";

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[]
    }
}

const ProfileDrawer:React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data
}) => {
    const otherUser = useOtherUser(data)

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name
    }, [data.name, otherUser.name])

    const statusText = useMemo(() => {
        if(data.isGroup) {
            return `${data.users.length} members`
        }

        return 'Active'
    }, [data])

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as='div' className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-500"
                    leaveFrom="opacity-500"
                    leaveTo="opacity-0"
                >
                    <div
                        className="
                            fixed
                            inset-0
                            overflow-hidden
                        "   
                    >
                        <div
                            className="
                                absolute
                                inset-0
                                overflow-hidden
                            "
                        >
                            <div
                                className="
                                    pointer-events-none
                                    fixed
                                    inset-y-0
                                    right-0
                                    flex
                                    max-w-full
                                    pl-10
                                "
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel
                                        className="
                                             pointer-events-auto 
                                             w-screen
                                             max-w-md                                      
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                h-full
                                                flex-col
                                                overflow-y-scroll
                                                bg-onyx
                                                py-6
                                                shadow-xl
                                            "
                                        >
                                            <div className="px-4">
                                                <div
                                                    className="
                                                        flex
                                                        items-start
                                                        justify-end
                                                    "
                                                >
                                                    <div
                                                        className="
                                                            ml-3
                                                            flex
                                                            h-7
                                                            items-center
                                                        "
                                                    >
                                                        <button
                                                            onClick={onClose}
                                                            type="button"
                                                            className="
                                                                rounded-md
                                                                bg-tufts-blue
                                                                text-white
                                                                hover:opacity-80
                                                                focus:outline-none
                                                            "
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <IoClose size={24}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="
                                                    relative
                                                    mt-6
                                                    flex-1
                                                    px-4
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex flex-col items-center
                                                    "
                                                >
                                                    <div className="mb-2">
                                                        <Avatar user={otherUser} />
                                                    </div>
                                                    <div className="text-white">
                                                        {title}
                                                    </div>
                                                    <div className="text-white">
                                                        {statusText}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        <div 
                                                            onClick={() => {}}
                                                            className="
                                                                flex
                                                                flex-col
                                                                gap-3
                                                                items-center
                                                                cursor-pointer
                                                                hover:opacity-75
                                                            "
                                                        >
                                                            <div
                                                                className="
                                                                    w-10
                                                                    h-10
                                                                    bg-rose-700
                                                                    rounded-full
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    text-white
                                                                "
                                                            >
                                                                <IoTrash size={20}/>
                                                            </div>
                                                            <div
                                                                className="
                                                                    text-sm
                                                                    font-light
                                                                    text-pale
                                                                "
                                                            >
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="
                                                            w-full
                                                            pb-5
                                                            pt-5
                                                        "
                                                    >
                                                        <dl
                                                            className="
                                                                space-y-8
                                                                px-4
                                                            "
                                                        >
                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt
                                                                        className="
                                                                            text-sm
                                                                            font-medium
                                                                            text-white
                                                                        "
                                                                    >
                                                                        Email
                                                                    </dt>
                                                                    <dd
                                                                        className="
                                                                            mt-1
                                                                            text-sm
                                                                            text-pale
                                                                        "
                                                                    >
                                                                        {otherUser.email}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data.isGroup && (
                                                                <>
                                                                    <hr />
                                                                    <div>
                                                                        <dt
                                                                            className="
                                                                                text-sm
                                                                                font-medium
                                                                                text-white
                                                                            "
                                                                        >
                                                                            Joined
                                                                        </dt>
                                                                        <dd
                                                                            className="
                                                                                mt-1
                                                                                text-sm
                                                                                text-pale
                                                                            "
                                                                        >
                                                                            <time dateTime={joinedDate}>
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}
 
export default ProfileDrawer;