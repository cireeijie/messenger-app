'use client'

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/input";
import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
    currentUser: User;
    isOpen: boolean;
    onClose:() => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    currentUser,
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
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })

    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/settings', data)
        .then(() => {
            router.refresh()
            onClose()
        })
        .catch(() => {
            toast.error('Something went wrong!')
        })
        .finally(() => setIsLoading(false))
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12 p-5">
                    <div className="border-b border-pale pb-5">
                        <h2 className="text-white font-semibold">
                            Profile
                        </h2>
                        <p className="text-pale text-sm">
                            Edit your public information.
                        </p>
                        <div
                            className="
                                mt-5
                                flex
                                flex-col
                                gap-y-8
                            "
                        >
                            <Input 
                                disabled={isLoading}
                                label='name'
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>
                                <label
                                    className="
                                        text-pale
                                        text-sm
                                        font-medium
                                        leading-6
                                    "
                                >
                                    Photo
                                </label>
                                <div
                                    className="
                                        mt-2
                                        flex
                                        items-center
                                        gap-x-3
                                    "
                                >
                                    <div className="w-[48px] h-[48px] overflow-hidden rounded-full">
                                        {image ?
                                            <Image 
                                            width='48'
                                            height='48'
                                            className="rounded-full"
                                            src={image || currentUser?.image}
                                            alt="Avatar"
                                        />
                                        :
                                            <IoPersonCircleOutline size={48} className="text-white"/>
                                        }
                                    </div>
                                    <CldUploadButton
                                        options={{maxFiles: 1}}
                                        onUpload={handleUpload}
                                        uploadPreset="vuuhb1jl"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="
                            mt-6
                            flex
                            items-center
                            justify-end
                            gap-x-3
                        "
                    >
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
 
export default SettingsModal;