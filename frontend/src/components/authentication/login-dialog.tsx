import { EnvelopeIcon } from "@heroicons/react/24/solid";
import GoogleIcon from "../../Icon/google-icon";
import DiscordIcon from "../../Icon/discord-icon";

import { useCallback } from "react"
import { useLoginEmailPasswordMutation } from "../../store/services/auth-service";

const LoginDialog = () => {

    const [loginEmailPassword] = useLoginEmailPasswordMutation()
    const handleLoginEmailPassword = useCallback(async () => {
        const email = "test@email.com"
        const password = "123456"
        const userData = await loginEmailPassword({ email, password })
        console.log(userData)
    }, [loginEmailPassword])

    return (
        <div className="absolute top-12 right-0 bg-gray-950 bg-opacity-85 rounded-md p-1">
            <div className="w-52 flex flex-col gap-2 pb-4">
                <p className="text-white font-bold text-center px-4 py-3">Log in or create account:</p>
                <div className="flex flex-col gap-2 px-4">
                    <button
                        className="bg-gray-100 hover:bg-gray-200 py-2 rounded font-semibold text-xs flex items-center justify-between gap-2 px-2"
                        onClick={handleLoginEmailPassword}
                    >
                        <EnvelopeIcon className="size-5" />
                        <p className="flex-1 text-center"> Continue with E-mail</p>
                    </button>
                    <div className="bg-white h-px rounded bg-opacity-60"></div>
                    <button className="bg-gray-100 hover:bg-gray-200 py-2 rounded font-semibold text-xs flex items-center justify-between gap-2 px-2">
                        <GoogleIcon className="size-5" />
                        <p className="flex-1 text-center"> Continue with Google</p>
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold text-xs flex items-center justify-between gap-2 px-2">
                        <DiscordIcon className="size-5" />
                        <p className="flex-1 text-center"> Continue with Discord</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginDialog