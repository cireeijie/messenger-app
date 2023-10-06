'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    autoComplete?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register,
    errors,
    autoComplete
}) => {
    return (
        <div className="relative w-full">
            <input 
                id={id}
                type={type}
                autoComplete={autoComplete ? id : 'off'}
                {...register(id, {required})}
                placeholder={placeholder}
                className="w-full rounded-full py-2 px-4 focus:outline-none bg-onyx text-white"
            />
        </div>
    );
}
 
export default MessageInput;