import { useCallback, useState } from "react"
import Modal from "../components/modal"
import CreateNewBoard from "../components/workspace/create-new-board"
import { useGetBoardsQuery } from "../store/services/board-service"
import { NavLink } from "react-router-dom"

const Workspace = () => {
    const { data: boards, isLoading } = useGetBoardsQuery()
    const [isShowCreateBoard, setIsShowCreateBoard] = useState(false)

    const handleHideCreateBoard = useCallback(() => {
        setIsShowCreateBoard(false)
    }, [setIsShowCreateBoard])

    const handleShowCreateBoard = useCallback(() => {
        setIsShowCreateBoard(true)
    }, [setIsShowCreateBoard])

    if (isLoading) {
        return <></>
    }

    return (
        <>
            <div className="fixed left-0 right-0 top-10 bottom-0">
                <div className="w-full md:w-[1000px] mt-20 mx-auto flex flex-col gap-3">
                    <div className="flex">
                        <p className="text-3xl font-extrabold leading-none">Boards:</p>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center ">
                        {
                            boards?.map((b) => (
                                <NavLink to={`/u/board/${b.id}`} key={`board-link-${b.id}`} >
                                    <div className="h-24 w-48 bg-rose-300 bg-opacity-65 rounded cursor-pointer hover:bg-opacity-100">
                                        <p className="p-2 font-bold ">{b.name}</p>
                                    </div>
                                </NavLink>
                            ))
                        }
                        <button
                            onClick={handleShowCreateBoard}
                            className="relative h-24 w-48 bg-white bg-opacity-65 rounded hover:bg-opacity-100 flex flex-col items-center justify-center"
                        >
                            <p className="">Create new board</p>
                        </button>
                    </div>
                </div>
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