import { createContext, useState } from "react"
import Modal from "../components/modal"
import CreateNewBoard from "../components/workspace/create-new-board"
import LeftBar from "../components/workspace/left-bar"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import NavBar from "../components/nav-bar"

export const HomeContext = createContext({
    isShowCreateBoard: false,
    handleShowCreateBoard: () => { }
})

const HomeLayout = () => {
    const [isShowCreateBoard, setIsShowCreateBoard] = useState(false)
    const location = useLocation()
    const {
        data: user,
        isLoading: isLoadUser,
        isError: isLoadUserError,
        error: loadUserError
    } = useGetMyInfoQuery();

    if (isLoadUser) {
        return <>Loading</>
    }
    if (isLoadUserError) {
        return <>{JSON.stringify(loadUserError)}</>
    }

    if (!user) {
        return (<Navigate to={'/'} state={{ from: location }} />)
    }

    const handleHideCreateBoard = () => {
        setIsShowCreateBoard(false)
    }

    const handleShowCreateBoard = () => {
        setIsShowCreateBoard(true)
    }

    return (
        <>
            <NavBar />
            <HomeContext.Provider value={{ isShowCreateBoard, handleShowCreateBoard }}>
                <div className="fixed left-0 right-0 top-10 bottom-0 flex gap-5 justify-center">
                    <LeftBar />
                    <Outlet />
                </div>

                <Modal isShow={isShowCreateBoard} onBgClick={handleHideCreateBoard}>
                    <CreateNewBoard
                        onCloseClick={handleHideCreateBoard}
                    />
                </Modal>
            </HomeContext.Provider>
        </>
    )
}
export default HomeLayout