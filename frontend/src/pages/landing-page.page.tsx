import { Navigate, useLocation } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"

const LandingPage = () => {
    const { data: user } = useGetMyInfoQuery()

    const location = useLocation()

    if (user) {
        console.log('user: ', user)
        return (<Navigate to={`/home`} state={{ from: location }} />)
    }

    return (
        <>
            Create a fancy landing page
        </>
    )
}
export default LandingPage