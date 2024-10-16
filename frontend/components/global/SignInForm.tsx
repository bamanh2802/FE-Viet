import React, { useState, useEffect } from "react";
import Image from 'next/image';
import logo from '@/public/img/logo.png'
import 'remixicon/fonts/remixicon.css';
import { Checkbox, Button } from "@nextui-org/react";
import { SignIn } from "@/service/apis";
import { useRouter } from 'next/router';



interface SignInFormProps {
    isOpen: boolean;
    closeForm: () => void; // Hàm để đóng form
}

const SignInForm: React.FC<SignInFormProps> = ({ isOpen, closeForm }) => {
    const router = useRouter()
    const [isSignIn, setIsSignIn] = useState<boolean>(true)
    const [userNameSignIn, setUserNameSignIn] = useState<string>('');
    const [passwordSignIn, setPasswordSignIn] = useState<string>('');
    const [errorSignIn, setErrorSignIn] = useState<string>('')
    const [isLoadingSignin, setIsLoadingSignIn] = useState<boolean>(false);
    

    const toggleSignIn = () => {
        setIsSignIn(!isSignIn)
    }

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoadingSignIn(true)
        e.preventDefault();
        try {
            const data = await SignIn(userNameSignIn, passwordSignIn)
            localStorage.setItem('access_token', data.data.access_token)
            localStorage.setItem('refresh_token', data.data.refresh_token)
            console.log(data)
            setIsLoadingSignIn(false)
            router.push('/home')

        } catch (e) {
            setIsLoadingSignIn(false)
            console.log(e)
            setErrorSignIn('Wrong password')
        }
    }

    return (
        <div
            onMouseDown={closeForm}
            className={`transition-all w-full h-screen absolute top-0 left-0 flex justify-center items-center box-border bg-gray-700 bg-opacity-55 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
            <div
            className={`transition-all w-3/5 flex ${isSignIn ? 'h-4/6' : 'h-5/6'}`}
            style={{ minWidth: '1142px' }}
            onMouseDown={(e) => e.stopPropagation()} // Gọi hàm stopPropagation()
            >
                <div className="rounded-l-3xl flex-1 h-full p-10 bg-gray-200 flex flex-col">
                    <div>
                        Welcome!
                    </div>
                    <div className="w-full h-full flex justify-center items-center">
                       <div className="w-2/4 h-2/4">
                         <Image className="" src={logo} alt="Logo" />
                       </div>
                    </div>
                    <div>
                        Not a member yet? <button onMouseDown={toggleSignIn}>Register now</button>
                    </div>
                </div>
                <div className="rounded-r-3xl flex-1 h-full p-10 bg-white">
                    {
                        isSignIn ? (
                            <div className="flex justify-center items-center">
                                <div className="w-full ">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">Log in</h2>
                                    <form onSubmit={handleSignIn}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm mb-2 opacity-85" htmlFor="email">
                                        Email or Username
                                        </label>
                                        <input
                                        className="bg-white border-b appearance-none rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline outline-none"
                                        id="email"
                                        placeholder="Enter your email"
                                        onChange={(e) => {
                                            setUserNameSignIn(e.target.value)
                                            setErrorSignIn('')

                                        }}
                                        />
                                        <label className="text-red-600 text-xs">{errorSignIn}</label>
                                    </div>
                                    <div className="mb-6">
                                        <label className="lock text-gray-700 text-sm mb-2 opacity-85" htmlFor="password">
                                        Password
                                        </label>
                                        <input
                                        className="bg-white border-b appearance-none rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="********"
                                        onChange={(e) => (setPasswordSignIn(e.target.value))}
                                        />
                                        <label className="text-red-600 text-xs">{errorSignIn}</label>

                                    </div>
                                    <div className="flex items-center mb-6">
                                    <Checkbox  color="primary"></Checkbox>
                                    Remember me
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <Button
                                        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-7 px-12 rounded-md focus:outline-none focus:shadow-outline w-full transition-colors duration-300 ease-in-out"
                                        type="submit"
                                        isLoading={isLoadingSignin}
                                        >
                                        Log in now
                                        </Button>
                                    </div>
                                    </form>

                                    <div className="text-sm text-end">Forgot your password?</div>

                                    <div className=" text-gray-500 my-4 mt-6">Or sign in with</div>

                                    <div className="flex space-x-3">
                                    <button
                                        className="flex-1 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out border"
                                        type="button"
                                    >
                                        <i className="ri-facebook-fill"/> Facebook
                                    </button>
                                    <button
                                        className="flex-1 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out border"
                                        type="button"
                                    >
                                        <i className="ri-google-fill"/> Google
                                    </button>
                                    <button
                                        className="flex-1 0 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out border"
                                        type="button"
                                    >
                                        <i className="ri-microsoft-fill"/> Microsoft
                                    </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white">
                            <h2 className="text-2xl font-bold text-start text-gray-800 mb-6">Register with your e-mail</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm mb-2 opacity-85" htmlFor="name">
                                        User Name (*)
                                    </label>
                                    <input
                                        className=" bg-white border-b appearance-none rounded w-full py-4 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm mb-2 opacity-85" htmlFor="email">
                                        Email (*)
                                    </label>
                                    <input
                                        className="bg-white border-b appearance-none rounded w-full py-4 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                               <div className="flex">
                                <div className="mb-4 m-3">
                                        <label className="block text-gray-700 text-sm mb-2 opacity-85" htmlFor="password">
                                            Password (*)
                                        </label>
                                        <input
                                            className="bg-white border-b appearance-none rounded w-full py-4 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="mb-4 m-3">
                                        <label className="block text-gray-700 text-sm mb-2 opacity-85" htmlFor="confirm-password">
                                            Confirm Password (*)
                                        </label>
                                        <input
                                            className="bg-white border-b appearance-none rounded w-full py-4 px-6 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="confirm-password"
                                            type="password"
                                            placeholder="Repeat password"
                                        />
                                    </div>
                               </div>
                                <div className="mb-6 flex items-center">
                                    <Checkbox defaultSelected color="primary"></Checkbox>
                                    I agree to the <a href="#" className="text-blue-500"> terms and conditions</a>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button
                                        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-7 px-12 rounded-md focus:outline-none focus:shadow-outline w-full transition-colors duration-300 ease-in-out"
                                        type="button"
                                    >
                                        Create Account
                                    </Button>
                                </div>
                            </form>
                            <div className=" text-gray-500 my-4 mt-6">Or register with</div>

                                    <div className="flex space-x-3">
                                    <button
                                        className="flex-1 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out border"
                                        type="button"
                                    >
                                        <i className="ri-facebook-fill"/> Facebook
                                    </button>
                                    <button
                                        className="flex-1 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out border"
                                        type="button"
                                    >
                                        <i className="ri-google-fill"/> Google
                                    </button>
                                    <button
                                        className="flex-1 0 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out border"
                                        type="button"
                                    >
                                        <i className="ri-microsoft-fill"/> Microsoft
                                    </button>
                                    </div>
                        </div>

                        )
                    }

                </div>

            </div>
        </div>
    )
}
export default SignInForm