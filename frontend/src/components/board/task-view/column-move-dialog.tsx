import { XMarkIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../store/store";
import { useUpdateCardMutation } from "../../../store/services/board-service";
import { UpdateCardData } from "../../../types/board.type";
import { setViewingTask } from "../../../store/slices/board-slice";
import useClickOutside from "../../../custom-hooks/use-click-outside";

interface Props {
    isActive: boolean
    hide: () => void
}

function ColumnMoveDialog(props: Props) {
    const { isActive, hide } = props
    const dispatch = useDispatch()
    const { viewingTask, columns, tasks, board } = useSelector((state: AppRootState) => state.boardView)
    const [selectingColumnId, setSelectingColumnId] = useState<number>(viewingTask?.list_id ?? 0)

    const [updateTask] = useUpdateCardMutation()

    const currentTaskIndex = tasks.findIndex(t => t.task.id == viewingTask?.id)
    const [selectingPosition, setSelectingPosition] = useState(currentTaskIndex)

    const filteredTasks = useMemo(() => tasks.filter(t => t.task.list_id === selectingColumnId), [tasks, selectingColumnId])

    const ref = useClickOutside(hide, [], [hide])

    const onChangeColumn = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const colId: number = +e.target.value
        setSelectingColumnId(colId)
        if (colId == viewingTask?.list_id) {
            setSelectingPosition(currentTaskIndex)
        } else {
            setSelectingPosition(0)
        }
    }, [setSelectingColumnId, viewingTask, currentTaskIndex])

    const onChangePosition = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setSelectingPosition(+e.target.value)
    }, [setSelectingPosition])

    const doUpdateTask = useCallback(async (data: UpdateCardData) => {
        const { data: updatedTask, error } = await updateTask(data)
        if (updatedTask) {
            dispatch(setViewingTask(updatedTask))
            hide()
        }
    }, [dispatch, updateTask, hide])

    const onMoveTask = useCallback(async () => {
        if (!viewingTask || !board) { return }

        const data: UpdateCardData = {
            ...viewingTask,
            board_id: board.id
        }
        if (selectingPosition != currentTaskIndex || selectingColumnId != viewingTask.list_id) {
            data.list_id = selectingColumnId
            if (filteredTasks.length > 0) {
                const behindTaskId: number | null = selectingPosition >= filteredTasks.length ? null : filteredTasks[selectingPosition].task.id
                const frontTaskId: number | null = selectingPosition - 1 < 0 ? null : filteredTasks[selectingPosition - 1].task.id
                data.behind_id = behindTaskId
                data.front_id = frontTaskId
            }
        }

        doUpdateTask(data)
    }, [doUpdateTask, viewingTask, board, selectingColumnId, selectingPosition, currentTaskIndex, filteredTasks])




    return (

        isActive ?
            < div ref={ref} className="w-72 h-72 bg-white rounded-md p-3 relative shadow-xl border z-10" >
                <div className="w-full h-full flex flex-col items-center justify-between">
                    <button
                        className="absolute right-3 top-3 text-gray-700  rounded p-1 hover:bg-gray-100"
                        onClick={hide}
                    >
                        <XMarkIcon className="size-4" />
                    </button>
                    <p className="text-gray-700 font-semibold text-sm relative">Move card</p>
                    <div className="w-full">
                        <p className="text-gray-500 font-semibold text-xs">Select destination</p>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <p className="text-gray-700 font-bold text-sm">Board</p>
                        <select className="border p-1">

                            <option>trello clone</option>
                            <option>trello clone1</option>
                        </select>
                    </div>
                    <div className="flex gap-2 w-full items-center justify-between">

                        <div className="flex flex-col gap-2 flex-1">
                            <p className="text-gray-700 font-bold text-sm">List</p>
                            <select
                                className="border p-1"
                                value={selectingColumnId}
                                onChange={e => onChangeColumn(e)}
                            >
                                {
                                    columns.map(c => (
                                        <option key={`select-col-${c.id}`} value={c.id}>
                                            {c.name} {c.id == viewingTask?.list_id ? "(current)" : ""}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-20">
                            <p className="text-gray-700 font-bold text-sm">Position</p>
                            <select className="border p-1"
                                value={selectingPosition}
                                onChange={e => onChangePosition(e)}
                            >
                                {
                                    filteredTasks.length > 0 ?
                                        filteredTasks.map((t, i) => (
                                            <option
                                                value={i}
                                                key={`col-${selectingColumnId}-${i}`}
                                            >
                                                {i + 1} {selectingColumnId == viewingTask?.list_id && i == currentTaskIndex ? '(current)' : ''}</option>
                                        )) :
                                        <option value={0}>1</option>
                                }
                            </select>
                        </div>

                    </div>
                    <div className="w-full">
                        <button
                            className="bg-blue-600 px-5 py-1 rounded text-white"
                            onClick={onMoveTask}
                        >
                            Move
                        </button>
                    </div>
                </div>

            </div > :
            <></>

    );
}

export default ColumnMoveDialog;