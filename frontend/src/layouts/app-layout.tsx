import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { AppRootState } from "../store/store"
import Modal from "../components/modal"
import CreateNewBoard from "../components/workspace/create-new-board"
import { hideCreateBoardModal } from "../store/slices/app-slice"

const AppLayout = () => {
    const dispatch = useDispatch()
    const { createBoardModal } = useSelector((state: AppRootState) => state.app)

    const handleHideCreateBoard = () => {
        dispatch(hideCreateBoardModal())
    }

    return (
        <>
            <Outlet />
            <Modal isShow={createBoardModal.show} onBgClick={handleHideCreateBoard}>
                <CreateNewBoard />
            </Modal>
        </>
    )
}

export default AppLayout