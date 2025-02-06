import { useSelector } from "react-redux"
import { AppRootState } from "../../../store/store"
import TextEditor, { CustomDescendant, EditorRef } from "../../text-editor/components/text-editor"
import { useCallback, useRef, useState } from "react"
import { EditorElement } from "../../text-editor/text-editor-element"
import { useCommentCardMutation } from "../../../store/services/board-service"
import { CardComment } from "../../../types/board-type"

interface Props {
    onAddComment: (comment: CardComment) => void
}

const TaskCommentInput = (props: Props) => {
    const { onAddComment } = props
    const user = useSelector((state: AppRootState) => state.user.data)
    const [postComment] = useCommentCardMutation()
    const { viewingTask, board } = useSelector((state: AppRootState) => state.boardView)
    const [content, setContent] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const [isContentEmpty, setIsContentEmpty] = useState(true)

    const handleChange = useCallback((value: string) => {
        setContent(value)
    }, [setContent])

    const inputRef = useRef<EditorRef>()

    const handleOnBlur = useCallback(() => {

    }, [])
    const handleSetOnFocus = useCallback((focus: boolean) => {
        setIsFocus(focus)
    }, [setIsFocus])

    const isEmptyOrSpaces = useCallback((str: string) => {
        return str === null || str.length === 0 || str.match(/^ *$/) !== null;
    }, [])

    const handleRawValueChanged = useCallback((items: CustomDescendant[]) => {
        let isEmpty = true
        for (let item of items) {
            for (let text of (item as EditorElement).children) {
                isEmpty = isEmpty && isEmptyOrSpaces(text.text)
            }
        }
        setIsContentEmpty(isEmpty)
    }, [setIsContentEmpty, isEmptyOrSpaces])

    const clearInput = useCallback(() => {

        inputRef?.current?.clear()
        setContent("")
        setIsFocus(false)
        setIsContentEmpty(true)
    }, [setIsContentEmpty, setIsFocus, setContent, inputRef])


    const handleSaveComment = useCallback(async () => {
        if (isContentEmpty || !viewingTask || !board) { return }
        const { id, list_id: group_id } = viewingTask
        clearInput()
        try {
            const { data } = await postComment({
                board_id: board.id,
                column_id: group_id,
                card_id: id,
                content: content
            })
            if (data) {
                onAddComment(data)
            }
        } catch (err) {
            console.error(err)
        }
    }, [clearInput, isContentEmpty, content, viewingTask, board, postComment, onAddComment])

    return (
        <div className="flex gap-2 items-start">
            <div className="w-10 h-10 flex-col items-start">
                <img
                    src={`https://avatar.iran.liara.run/public/${user?.id ?? 34}`}
                    className="w-full h-full rounded-full object-cover"
                />
            </div>

            <div className="flex-1 flex-col">
                <TextEditor
                    ref={inputRef}
                    value={content}
                    onChange={handleChange}
                    onRawValueChange={handleRawValueChanged}
                    isActive={isFocus}
                    onBlur={handleOnBlur}
                    setIsActive={handleSetOnFocus}
                    placeHolder="Write a comment"
                />
                {
                    isFocus && <div className="flex mt-2">
                        {
                            isContentEmpty ?
                                <button disabled className="bg-gray-200 px-3 py-1 rounded text-gray-400">Save</button>
                                :
                                <button
                                    className="bg-blue-500 px-3 py-1 rounded text-white"
                                    onClick={handleSaveComment}
                                >
                                    Save
                                </button>
                        }
                    </div>
                }
            </div>

        </div>
    )
}

export default TaskCommentInput