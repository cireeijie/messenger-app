'use client'

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {
    const session = useSession()
    const [ imageModalOpen, setImageModalOpen ] = useState(false)
    const [ date, setDate ] = useState<string>()

    useEffect(() => {
        const newDate = format(new Date(data.createdAt), 'p')
        setDate(newDate)
    }, [data.createdAt])

    const isOwn = session?.data?.user?.email === data?.sender?.email
    const seenList = (data.seen || [])
    .filter(user => user.email !== data?.sender?.email)
    .map(user => user.name)
    .join(', ')

    const container = clsx(
        'flex gap-3 p-4',
        isOwn && 'justify-end'
    )

    const avatar = clsx(isOwn && 'order-2')

    const body = clsx(
        'flex flex-col gap-2',
        isOwn && 'items-end'
    )

    const message = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-tufts-blue text-white' : 'bg-onyx text-white',
        data.image ? 'rounded-md bg-onyx p-0' : 'rounded-full py-2 px-3'
    )

    const seen = clsx('capitalize')

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-white capitalize">
                        {data.sender.name}
                    </div>
                    <div className="text-[10px] text-pale">
                        {date}
                    </div>
                </div>
                <div className={message}>
                    <ImageModal 
                        src={data.image}
                        isOpen={imageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                    />
                    {data.image ? (
                        <Image
                            onClick={() => setImageModalOpen(true)}
                            alt="image"
                            height='288'
                            width='288'
                            src={data.image}
                            className="
                                object-cover
                                cursor-pointer
                                hover:scale-110
                                transition
                                translate
                            "
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-[10px] text-pale">
                        {`Seen by `} <span className="capitalize">{seenList}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default MessageBox;