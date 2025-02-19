import { Outlet } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import NavBar from "../components/nav-bar";

const PrivateOutlet = () => {
    const { data, isLoading } = useGetMyInfoQuery();

    if (isLoading) {
        return <>Loading</>
    }
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default PrivateOutlet