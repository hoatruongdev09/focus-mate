import { createContext, useCallback, useContext, useState } from "react"
import Modal from "../components/modal"
import CreateNewBoard from "../components/workspace/create-new-board"
import LeftBar from "../components/workspace/left-bar"
import { Outlet } from "react-router-dom"

export const WorkspaceContext = createContext({
    isShowCreateBoard: false,
    handleShowCreateBoard: () => { }
})

const Workspace = () => {
    const [isShowCreateBoard, setIsShowCreateBoard] = useState(false)

    const handleHideCreateBoard = useCallback(() => {
        setIsShowCreateBoard(false)
    }, [setIsShowCreateBoard])

    const handleShowCreateBoard = useCallback(() => {
        setIsShowCreateBoard(true)
    }, [setIsShowCreateBoard])

    return (
        <WorkspaceContext.Provider value={{ isShowCreateBoard, handleShowCreateBoard }}>
            <div className="fixed left-0 right-0 top-10 bottom-0 flex gap-5 justify-center">
                <LeftBar />
                <Outlet />
            </div>

            <Modal isShow={isShowCreateBoard} onBgClick={handleHideCreateBoard}>
                <CreateNewBoard
                    onCloseClick={handleHideCreateBoard}
                />
            </Modal>
        </WorkspaceContext.Provider>
    )
}
export default Workspace