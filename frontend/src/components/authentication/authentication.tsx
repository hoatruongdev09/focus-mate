import { useCallback, useState } from "react";
import LoginDialog from "./login-dialog";
import UserInfoDialog from "./user-info-dialog";
import { useGetMyInfoQuery } from "../../store/services/user-service";

const Authentication = () => {
    const [showUserInfo, setShowUserInfo] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = useState(false)

    const { data: user } = useGetMyInfoQuery()

    const isAuthenticated = !!user


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
        <div className="relative flex flex-col items-center">
            {
                !isAuthenticated && showLoginDialog ? <LoginDialog /> : <></>
            }
            {
                isAuthenticated && showUserInfo ? <UserInfoDialog /> : <></>
            }

            <button
                className=""
                onClick={handleUserIconClick}
            >
                <img
                    src={`https://avatar.iran.liara.run/public/${user?.id ?? 34}`}
                    className="w-7 h-7"
                />

            </button>
        </div>
    )
}

export default Authentication