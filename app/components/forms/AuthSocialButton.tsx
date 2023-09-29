import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType;
    name: string;
    onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    name,
    onClick
}) => {
    return (
        <button
            className="w-full flex justify-center items-center gap-4 border-[1px] rounded-sm border-tufts-blue p-2 ease-in-out duration-300 hover:opacity-70 focus:opacity-70"
            type="button"
            onClick={onClick}
        >
            <span className="text-tufts-blue"><Icon size={20}/></span>
            <span className="text-tufts-blue">{name}</span>
        </button>
    );
}
 
export default AuthSocialButton;