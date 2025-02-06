import { Group, UpdateGroupData } from "../../../types/board-type";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAddTasksMutation, useArchiveAllTasksInColumnMutation, useArchiveOrUnarchiveColumnMutation, useUpdateColumnMutation } from "../../../store/services/board-service";
import ColumnContextMenu from "./context-menu.tsx/column-context-menu";
import { HashtagIcon } from "@heroicons/react/24/solid";
import InputTaskCreator from "./input-task-creator";

interface Props {
    column: Group
    taskCount: number
}

function ColumnHeader(props: Props) {
    const { column } = props
    const [columnName, setColumnName] = useState(column.name)
    const [updateColumn] = useUpdateColumnMutation()
    const [archiveColumn] = useArchiveOrUnarchiveColumnMutation()
    const [archiveTasksInColumn] = useArchiveAllTasksInColumnMutation()
    const [createTask] = useAddTasksMutation()

    const [showCreateTaskInput, setShowCreateTaskInput] = useState(false)
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

    const handleShowCreateTask = () => {
        setShowCreateTaskInput(true)
    };

    const handleCreateTask = useCallback(async (str: string) => {
        setShowCreateTaskInput(false)
        await createTask({
            title: str,
            group_id: column.id,
            board_id: column.board_id,
            description: '',
            estimate: 1,
            priority: 1
        })
    }, [setShowCreateTaskInput, createTask])

    const handleCancelCreateTask = useCallback(() => {
        setShowCreateTaskInput(false)
    }, [setShowCreateTaskInput])

    const handleArchiveColumn = useCallback(() => {
        console.log(`archive columns`)
        archiveColumn({ board_id: column.board_id, column_id: column.id })
    }, [column, archiveColumn])

    const handleArchiveTasksInList = () => {
        archiveTasksInColumn({ board_id: column.board_id, column_id: column.id, action: true })
    }

    return (
        <>
            <div className="text-md cursor-grab p-2 flex justify-between gap-1">
                <div className="p-1">
                    <HashtagIcon className="size-4" />
                </div>
                <div className="flex flex-1 items-start">
                    <textarea
                        ref={inputRef}
                        rows={1}
                        className={`w-full h-full p-1 text-xs font-bold resize-none cursor-default`}
                        placeholder="Enter a title"
                        value={columnName}
                        onChange={handleColumnNameChange}
                        onKeyDown={handleInputKeyDown}
                        onBlur={handleInputBlur}
                    />
                </div>
                <ColumnContextMenu
                    setShowCreateTask={handleShowCreateTask}
                    archiveList={handleArchiveColumn}
                    archiveTasksInList={handleArchiveTasksInList}
                />
            </div>
            {
                showCreateTaskInput && <InputTaskCreator
                    onCreateTask={handleCreateTask}
                    onCancel={handleCancelCreateTask}
                />
            }
        </>
    );
}

export default ColumnHeader;