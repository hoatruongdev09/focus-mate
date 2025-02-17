import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import GoogleIcon from "../Icon/google-icon"
import DiscordIcon from "../Icon/discord-icon"
import { useState } from "react"
import { useRegisterEmailPasswordMutation, useValidateEmailMutation } from "../store/services/auth-service"

const RegisterPage = () => {
    const {
        data: user,
        isLoading: isLoadingUser,
        isError: isLoadUserError
    } = useGetMyInfoQuery()

    const [validateEmail, {
        isLoading: isValidatingEmail,
        isError: isValidateEmailError,
        error: validateEmailError,
        data: validateEmailData
    }] = useValidateEmailMutation()

    const [registerEmail, {
        isLoading: isRegistering,
        isError: isRegisterError,
        error: registerError
    }] = useRegisterEmailPasswordMutation()

    const location = useLocation()
    const navigate = useNavigate()

    const [formState, setFormState] = useState<{
        email: string,
        password: string,
        confirmPassword: string,
        firstName: string,
        lastName: string
    }>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    })
    const [showPassword, setShowPassword] = useState<{
        password: boolean,
        confirmPassword: boolean
    }>({
        password: false,
        confirmPassword: false
    })

    const [isEmailValid, setIsEmailValid] = useState(false)

    if (user) {
        return (<Navigate to={`/home`} state={{ from: location }} />)
    }



    const handleSetField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleShowPassword = () => {
        setShowPassword({
            ...showPassword,
            password: !showPassword.password
        })
    }
    const handleShowConfirmPassword = () => {
        setShowPassword({
            ...showPassword,
            confirmPassword: !showPassword.confirmPassword
        })
    }

    const handleRegister = async () => {
        try {
            const result = await registerEmail(formState)
            if (result.data) {
                navigate(`/home`)
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleValidateEmail = async () => {
        try {
            if (!formState.email) {
                console.error(`email is empty`)
                return
            }
            const result = await validateEmail(formState.email)
            if (result.data) {
                setIsEmailValid(result.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleGoBack = () => {
        setIsEmailValid(false)
    }

    return (
        <>
            <div className="fixed top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center bg-zinc-50">
                <div className="flex flex-col py-10 px-8 gap-5 bg-white rounded shadow-xl z-10">
                    <p className="text-2xl font-extrabold text-center leading-none">Sign up an account</p>
                    <form className="flex flex-col gap-4 py-2 px-1">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">

                                <label className="text-sm font-semibold">
                                    Email <span className="text-red-600">*</span>
                                </label>

                                {
                                    validateEmailData && !validateEmailData.status &&
                                    <p className="text-red-600 text-sm text-end">{validateEmailData.message}</p>
                                }
                            </div>
                            <input
                                disabled={isValidatingEmail || isEmailValid || isRegistering}
                                className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleSetField}
                                placeholder="Enter your email"
                            />
                        </div>
                        {
                            isEmailValid && <>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold">
                                        First name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                                        type="text"
                                        disabled={isRegistering}
                                        name="firstName"
                                        value={formState.firstName}
                                        onChange={handleSetField}
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold">
                                        Last name <span className="text-red-600">*</span>
                                    </label>
                                    <input className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                                        type="text"
                                        name="lastName"
                                        disabled={isRegistering}
                                        value={formState.lastName}
                                        onChange={handleSetField}
                                        placeholder="Your last name"
                                    />
                                </div>
                                <div className=" flex flex-col gap-1 relative">
                                    <label className="text-sm font-semibold">
                                        Password <span className="text-red-600">*</span>
                                    </label>
                                    <input className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                                        type={showPassword.password ? "text" : "password"}
                                        name="password"
                                        disabled={isRegistering}
                                        value={formState.password}
                                        onChange={handleSetField}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute bottom-1.5 right-1 p-1 hover:bg-zinc-200 rounded"
                                        onClick={handleShowPassword}
                                    >
                                        {
                                            showPassword.password ? <EyeIcon className="size-4" /> : <EyeSlashIcon className="size-4" />
                                        }

                                    </button>
                                </div>
                                <div className=" flex flex-col gap-1 relative">
                                    <label className="text-sm font-semibold">
                                        Confirm password <span className="text-red-600">*</span>
                                    </label>
                                    <input className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                                        type={showPassword.confirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        disabled={isRegistering}
                                        value={formState.confirmPassword}
                                        onChange={handleSetField}
                                        placeholder="Confirm password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute bottom-1.5 right-1 p-1 hover:bg-zinc-200 rounded"
                                        onClick={handleShowConfirmPassword}
                                    >
                                        {
                                            showPassword.confirmPassword ? <EyeIcon className="size-4" /> : <EyeSlashIcon className="size-4" />
                                        }

                                    </button>
                                </div>
                            </>
                        }
                        <div className="flex items-center justify-between pt-1">

                            {
                                isEmailValid && <button
                                    type="button"
                                    disabled={isRegistering}
                                    className="bg-zinc-800 hover:bg-zinc-600 text-white rounded px-3 py-1 text-sm font-semibold"
                                    onClick={handleGoBack}
                                >
                                    Go back
                                </button>
                            }

                            <button
                                type={isEmailValid ? "submit" : "button"}
                                disabled={isValidatingEmail || isRegistering}
                                className="bg-zinc-800 hover:bg-zinc-600 text-white 
                                            rounded px-3 py-1 text-sm font-semibold disabled:bg-red-200"
                                onClick={() => {
                                    if (isEmailValid) {
                                        handleRegister()
                                    } else {
                                        handleValidateEmail()
                                    }
                                }}
                            >
                                {isEmailValid ? "Sign up" : "Continue"}
                            </button>
                        </div>
                        <NavLink
                            to='/login'
                            className="text-xs font-semibold leading-none pt-1 hover:underline cursor-pointer"
                        >
                            Already have account? Login
                        </NavLink>

                    </form>
                    <div className="flex flex-col w-80 gap-3">
                        <div className="h-px bg-zinc-700"></div>
                        <div className="flex items-end justify-center gap-2">
                            <p className="text-xs font-semibold leading-none">Or sign up with</p>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <button className="hover:bg-zinc-100 p-2 rounded">
                                <GoogleIcon className="size-5" />
                            </button>
                            <button className="hover:bg-zinc-100 p-2 rounded">
                                <DiscordIcon className="size-5" fill="#4f46e5" />
                            </button>
                        </div>
                    </div>
                </div>

                <img
                    className="absolute left-0 bottom-0 w-96"
                    src="/login-page/figure_1.jpeg"
                />
                <img
                    className="absolute right-0 top-0 w-96"
                    src="/login-page/figure_2.jpeg"
                />
            </div>
        </>
    )
}

export default RegisterPage