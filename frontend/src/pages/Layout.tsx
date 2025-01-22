import { useNavigation } from "react-router";
import { Outlet } from "react-router-dom"
import LoadingScreen from "../components/loading-screen"
const Layout = () => {

    // const navigation = useNavigation()
    // const isNavigation = Boolean(navigation.location)

    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout