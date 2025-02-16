import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import GoogleIcon from "../Icon/google-icon"
import DiscordIcon from "../Icon/discord-icon"
import { useState } from "react"
import { useLoginEmailPasswordMutation } from "../store/services/auth-service"

const LoginPage = () => {
    const { data: user } = useGetMyInfoQuery()
    const location = useLocation()
    const navigate = useNavigate()
    const [loginEmailPassword] = useLoginEmailPasswordMutation()

    const [formState, setFormState] = useState<{
        email: string,
        password: string
    }>({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    if (user) {
        return (<Navigate to={`/home`} state={{ from: location }} />)
    }

    const handleSetField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const handleShowPassword = (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleLogin = async (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const data = await loginEmailPassword(formState)
            if (data.data) {
                navigate(`/${data.data.data.user.username}/w`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="fixed top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center bg-zinc-50">
                <div className="flex flex-col py-10 px-8 gap-5 bg-white rounded shadow-xl z-10">
                    <p className="text-2xl font-extrabold text-center leading-none">Login to continue</p>
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 py-2 px-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold">Email:</label>
                                <input className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                                    type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleSetField}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className=" flex flex-col gap-1 relative">
                                <label className="text-sm font-semibold">Password:</label>
                                <input className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
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
                                        showPassword ? <EyeIcon className="size-4" /> : <EyeSlashIcon className="size-4" />
                                    }

                                </button>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <NavLink
                                    to='/register'
                                    className="text-xs font-semibold leading-none pt-1 hover:underline cursor-pointer"
                                >
                                    Don't have account? Create new
                                </NavLink>
                                <button
                                    type="submit"
                                    className="bg-zinc-800 hover:bg-zinc-600 text-white rounded px-3 py-1 text-sm font-semibold"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                            <NavLink
                                to='/register'
                                className="text-xs font-semibold leading-none pt-1 hover:underline cursor-pointer"
                            >
                                Forgot password
                            </NavLink>
                        </div>
                    </form>
                    <div className="flex flex-col w-80 gap-3">
                        <div className="h-px bg-zinc-700"></div>
                        <div className="flex items-end justify-center gap-2">
                            <p className="text-xs font-semibold leading-none">
                                Or continue with
                            </p>
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
export default LoginPage