import { useSelector } from "react-redux"
import { AppRootState } from "../store/store"
import LoadingPage from "./loading-page"

const LoadingScreen = () => {
    const show = useSelector((state: AppRootState) => state.app.showLoadingScreen)

    return (
        show ? < LoadingPage /> : <></>
    )
}

export default LoadingScreen