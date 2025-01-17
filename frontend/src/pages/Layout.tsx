import { Outlet } from "react-router-dom"
import NavBar from "../components/nav-bar"

const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default Layout