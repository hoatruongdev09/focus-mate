import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { KeyboardEvent } from "react";
import { Group } from "../../types/board-type";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAddTasksMutation } from "../../store/services/board-service";

function NewTaskCreator({ column }: { column: Group }) {
    const [createTask] = useAddTasksMutation()
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

            onCreateTask()
        }
    }

    const onCreateTask = async () => {
        const value = inputValue
        setInputValue("")
        await createTask({
            title: value,
            group_id: column.id,
            description: '',
            estimate: 1,
            priority: 1
        })
    }

    const onCancelCreateTask = () => {
        setInputValue("")
        setShowInput(false)
        if (inputRef) {
            inputRef.current?.blur()
        }
    }


    return (
        <div className="w-full flex flex-col p-2">
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
                            onClick={onCreateTask}
                        >
                            Add card
                        </button>
                        <button
                            className="hover:bg-gray-100 px-2 rounded"
                            onClick={onCancelCreateTask}
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                    </div> :
                    <button
                        className="flex py-1 gap-2 items-center rounded hover:bg-gray-100"
                        onClick={showAddInput}
                    >
                        <PlusSmallIcon className="size-6" />
                        Add a card
                    </button>
            }
        </div>
    );
}

export default NewTaskCreator;