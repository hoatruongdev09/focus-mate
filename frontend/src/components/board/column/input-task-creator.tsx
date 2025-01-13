import { useRef, useState, useCallback, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
    onCreateTask: (str: string) => void
    onCancel: () => void
}

function InputTaskCreator(props: Props) {
    const { onCreateTask, onCancel } = props
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (!inputRef || !inputRef.current) {
            return
        }
        inputRef.current.focus()
    }, [inputRef])

    const handleCreateTask = useCallback(async () => {
        const value = inputValue
        setInputValue("")
        onCreateTask(value)
    }, [inputValue, setInputValue, onCreateTask])

    const handleCancel = useCallback(() => {
        setInputValue("")
        if (inputRef) {
            inputRef.current?.blur()
        }
        onCancel();
    }, [onCancel, inputRef])


    const computeHeight = useCallback((e: React.ChangeEvent<HTMLElement>) => {
        e.target.style.height = '24px';
        // const computed = window.getComputedStyle(e.target)
        console.log(e.target.style.height)
        const height = e.target.scrollHeight
        e.target.style.height = `${height}px`;
    }, [])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
        computeHeight(e)
    }, [inputValue, setInputValue, computeHeight])


    const detectEnterKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key.toLowerCase() == "enter") {
            e.preventDefault();
            if (inputRef) {
                inputRef.current?.blur()
            }

            handleCreateTask()
        }
    }, [inputRef, inputValue, setInputValue, handleCreateTask])

    return (
        <div className="w-full flex flex-col p-2">
            <textarea
                ref={inputRef}
                rows={1}
                className="px-2 py-1 h-full w-full resize-none"
                placeholder="Enter a title"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={detectEnterKeyPress}
            />
            <div className="flex py-1 gap-2">
                <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={handleCreateTask}
                >
                    Add card
                </button>
                <button
                    className="hover:bg-gray-100 px-2 rounded"
                    onClick={handleCancel}
                >
                    <XMarkIcon className="size-5" />
                </button>
            </div>
        </div>
    );
}

export default InputTaskCreator;