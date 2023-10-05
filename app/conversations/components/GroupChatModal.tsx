'use client'

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Select from "@/app/components/inputs/Select";
import Input from "@/app/components/inputs/input";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
    users: User[];
    isOpen: boolean;
    onClose: () => void;
}
const GroupChatModal: React.FC<GroupChatModalProps> = ({
    users,
    isOpen,
    onClose
}) => {
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })

    const members = watch('members')
    const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        })
        .then(() => {
            router.refresh()
            onClose()
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false))
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-5">
                    <div className="border-b border-pale">
                        <h2 className="text-white ">
                            Create a group chat
                        </h2>
                        <p className="text-sm text-pale">
                            Create a chat with more than 2 people.
                        </p>
                        <div
                            className="
                                mt-5
                                flex
                                flex-col
                                gap-y-6
                            "
                        >
                            <Input 
                                register={register}
                                label="group name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <Select 
                                disabled={isLoading}
                                label="members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="
                        flex
                        items-center
                        justify-end
                        gap-x-3
                        p-5
                    "
                >
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
 
export default GroupChatModal;