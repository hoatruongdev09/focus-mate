import { useGetBoardsQuery } from "../../store/services/board-service"
import { NavLink } from "react-router-dom"


interface Props {
    handleShowCreateBoard: () => void
}

const WorkspaceBoardPage = (props: Props) => {
    const { handleShowCreateBoard } = props

    const { data: boards, isLoading } = useGetBoardsQuery()

    if (isLoading) {
        return <></>
    }
    return (
        <>
            <div className="flex-1 py-10 xl:flex-none xl:w-[1200px] flex flex-col gap-3">
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
        </>
    )
}

export default WorkspaceBoardPage