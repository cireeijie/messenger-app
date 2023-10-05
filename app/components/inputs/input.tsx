'use client'

import clsx from "clsx";
import { useEffect } from "react";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'

import toast from 'react-hot-toast'

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
}) => {

    useEffect(() => {
        let errorMessage = '';

        if (errors[id]?.type === 'required') {
            if(id === 'email') {
                errorMessage = `Remember, your email should be uniquely yours!`
            }

            if(id === 'password') {
                errorMessage = `Don't forget, your password should be strong and unbreakable!`
            }

            toast.error(errorMessage)
        }
    }, [errors, id]);

    return ( 
        <div className="text-left">
            <label 
                htmlFor={id}
                className="
                    text-pale
                    text-[14px]
                    capitalize
                "
            >
                {label}
            </label>
            <div>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(`
                        form-input
                        block
                        w-full
                        rounded-sm
                        border-0
                        py-1.5
                        text-gray-900
                        shadow-sm
                        capitalize`,
                        errors[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
     );
}
 
export default Input;