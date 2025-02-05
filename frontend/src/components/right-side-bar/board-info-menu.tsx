import { UserIcon } from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "../../store/store"
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid"
import TextEditor, { EditorRef } from "../text-editor/components/text-editor"
import { useCallback, useRef, useState } from "react"
import { setBoard } from "../../store/slices/board-slice"
import { useUpdateBoardMutation } from "../../store/services/board-service"

interface Props {
    isShow: boolean
}

const BoardInfoMenu = (props: Props) => {
    const { isShow } = props
    const dispatch = useDispatch()
    const board = useSelector((state: AppRootState) => state.boardView.board)
    const [updateBoard] = useUpdateBoardMutation()
    const [descriptionContent, setDescriptionContent] = useState<string>(board?.description ?? "")
    const [onFocus, setOnFocus] = useState(false)

    const textEditorRef = useRef<EditorRef | null | undefined>()

    const handleSetOnFocus = useCallback((focus: boolean) => {
        setOnFocus(focus)
    }, [setOnFocus])

    const handleChange = useCallback((value: string) => {
        setDescriptionContent(value)
    }, [setDescriptionContent, board, dispatch])

    const handleDiscardDescription = useCallback(() => {
        setOnFocus(false)
        if (board && board.description.length > 0) {
            setDescriptionContent(board.description)
            if (textEditorRef && textEditorRef.current) {
                textEditorRef.current.setValue(board.description)
            }
        } else {
            console.log("wtf")
            setDescriptionContent("")
            if (textEditorRef && textEditorRef.current) {
                textEditorRef.current.clear()
            }
        }
    }, [setDescriptionContent, board, setOnFocus, textEditorRef])

    const handleSaveDescription = useCallback(async () => {
        if (!board) { return }

        dispatch(setBoard({ ...board, description: descriptionContent }))
        setOnFocus(false)
        await updateBoard({
            board_id: board.id, data: {
                title: board.name,
                description: descriptionContent
            }
        })
    }, [descriptionContent, setDescriptionContent, board, dispatch, setOnFocus, textEditorRef, updateBoard])

    return (
        <div className={`absolute inset-0 transition-all duration-100 overflow-y-scroll ${isShow ? "opacity-100 -translate-x-0" : "opacity-0 translate-x-96"} `}>
            <div className="w-full flex flex-col px-4 mt-2 gap-2">
                <div className="flex gap-2 items-center">
                    <UserIcon className="size-5 text-zinc-800" />
                    <p className="font-semibold text-zinc-800">Board admins</p>
                </div>
                <div className="flex gap-3 items-start">
                    <img
                        src={`https://avatar.iran.liara.run/public/${board?.owner.id ?? 34}`}
                        className="size-12"
                    />
                    <div className="flex flex-col">
                        <p className="font-semibold text-zinc-800">{board?.owner.first_name} {board?.owner.last_name}</p>
                        <p className="font-semibold text-zinc-800 text-sm">{board?.owner.email}</p>
                    </div>
                </div>

                <div className="flex-col gap-2 mt-3">
                    <div className="flex gap-2 items-start">
                        <Bars3BottomLeftIcon className="size-5 text-zinc-800" />
                        <p className="font-semibold text-zinc-800">Description</p>
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                        <TextEditor
                            ref={textEditorRef}
                            value={descriptionContent}
                            isActive={onFocus}
                            setIsActive={handleSetOnFocus}
                            onChange={handleChange}
                            placeHolder="Add a description to let your teammates know what this board is used for. you'll get bonus points if your add instructions for how to collaborate!"
                        />
                        {onFocus && <div className="flex items-center gap-3">
                            <button
                                onClick={handleSaveDescription}
                                className="bg-blue-600 px-2 py-1 rounded text-white font-semibold hover:bg-blue-500"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleDiscardDescription}
                                className="px-2 py-1 rounded text-zinc-800 font-semibold hover:bg-zinc-300"
                            >
                                Cancel
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardInfoMenu