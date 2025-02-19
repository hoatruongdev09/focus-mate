import { useSelector } from "react-redux"
import { AppRootState } from "../store/store"
import { NavLink } from "react-router-dom"

const UnauthorizedError = () => {
    const user = useSelector((state: AppRootState) => state.user.data)

    return (
        <div
            className="fixed left-0 right-0 top-0 bottom-0"
        >
            <div className="flex flex-col w-full h-full items-center justify-center gap-3 pb-56">
                <p className="font-bold text-4xl">Page not found.</p>
                <p className="font-semibold">This page may be private.
                    {
                        user ?
                            <span className="pl-1"> If someone gave you this link,
                                you may need to be a board or
                                Workspace member to access it.
                            </span> :
                            <span className="pl-1">
                                You may be able to view it by
                                <NavLink className="text-blue-500 pl-1" to="/login">
                                    logging in.
                                </NavLink>
                            </span>
                    }
                </p>
            </div>
        </div>
    )
}

export default UnauthorizedError