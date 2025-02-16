import { ReactNode, useEffect } from "react"
import { useGetMyInfoQuery } from "../../store/services/user-service"
import LoadingPage from "../loading-page"
import { useRefreshTokenMutation } from "../../store/services/auth-service"
import { useSelector } from "react-redux"
import { AppRootState } from "../../store/store"
import { useNavigate } from "react-router-dom";

const AuthContext = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const {
        data: user,
        isLoading: isLoadMyUserInfo,
        isError: isErrorLoadUserData,
        error: loadUserDataError
    } = useGetMyInfoQuery()

    const refresh_token = useSelector((state: AppRootState) => state.auth.refresh_token)

    if (isLoadMyUserInfo) {
        return (
            <LoadingPage />
        )
    }
    if (!isErrorLoadUserData) {
        return (
            <>
                {children}
            </>
        )
    }

    const [refreshToken, {
        isLoading: isRefreshToken,
        isError: isErrorRefreshToken,
        error }
    ] = useRefreshTokenMutation()

    useEffect(() => {
        if (!refresh_token || !refreshToken) { return }
        refreshToken({ refresh_token })
    }, [refreshToken, refresh_token])

    if (isRefreshToken) {
        return <LoadingPage />
    }
    if (isErrorRefreshToken) {
        return <>
            Error
        </>
    }
    console.log("wtf")
    navigate('/')
}
export default AuthContext