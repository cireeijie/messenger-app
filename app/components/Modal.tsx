'use client'

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children
}) => {
    return ( 
        <Transition.Root
            show={isOpen}
            as={Fragment}
        >
            <Dialog
                as="div"
                className="relative z-50"
                onClose={onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="
                            fixed
                            inset-0
                            bg-onyx
                            bg-opacity-60
                            transition-opacity
                        "
                    />
                </Transition.Child>
                <div
                    className="
                        flex
                        mt-[-100vh]
                        h-[100vh]
                        items-center
                        justify-center
                        p-4
                        text-center
                    "
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4"
                        enterTo="opacity-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-4"
                    >
                        <Dialog.Panel
                            className="
                                relative
                                transform
                                overflow-hidden
                                rounded-lg
                                bg-onyx
                                text-left
                                shadow-xsl
                                transition-all
                                lg:min-w-[500px]
                                md:min-w-[300px]
                                sm:min-w-[300px]
                                w-fit
                            "
                        >
                            <div
                                className="
                                    absolute
                                    right-0
                                    top-0
                                    pr-2
                                    pt-2
                                    z-10
                                "
                            >
                                <button 
                                    type="button"
                                    className="
                                        rounded-md
                                        bg-tufts-blue
                                        text-white
                                        hover:text-opacity-75
                                        focus:outline-none
                                    "
                                    onClick={onClose}
                                >
                                    <span className="sr-only">Close</span>
                                    <IoClose 
                                        size={30}
                                        className="
                                            h-6
                                            w-6
                                        "
                                    />
                                </button>
                            </div>
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
 
export default Modal;