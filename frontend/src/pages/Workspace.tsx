import { useCallback, useState } from "react"
import Modal from "../components/modal"
import CreateNewBoard from "../components/workspace/create-new-board"
import LeftBar from "../components/workspace/left-bar"
import WorkspaceBoardPage from "../components/workspace/workspace-board-page"

const Workspace = () => {
    const [isShowCreateBoard, setIsShowCreateBoard] = useState(false)

    const handleHideCreateBoard = useCallback(() => {
        setIsShowCreateBoard(false)
    }, [setIsShowCreateBoard])

    const handleShowCreateBoard = useCallback(() => {
        setIsShowCreateBoard(true)
    }, [setIsShowCreateBoard])

    return (
        <>
            <div className="fixed left-0 right-0 top-10 bottom-0 flex gap-5 justify-center">
                <LeftBar />

                <WorkspaceBoardPage
                    handleShowCreateBoard={handleShowCreateBoard}
                />
            </div>

            <Modal isShow={isShowCreateBoard} onBgClick={handleHideCreateBoard}>
                <CreateNewBoard
                    onCloseClick={handleHideCreateBoard}
                />
            </Modal>
        </>
    )
}
export default Workspace