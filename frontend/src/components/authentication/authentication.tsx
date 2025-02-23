import { useState } from "react";
import LoginDialog from "./login-dialog";
import UserInfoDialog from "./user-info-dialog";
import UserAvatar from "../user-avatar";
import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";

const Authentication = () => {
    const [showUserInfo, setShowUserInfo] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = useState(false)

    const user = useSelector((state: AppRootState) => state.user.data)

    const isAuthenticated = !!user


    const handleUserIconClick = () => {
        if (isAuthenticated) {
            setShowLoginDialog(false)
            setShowUserInfo(!showUserInfo)
        } else {
            setShowUserInfo(false)
            setShowLoginDialog(!showLoginDialog)
        }
    }

    return (
        <div className="relative flex flex-col items-center">
            {
                !isAuthenticated && showLoginDialog ? <LoginDialog /> : <></>
            }
            {
                isAuthenticated && showUserInfo ? <UserInfoDialog /> : <></>
            }

            {
                user && <button
                    className=""
                    onClick={handleUserIconClick}
                >
                    <UserAvatar
                        user_avatar={user.avatar}
                        className="w-7 h-7"
                    />

                </button>
            }
        </div>
    )
}

export default Authentication