import { UserIcon } from "@heroicons/react/16/solid"
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";
import LoginDialog from "./login-dialog";
import UserInfoDialog from "./user-info-dialog";
import { useGetMyInfoQuery } from "../../store/services/user-service";

const Authentication = () => {
    const [showUserInfo, setShowUserInfo] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const authData = useSelector((state: AppRootState) => state.auth);

    const isAuthenticated = authData.token && authData.refresh_token

    const { data, error, isLoading } = useGetMyInfoQuery()

    // TODO: implement auth before loading user data



    console.log(`is authenticated: ${isAuthenticated}`)

    const handleUserIconClick = useCallback(() => {
        if (isAuthenticated) {
            setShowLoginDialog(false)
            setShowUserInfo(!showUserInfo)
        } else {
            setShowUserInfo(false)
            setShowLoginDialog(!showLoginDialog)
        }
    }, [showUserInfo, setShowUserInfo, showLoginDialog, setShowLoginDialog, isAuthenticated])

    return (
        <div className="relative">
            {
                !isAuthenticated && showLoginDialog ? <LoginDialog /> : <></>
            }
            {
                isAuthenticated && showUserInfo ? <UserInfoDialog /> : <></>
            }

            <button
                className="hover:bg-gray-200 p-1 rounded"
                onClick={handleUserIconClick}
            >
                <UserIcon className="size-5" />

            </button>
        </div>
    )
}

export default Authentication