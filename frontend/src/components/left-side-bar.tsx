import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../store/store";
import { Workspace } from "../types/workspace.type";
import { Board } from "../types/board.type";
import { setCurrentWorkspace } from "../store/slices/workspace-slice";
import { setShowCreateBoardModal } from "../store/slices/app-slice";
import { useGetWorkspaceByShortNameQuery } from "../store/services/workspace-service";
import { useGetWorkspaceBoardsByShortNameQuery } from "../store/services/board-service";

interface Props {
    workspace: Workspace
}

function LeftSideBar(props: Props) {
    const { workspace } = props
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(true)
    const board = useSelector((state: AppRootState) => state.boardView.board)
    const location = useLocation()
    const { board_name } = useParams()

    const [selectingMenu, setSelectingMenu] = useState<string>("")

    const {
        data: boards,
        isLoading: isLoadingBoards,
        isError: isLoadingBoardsError,
        error: loadBoardsError
    } = useGetWorkspaceBoardsByShortNameQuery(workspace.short_name)

    useEffect(() => {
        if (board_name) {
            setSelectingMenu(board_name)
            return
        }
        const splits = location.pathname.split("/")
        setSelectingMenu(splits[splits.length - 1])
    }, [location, board_name])

    if (isLoadingBoards) {
        return <>Loading</>
    }

    if (!workspace || !boards) {
        return null
    }

    const handleOpenCreateBoard = () => {
        dispatch(setShowCreateBoardModal(true))
    }

    return (
        <div
            style={getBackgroundStyle()}
            className={`h-full ${isOpen ? "w-64" : "w-8"} border-r border-gray-300 border-opacity-50 relative transition-all duration-300`}
        >
            {
                !isOpen && <button
                    className="absolute top-4 -right-3 p-1 rounded-full bg-zinc-500 border border-gray-300 border-opacity-50 transition-all duration-300 delay-300"
                    onClick={() => setIsOpen(true)}
                >
                    <ChevronRightIcon className="size-4" />
                </button>
            }
            <div className={`h-full ${isOpen ? "translate-x-0" : "-translate-x-64"} transition-all duration-300 flex flex-col`}>
                <div className="flex gap-2 items-center h-14 px-2 border-gray-300 border-b border-opacity-50">
                    <div className="size-10 rounded bg-red-700 flex items-center justify-center">
                        <p className="text-white font-bold text-lg">W</p>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold ">{workspace.name}</p>
                            <p className="text-sm ">Free</p>
                        </div>
                        <button
                            className="hover:bg-zinc-100 bg-opacity-60 p-1 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            <ChevronLeftIcon className="size-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col py-2 gap-3">
                    <div className="flex flex-col">
                        <Link
                            to={`/w/${workspace.short_name}/boards`}
                            className={`hover:bg-zinc-700 hover:bg-opacity-50 bg-opacity-50 px-4 py-2 flex gap-2 items-center text-sm ${"boards" == selectingMenu ? "bg-zinc-700" : ""}`}
                        >
                            <UserIcon className="size-4" /> Boards
                        </Link>
                        <Link
                            to='/'
                            className="hover:bg-zinc-700 hover:bg-opacity-50 bg-opacity-50 px-4 py-2 flex gap-2 items-center text-sm"
                        >
                            <UserIcon className="size-4" /> Members
                        </Link>
                        <Link
                            to='/'
                            className="hover:bg-zinc-700 hover:bg-opacity-50 bg-opacity-50 px-4 py-2 flex gap-2 items-center text-sm"
                        >
                            <UserIcon className="size-4" /> Workspace settings
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center px-2 justify-between">
                            <p className="font-semibold text-sm">Your boards</p>
                            <button
                                className="hover:bg-zinc-500 p-1 rounded hover:bg-opacity-50"
                                onClick={handleOpenCreateBoard}
                            >
                                <PlusIcon className="size-4" />
                            </button>
                        </div>
                        <div className="flex flex-col">
                            {
                                boards && boards.data.map(b => (
                                    <Link
                                        key={`size-bar-board-${b.id}`}
                                        to={`/w/${workspace.short_name}/${b.name}`}
                                        className={`flex items-center gap-2 px-2 py-2 hover:bg-zinc-700 hover:bg-opacity-50 bg-opacity-50 ${b.name == selectingMenu ? "bg-zinc-600" : ""}`}
                                    >
                                        <div
                                            style={getBoardBackgroundStyle(b)}
                                            className="h-6 w-8 rounded bg-slate-800"
                                        />
                                        <p className="text-sm">{b.name}</p>
                                    </Link>
                                ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function getBoardBackgroundStyle(board: Board | null | undefined) {
        let bgStyle: React.CSSProperties | undefined = undefined;
        if (board && board.theme) {
            bgStyle = { background: `${board.theme.fg_value}`, color: "white" };
        } else {
            bgStyle = { background: "#fff" };
        }
        return bgStyle;
    }

    function getBackgroundStyle() {
        let bgStyle: React.CSSProperties | undefined = undefined;
        if (board && board.theme) {
            bgStyle = { background: `${board.theme.fg_value}`, color: "white" };
        } else {
            bgStyle = { background: "#fff" };
        }
        return bgStyle;
    }
}

export default LeftSideBar;