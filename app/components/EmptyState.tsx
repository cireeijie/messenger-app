import Image from "next/image";
import logo from '@/public/assets/media/images/logo.svg'

const EmptyState = () => {
    return (
        <div className="h-full w-full flex flex-col gap-2 justify-center items-center bg-onyx bg-opacity-50 rounded-lg text-center p-4 ">
            <Image 
                src={logo}
                width='100'
                height='100'
                alt="logo"
            />
            <h1 className="text-white">Chat is empty. Start a new conversation now!</h1>
        </div>
    );
}
 
export default EmptyState;