import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import NavBar from "../components/nav-bar"

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