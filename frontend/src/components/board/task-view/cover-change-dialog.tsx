import ButtonXClose from "../../commons/button-x-close"
import colors from "../../../data/colors"
import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "../../../store/store"
import { setViewingTask } from "../../../store/slices/board-slice"
import { CoverType, TaskLayoutType } from "../../../types/board-type"
import { useUpdateTaskMutation } from "../../../store/services/board-service"
import { useCallback } from "react"
import useClickOutside from "../../../custom-hooks/use-click-outside"

interface Props {
    isActive: boolean
    hide: () => void
}

const CoverChangeDialog = (props: Props) => {
    const { isActive, hide } = props
    const dispatch = useDispatch()
    const [updateTask] = useUpdateTaskMutation()
    const { viewingTask, board } = useSelector((state: AppRootState) => state.boardView)

    const handleSelectColor = async (color: string) => {
        if (!viewingTask || !board) { return }
        if (viewingTask.cover_value === color) { return }
        dispatch(setViewingTask({
            ...viewingTask,
            cover_type: CoverType.SolidColor,
            cover_value: color,
        }))
        updateTask({
            ...viewingTask,
            cover_type: CoverType.SolidColor,
            cover_value: color,
            board_id: board.id,
        })
    }

    const handleChangeLayout = async (layoutType: number) => {
        if (!viewingTask || !board) { return }
        if (viewingTask.layout_type === layoutType) { return }
        dispatch(setViewingTask({
            ...viewingTask,
            layout_type: layoutType,
        }))
        updateTask({
            ...viewingTask,
            layout_type: layoutType,
            board_id: board.id,
        })
    }
    const ref = useClickOutside(hide, [], [hide])

    const handleRemoveCover = useCallback(() => {
        if (!viewingTask || !board) { return }
        dispatch(setViewingTask({
            ...viewingTask,
            cover_type: CoverType.None,
            cover_value: ""
        }))
        updateTask({
            ...viewingTask,
            cover_type: CoverType.None,
            cover_value: "",
            board_id: board.id,
        })
    }, [updateTask, viewingTask, board])

    if (!isActive) {
        return <></>
    }

    return (
        <div
            ref={ref}
            className="w-72 bg-white rounded-md p-3 pb-5 absolute shadow-xl border z-10 top-10 right-0 flex flex-col"
        >
            <ButtonXClose
                buttonClassName="absolute right-1 top-1"
                onClick={hide}
            />
            <p className="text-gray-700 font-semibold text-sm text-center">Cover</p>

            <p className="text-gray-700 font-semibold text-sm mt-4">Size</p>
            <div className="flex gap-2 mt-2">
                <button
                    style={{ backgroundColor: viewingTask?.cover_type === CoverType.None ? "transparent" : viewingTask?.cover_value }}
                    className={`flex-1 h-20 rounded relative shadow ${viewingTask?.layout_type == TaskLayoutType.Normal ? "ring ring-black" : ""}`}
                    onClick={() => handleChangeLayout(TaskLayoutType.Normal)}
                >
                    <div className="absolute bottom-0 left-0 right-0 bg-white p-1 h-10 rounded-b flex flex-col justify-between">
                        <div className="bg-gray-300 h-1 w-full rounded"></div>
                        <div className="bg-gray-300 h-1 w-[80%] rounded"></div>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <div className="bg-gray-300 h-2 w-4 rounded-sm"></div>
                                <div className="bg-gray-300 h-2 w-4 rounded-sm"></div>
                            </div>
                            <div className="bg-gray-300 h-2 w-2 rounded"></div>
                        </div>
                    </div>
                </button>

                <button
                    style={{ backgroundColor: viewingTask?.cover_type === CoverType.None ? "transparent" : viewingTask?.cover_value }}
                    className={`flex-1 h-20 rounded relative shadow ${viewingTask?.layout_type == TaskLayoutType.Large ? "ring ring-black" : ""}`}
                    onClick={() => handleChangeLayout(TaskLayoutType.Large)}
                >
                    <div className="absolute bottom-0 left-0 right-0 p-1 h-10 rounded-b flex flex-col justify-between">
                        <div className="bg-gray-800 h-1 w-full rounded"></div>
                        <div className="bg-gray-800 h-1 w-[80%] rounded"></div>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <div className="bg-gray-800 h-2 w-4 rounded-sm"></div>
                                <div className="bg-gray-800 h-2 w-4 rounded-sm"></div>
                            </div>
                            <div className="bg-gray-800 h-2 w-2 rounded"></div>
                        </div>
                    </div>
                </button>
            </div>

            <p className="text-gray-700 font-semibold text-sm mt-4">Color</p>
            <div className="flex gap-1 flex-wrap mt-2 justify-between">
                {
                    colors.map((color) => (
                        <button
                            key={color}
                            style={{ backgroundColor: color }}
                            className={`w-12 h-8 rounded ${viewingTask?.cover_type != CoverType.None && viewingTask?.cover_value === color ? "outline outline-2 border-zinc-800" : ""}`}
                            onClick={() => handleSelectColor(color)}
                        >
                            <div className="w-full h-full hover:bg-gray-800 opacity-20 border-zinc-700"></div>
                        </button>
                    ))
                }

            </div>
            {
                (viewingTask?.cover_type != CoverType.None) &&
                <button
                    className="bg-zinc-200 hover:bg-zinc-300 mt-3 rounded py-2 text-sm font-semibold"
                    onClick={handleRemoveCover}
                >
                    Remove Cover
                </button>
            }
        </div >
    )
}

export default CoverChangeDialog