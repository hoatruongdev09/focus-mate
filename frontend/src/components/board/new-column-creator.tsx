import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useAddColumnsMutation } from "../../store/services/board-service";
import { AddGroupData } from "../../types/board-type";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { KeyboardEvent } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";

function NewColumnCreator() {
    const [requestAddColumn] = useAddColumnsMutation()

    const board = useSelector((state: AppRootState) => state.boardView.board)
    const [inputValue, setInputValue] = useState('')
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleShowInput = useCallback(() => {
        setShowInput(true)
        if (inputRef && inputRef.current) {
            inputRef.current.style.display = "block"
            inputRef.current.style.height = "32px"
            inputRef.current.focus()
        }
    }, [inputRef, setShowInput])

    const handleCreateColumn = useCallback(async () => {
        if (!board) { return }
        const value = inputValue
        setInputValue("")
        const newColumn: AddGroupData = {
            board_id: board?.id,
            name: value,
            description: ''
        }
        await requestAddColumn(newColumn)
    }, [inputValue, setInputValue, requestAddColumn])

    const handleCancel = useCallback(() => {
        setInputValue("")
        setShowInput(false)
        if (inputRef && inputRef.current) {
            inputRef.current.style.display = "none"
            inputRef.current.style.height = "32px"
            inputRef.current.blur()
        }
    }, [setInputValue, setShowInput, inputRef])

    const handleKeyPress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key.toLowerCase() == "enter") {
            e.preventDefault();
            setShowInput(false)
            if (inputRef && inputRef.current) {
                inputRef.current.blur()
            }
            handleCreateColumn()
        }
    }, [inputRef, setShowInput, handleCreateColumn])

    const computeHeight = useCallback((e: React.ChangeEvent<HTMLElement>) => {
        e.target.style.height = "32px";
        const height = e.target.scrollHeight
        e.target.style.height = `${height}px`
    }, [])

    const handleSetInputValue = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
        computeHeight(e)
    }, [setInputValue, computeHeight])

    return (
        <div className="w-72 bg-white rounded-xl flex flex-col px-2 py-1">
            <div className={showInput ? '' : `h-0`}>
                <textarea
                    ref={inputRef}
                    rows={1}
                    className="px-2 py-1 h-full w-full resize-none"
                    placeholder="Enter a title"
                    value={inputValue}
                    onChange={handleSetInputValue}
                    onKeyDown={handleKeyPress}
                />
            </div>
            {
                showInput ?
                    <div className="flex py-1 gap-2">
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded "
                            onClick={handleCreateColumn}
                        >
                            Add list
                        </button>
                        <button
                            className="hover:bg-gray-100 px-2 rounded"
                            onClick={handleCancel}
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                    </div> :
                    <button
                        className="flex py-1 gap-2 items-center rounded hover:bg-gray-100"
                        onClick={handleShowInput}
                    >
                        <PlusSmallIcon className="size-6" />
                        Add a list
                    </button>
            }
        </div>
    );
}

export default NewColumnCreator;