import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { useRef, useState, KeyboardEvent, useCallback, ChangeEvent } from "react";
import { Group } from "../../../types/board-type";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAddTasksMutation } from "../../../store/services/board-service";

interface Props {
    column: Group
}

function NewTaskCreator(props: Props) {
    const { column } = props
    const [createTask] = useAddTasksMutation()
    const [inputValue, setInputValue] = useState('')
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const showAddInput = () => {
        setShowInput(true)
        if (inputRef && inputRef.current) {
            inputRef.current.style.display = "block"
            inputRef.current.style.height = '42px'
            inputRef.current.focus()
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
        if (inputRef && inputRef.current) {
            inputRef.current.blur()
            inputRef.current.style.display = 'none'
        }
    }
    const computeHeight = useCallback((e: React.ChangeEvent<HTMLElement>) => {
        e.target.style.height = '42px';
        // const computed = window.getComputedStyle(e.target)
        const height = e.target.scrollHeight
        // + parseInt(computed.getPropertyValue("padding-top"), 10)
        // + parseInt(computed.getPropertyValue("padding-bottom"), 10)
        e.target.style.height = `${height}px`
    }, [])

    const handleSetInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
        computeHeight(e)
    }, [setInputValue, computeHeight])


    const handleKeyPress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key.toLowerCase() == "enter") {
            e.preventDefault();
            setShowInput(false)
            if (inputRef && inputRef.current) {
                inputRef.current.blur()
                inputRef.current.style.display = 'none'
            }

            onCreateTask()
        }
    }, [inputRef, setShowInput, onCreateTask])


    return (
        <div className="w-full flex flex-col p-2">
            <div className={showInput ? '' : `h-0`}>
                <textarea
                    ref={inputRef}
                    rows={1}
                    className={`px-2 py-2 h-full w-full resize-none outline-none rounded-md ${showInput ? "border" : ""}`}
                    placeholder="Enter a title"
                    value={inputValue}
                    onChange={handleSetInput}
                    onKeyDown={handleKeyPress}
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