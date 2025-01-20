import { useSelector } from "react-redux"
import { AppRootState } from "../store/store"

const LoadingScreen = () => {
    const show = useSelector((state: AppRootState) => state.app.showLoadingScreen)

    return (
        show ?
            <div className="absolute bottom-0 top-0 left-0 right-0 bg-zinc-800 z-50 flex flex-col items-center justify-center">
                <p className="text-white font-bold text-2xl">LOADING</p>
            </div> : <></>
    )
}

export default LoadingScreen