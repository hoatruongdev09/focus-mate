import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import React, { useCallback, useState } from "react"
import { useLoginEmailPasswordMutation } from "../../store/services/auth-service"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const navigate = useNavigate()
    const [loginEmailPassword] = useLoginEmailPasswordMutation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }, [email, setEmail])

    const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [password, setPassword])

    const handleShowPassword = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }, [showPassword, setShowPassword])



    const handleLogin = useCallback(async (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const data = await loginEmailPassword({ email, password })
            if (data.data) {
                navigate(`/${data.data.data.user.username}/w`)
            }
        } catch (err) {
            console.error(err)
        }
    }, [email, password, setEmail, setPassword, navigate])

    return (
        <form>
            <div className="flex flex-col gap-4 py-2 px-1">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Email:</label>
                    <input className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder="Enter your email"
                    />
                </div>
                <div className=" flex flex-col gap-1 relative">
                    <label className="text-sm font-semibold">Password:</label>
                    <input className="flex-1 bg-white border border-zinc-800 px-2 rounded py-1"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleChangePassword}
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
                    <p className="text-xs font-semibold leading-none pt-1 hover:underline cursor-pointer">Don't have account? Create new</p>
                    <button
                        type="submit"
                        className="bg-zinc-800 hover:bg-zinc-600 text-white rounded px-3 py-1 text-sm font-semibold"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </form>
    )

}

export default LoginForm