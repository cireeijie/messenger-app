'use client'

import clsx from "clsx";

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}) => {
    return ( 
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(`
                flex
                justify-center
                rounded-sm
                px-3
                py-2
                text-sm
                font-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                ease-in-out
                text-white
                duration-300`,
                disabled && 'opacity-50 cursor-default',
                fullWidth && 'w-full',
                secondary ? 'text-white' : 'text-gray-900',
                danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 text-white',
                !secondary && !danger && 'bg-tufts-blue hover:bg-opacity-50 focus-visible:bg-opacity-50'
            )}
        >
            {children}
        </button>
    );
}
 
export default Button;