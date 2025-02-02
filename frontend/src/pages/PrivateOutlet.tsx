import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { hideLoadingScreen, showLoadingScreen } from "../store/slices/app-slice"
import NavBar from "../components/nav-bar"
import AuthContext from "../components/authentication/auth-context"

const PrivateOutlet = () => {
    const location = useLocation()
    const { data: user, isLoading } = useGetMyInfoQuery();

    if (!user && !isLoading) {
        return (<Navigate to={'/'} state={{ from: location }} />)
    }

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default PrivateOutlet