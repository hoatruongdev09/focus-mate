import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { AppRootState } from "../store/store"

const PrivateOutlet = () => {
    const auth = useSelector((state: AppRootState) => state.auth)
    const location = useLocation()

    if (!auth.token && !auth.refresh_token) {
        return (<Navigate to={'/'} state={{ from: location }} />)
    }
    return (
        <Outlet />
    )
}

export default PrivateOutlet