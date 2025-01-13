import EllipsisHorizontalIcon from "@heroicons/react/24/solid/EllipsisHorizontalIcon";
import { Group, UpdateGroupData } from "../../../types/board-type";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUpdateColumnMutation } from "../../../store/services/board-service";

interface Props {
    column: Group
    taskCount: number
}

function ColumnHeader(props: Props) {
    const { column } = props
    const [columnName, setColumnName] = useState(column.name)
    const [updateColumn] = useUpdateColumnMutation()

    const inputRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (!inputRef || !inputRef.current) { return }
        inputRef.current.style.display = 'hidden'
    }, [inputRef])

    const computeHeight = useCallback((e: React.ChangeEvent<HTMLElement>) => {
        e.target.style.height = '24px';
        // const computed = window.getComputedStyle(e.target)
        console.log(e.target.style.height)
        const height = e.target.scrollHeight
        e.target.style.height = `${height}px`;
    }, [])

    const handleColumnNameChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setColumnName(e.target.value)
        computeHeight(e)
    }, [setColumnName, computeHeight])

    const handleInputKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key != "Enter") { return }
        e.preventDefault()
        inputRef.current?.blur()
    }, [inputRef])

    const handleInputBlur = useCallback(async (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (column.name === columnName) { return }
        const updateData: UpdateGroupData = {
            ...column,
            name: columnName,
            front_id: null,
            behind_id: null
        }
        await updateColumn(updateData)
    }, [columnName, column, updateColumn, inputRef])

    return (
        <div
            className="text-md cursor-grab p-2 flex justify-between">
            <div className="flex flex-1 items-start">
                <textarea
                    ref={inputRef}
                    rows={1}
                    className={`w-full h-full p-1 text-xs font-bold resize-none`}
                    placeholder="Enter a title"
                    value={columnName}
                    onChange={handleColumnNameChange}
                    onKeyDown={handleInputKeyDown}
                    onBlur={handleInputBlur}
                />
            </div>
            <div>
                <button className="p-1 rounded hover:bg-gray-200">
                    <EllipsisHorizontalIcon className="size-4" />
                </button>
            </div>
        </div>);
}

export default ColumnHeader;