import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { AppRootState } from "../store/store"
import Modal from "../components/modal"
import CreateNewBoard from "../components/workspace/create-new-board"
import { setShowCreateBoardModal } from "../store/slices/app-slice"

const AppLayout = () => {
    const dispatch = useDispatch()
    const { showCreateBoardModal } = useSelector((state: AppRootState) => state.app)

    const handleHideCreateBoard = () => {
        dispatch(setShowCreateBoardModal(false))
    }

    return (
        <>
            <Outlet />
            <Modal isShow={showCreateBoardModal} onBgClick={handleHideCreateBoard}>
                <CreateNewBoard
                    onCloseClick={handleHideCreateBoard}
                />
            </Modal>
        </>
    )
}

export default AppLayout