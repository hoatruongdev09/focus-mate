import { CheckIcon, ChevronDownIcon, EyeIcon } from "@heroicons/react/16/solid";
import { WindowIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux"
import { useUpdateTaskMutation } from "../../../store/services/board-service"
import { AppRootState } from "../../../store/store"
import { useCallback, useMemo, useState } from "react"
import { setViewingTask } from "../../../store/slices/board-slice";
import ColumnMoveDialog from "./column-move-dialog";

const TaskHeader = () => {
    const dispatch = useDispatch()
    const board = useSelector((state: AppRootState) => state.boardView.board)
    const [updateTask] = useUpdateTaskMutation()
    const { viewingTask, columns } = useSelector((state: AppRootState) => state.boardView)

    if (!viewingTask) { return (<></>) }

    const [state, setState] = useState({
        titleHeight: 60,
        showChangeColumn: false,
        wasEditTitle: false
    })

    const taskColumn = useMemo(() => columns.find(c => c.id === viewingTask.group_id), [viewingTask])

    const computeHeight = useCallback((e: React.ChangeEvent<HTMLElement>) => {
        e.target.style.height = "32px";
        const height = e.target.scrollHeight
        e.target.style.height = `${height}px`
    }, [])
    const handleTitleChanged = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, wasEditTitle: true })
        dispatch(setViewingTask({
            ...viewingTask,
            title: e.target.value
        }))
        computeHeight(e)
    }, [dispatch, state, setState, setViewingTask, viewingTask, computeHeight])

    const handleOutOfFocus = useCallback(() => {
        if (!state.wasEditTitle || !board) { return }
        setState({ ...state, wasEditTitle: false })
        updateTask({
            ...viewingTask,
            board_id: board.id,
        })
    }, [state, setState, updateTask, viewingTask, board])

    const handleShowChangeColumnDialog = useCallback(() => {
        setState({ ...state, showChangeColumn: true })
    }, [state, setState])

    return (
        <div className="flex gap-2">
            <div className="w-9 h-10 flex items-center justify-center">
                <WindowIcon className="size-6" />
            </div>
            <div className="flex flex-col flex-1">
                <textarea
                    rows={1}
                    className="p-1 h-9 font-semibold text-xl bg-gray-50 flex resize-none"
                    value={viewingTask.title}
                    onChange={handleTitleChanged}
                    onBlur={handleOutOfFocus}
                />
                <div className="flex flex-col ml-1">
                    <div className="h-8 flex items-center gap-1 relative">
                        <p className="text-sm text-gray-700 rounded pt-0">in list</p>
                        <div className="bg-slate-300 bg-opacity-25 px-1 py-0.5 text-xs flex 
                                        gap-1 items-center justify-center
                                         hover:cursor-pointer"
                            onClick={handleShowChangeColumnDialog}
                        >
                            <p className="font-semibold text-gray-700">{taskColumn?.name}</p>
                            <ChevronDownIcon className="size-5 font-semibold text-gray-700" />
                        </div>

                        <div className="absolute top-8 left-0">
                            <ColumnMoveDialog isActive={state.showChangeColumn} hide={() => setState({
                                ...state,
                                showChangeColumn: false
                            })} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-1 mt-5">
                        <p className="font-semibold text-sm text-gray-500">Notification</p>
                        <div>
                            <button className="flex items-center gap-1 bg-slate-300 
                                        bg-opacity-25 py-1 px-2 justify-center rounded">
                                <EyeIcon className="size-4 text-gray-700" />
                                <p className="text-sm font-semibold text-gray-700">Watched</p>
                                <CheckIcon className="size-4 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskHeader