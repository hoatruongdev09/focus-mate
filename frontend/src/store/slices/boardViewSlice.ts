import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnData, TaskItem } from "../../types/board-type";

export interface BoardViewState {
    tasks: TaskItem[]
    columns: ColumnData[]
}

const initialState: BoardViewState = {
    tasks: [],
    columns: []
}


export const boardViewSlice = createSlice({
    name: "boardViewSlice",
    initialState: initialState,
    reducers: {
        setColumns: (state, action: PayloadAction<ColumnData[]>) => {
            state.columns = action.payload
        },
        setTasks: (state, action: PayloadAction<TaskItem[]>) => {
            state.tasks = action.payload
        },
        updateTask: (state, action: PayloadAction<TaskItem>) => {
            state.tasks.splice(state.tasks.findIndex(t => t.id === action.payload.id), 1)
            state.tasks = [...state.tasks, action.payload]
        },
    }
})

export const { setTasks, setColumns, updateTask } = boardViewSlice.actions

export default boardViewSlice.reducer