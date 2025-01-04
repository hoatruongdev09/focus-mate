import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnData, TaskItem } from "../../types/board-type";
import { CreateTaskData } from "../../services/tasks";


export interface TaskViewSliceData {
    selectingTask: TaskItem | null
    creatingTask: CreateTaskData
    selectingColumn: ColumnData | null
    allTasks: TaskItem[]
}

export interface UpdateTaskData {
    title: string
    description: string
    priority: number
    estimate: number
    column_id: number
    order_by: number
}

const initialState: TaskViewSliceData = {
    selectingTask: null,
    selectingColumn: null,
    creatingTask: {
        title: "",
        description: "",
        estimate: 1,
        priority: 0,
    },
    allTasks: []
}

export const taskViewSlice = createSlice({
    name: 'taskView',
    initialState: initialState,
    reducers: {
        setSelectingTask: (state, action: PayloadAction<TaskItem>) => {
            state.selectingTask = action.payload
            console.log(`selecting task: `, state.selectingTask)
        },
        clearSelectingTask: (state) => {
            state.selectingTask = null
        },
        setCreatingTask: (state, action: PayloadAction<CreateTaskData>) => {
            state.creatingTask = action.payload
        },
        clearCreatingTask: (state) => {
            state.creatingTask = {
                title: "",
                description: "",
                estimate: 1,
                priority: 0,
            }
        },
        setSelectingColumn: (state, action: PayloadAction<ColumnData>) => {
            state.selectingColumn = action.payload
        },
        clearSelectingColumns: (state) => {
            state.selectingColumn = null
        }
    }
})

export const {
    setSelectingTask,
    clearSelectingTask,
    setCreatingTask,
    clearCreatingTask,
    setSelectingColumn,
    clearSelectingColumns,
} = taskViewSlice.actions

export default taskViewSlice.reducer