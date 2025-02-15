import { Navigate, useLocation } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import GoogleIcon from "../Icon/google-icon"
import DiscordIcon from "../Icon/discord-icon"
import LoginForm from "../components/landingpage/login-form"

const LandingPage = () => {
    const { data: user } = useGetMyInfoQuery()

    const location = useLocation()

    if (user) {
        console.log('user: ', user)
        return (<Navigate to={`/home`} state={{ from: location }} />)
    }

    return (
        <>
            <div className="fixed top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center">
                <div className="h-96 bg-gradient-to-br to-white from-slate-400 shadow-sm p-3 rounded-xl flex gap-2">
                    <div className="w-64 bg-zinc-800 relative rounded-xl">
                        <img src="login-bg.jpg" className="w-full h-full object-cover rounded-xl opacity-55" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3 ">
                            <p className="text-white text-xl font-bold">Ready for</p>
                            <p className="text-white text-xl font-bold">A more <span className="bg-zinc-100 pb-1 px-1 rounded-md text-zinc-800">Productive</span></p>
                            <p className="text-white text-xl font-bold">Tuesday</p>
                        </div>
                    </div>
                    <div className="w-64 flex flex-col py-5 gap-1">
                        <p className="text-3xl font-extrabold text-center leading-none">Welcome back!</p>
                        <div className="flex flex-col justify-between flex-1">


                            <LoginForm />


                            <div className="flex flex-col gap-3">
                                <div className="h-px bg-zinc-700"></div>
                                <div className="flex items-end justify-center gap-2">
                                    <p className="text-xs font-semibold leading-none">Or continue with</p>
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
                    </div>

                </div>
            </div>
        </>
    )
}
export default LandingPage