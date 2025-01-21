import { useSelector } from "react-redux"
import { AppRootState } from "../../store/store"
import ArrowRightStartOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightStartOnRectangleIcon"

const UserInfoDialog = () => {

    const userData = useSelector((state: AppRootState) => state.user.data)
    if (!userData) {
        return <></>
    }
    return (
        <div className="absolute top-12 right-0 bg-zinc-800 rounded-md p-1">
            <div className="w-52 flex flex-col gap-2 pb-4">
                <p className="text-white text-sm text-left px-4 py-3">Logged in as: {userData?.first_name} {userData?.last_name}</p>
                <div className="flex flex-col gap-2 px-4">
                    <button className="border border-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold text-xs flex items-center justify-center gap-2 px-2">
                        <ArrowRightStartOnRectangleIcon className="size-5" />
                        <p className="text-center">Log out</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserInfoDialog