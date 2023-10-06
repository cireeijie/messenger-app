'use client'

import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../inputs/input'
import Button from '../Button'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Divider from '../Divider'
import { useLoading } from '@/app/context/LoadingContext'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [ variant, setVariant ] = useState<Variant>('LOGIN')
    const [ isLoading, setIsLoading ] = useState(false)
    // const { isLoading, setIsLoading } = useLoading()

    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if(variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => {
                toast.error('Something went wrong!')
            })
            .finally(() => setIsLoading(false))
        }

        if(variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Invalid credentials')
                }

                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                    router.push('/users')
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
        .then((callback) => {
            if(callback?.error) {
                toast.error('Invalid Credentials')
            }

            if(callback?.ok && !callback?.error) {
                toast.success('Logged in!')
            }
        })
        .finally(() => setIsLoading(false))
    }

    return ( 
        <div className='container max-w-[400px] p-7 text-center'>
            <div className='flex justify-center mb-4'>
                <Image
                    src={'/assets/media/images/logo.svg'}
                    width={100}
                    height={100}
                    alt='Messenger App'
                />
            </div>
            
            <h1 className='title text-[24px] mb-2 mt-7'>{variant === 'LOGIN' ? 'Login' : 'Create an account'}</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'REGISTER' && (
                    <Input
                    id='name'
                    label='Name'
                    register={register} 
                    errors={errors}
                    disabled={isLoading}
                    required
                    />
                )}
                <Input
                    id='email'
                    label='Email'
                    type='email'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    required
                />
                <Input
                    id='password'
                    label='Password'
                    type='password'
                    register={register} 
                    errors={errors}
                    disabled={isLoading}
                    required
                />
                <div className='mt-4'>
                    <Button
                        disabled={isLoading}
                        fullWidth
                        type='submit'
                    >
                        {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                    </Button>
                </div>
            </form>
            <div className='flex items-center gap-2 my-7'>
                <Divider 
                    fullWidth
                    stroke={1}
                />
                <p className='text-pale whitespace-nowrap text-[14px] font-light'>Or continue with</p>
                <Divider 
                    fullWidth
                    stroke={1}
                />
            </div>
            <div className='text-tuft-blue flex gap-2 mb-4'>
                <AuthSocialButton 
                    icon={BsGithub}
                    name='Github'
                    onClick={() => socialAction('github')}
                />
                <AuthSocialButton 
                    icon={BsGoogle}
                    name='Google'
                    onClick={() => socialAction('google')}
                />
            </div>
            <div className='text-pale flex justify-center gap-1 text-[14px]'>
                <div>
                    {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                </div>
                <div
                    className='underline hover:cursor-pointer'
                    onClick={toggleVariant}
                >
                    {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                </div>
            </div>
        </div>
     );
}
 
export default AuthForm;