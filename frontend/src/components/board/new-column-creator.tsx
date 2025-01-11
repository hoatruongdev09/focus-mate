import { useRef, useState } from "react";
import { useAddColumnsMutation } from "../../store/services/board-service";
import { AddGroupData } from "../../types/board-type";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { KeyboardEvent } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function NewColumnCreator() {
    const [requestAddColumn] = useAddColumnsMutation()

    const [inputValue, setInputValue] = useState('')
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const showAddInput = () => {
        setShowInput(true)
        if (inputRef) {
            inputRef.current?.focus()
        }
    }

    const detectEnterKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key.toLowerCase() == "enter") {
            e.preventDefault();
            setShowInput(false)
            if (inputRef) {
                inputRef.current?.blur()
            }
            onCreateColumn()
        }
    }

    const onCreateColumn = async () => {
        const value = inputValue
        setInputValue("")
        const newColumn: AddGroupData = {
            name: value,
            description: ''
        }
        await requestAddColumn(newColumn)
    }

    const onCancelCreateColumn = () => {
        setInputValue("")
        setShowInput(false)
        if (inputRef) {
            inputRef.current?.blur()
        }
    }
    return (
        <div className="w-72 bg-white rounded-xl flex flex-col px-2 py-1">
            <div className={showInput ? '' : `h-0`}>
                <textarea
                    ref={inputRef}
                    className="px-2 py-1 h-full w-full"
                    placeholder="Enter a title"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => detectEnterKeyPress(e)}
                />
            </div>
            {
                showInput ?
                    <div className="flex py-1 gap-2">
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                            onClick={onCreateColumn}
                        >
                            Add list
                        </button>
                        <button
                            className="hover:bg-gray-100 px-2 rounded"
                            onClick={onCancelCreateColumn}
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                    </div> :
                    <button
                        className="flex py-1 gap-2 items-center rounded hover:bg-gray-100"
                        onClick={showAddInput}
                    >
                        <PlusSmallIcon className="size-6" />
                        Add a list
                    </button>
            }
        </div>
    );
}

export default NewColumnCreator;