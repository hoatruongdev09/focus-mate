import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskItem } from "./task-slices";

export interface TaskViewSliceData {
    selectingTask: TaskItem | null
}

export interface UpdateTaskData {
    title: string
    description: string
    priority: number
    estimate: number
}

const initialState: TaskViewSliceData = {
    selectingTask: null
}

export const taskViewSlice = createSlice({
    name: 'taskView',
    initialState: initialState,
    reducers: {
        setSelectingTask: (state, action: PayloadAction<TaskItem>) => {
            state.selectingTask = action.payload
        },
        clear: (state) => {
            state.selectingTask = null
        }
    }
})

export const { setSelectingTask, clear } = taskViewSlice.actions

export default taskViewSlice.reducer