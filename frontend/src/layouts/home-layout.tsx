import LeftBar from "../components/workspace/left-bar"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import NavBar from "../components/nav-bar"
import UnauthorizedError from "../pages/unauthorized-page"

const HomeLayout = () => {
    const location = useLocation()

    const {
        data: user,
        isLoading: isLoadUser,
        isError: isLoadUserError,
        error: loadUserError
    } = useGetMyInfoQuery();

    if (isLoadUser) {
        return <>Loading</>
    }

    if (!user) {
        return (
            <>
                <NavBar />
                <UnauthorizedError />
            </>
        )
    }


    return (
        <>
            <NavBar />
            <div className="fixed left-0 right-0 top-10 bottom-0 flex gap-5 justify-center">
                <LeftBar />
                <Outlet />
            </div>
        </>
    )
}
export default HomeLayout