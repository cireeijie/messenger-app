'use client'

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
    src?: string | null;
    isOpen?: boolean;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {
    if(!src) {
        return null
    }

    return ( 
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div 
                className="
                    flex
                    justify-center
                    items-center
                    p-5
                    h-full 
                    w-full
                "
            >
                <Image 
                    alt="image"
                    className="object-cover h-fit w-fit"
                    width='560'
                    height='200'
                    src={src}
                />
            </div>
            
        </Modal>
    );
}
 
export default ImageModal;