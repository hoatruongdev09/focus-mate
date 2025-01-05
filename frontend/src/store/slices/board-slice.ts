import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, Task } from "../../types/board-type";
import { act } from "react";

interface BoardViewSliceData {
    columns: Group[]
    tasks: Task[]
    draggingColumn: Group | null
    draggingTask: Task | null
}

const initialState: BoardViewSliceData = {
    columns: [],
    tasks: [],
    draggingColumn: null,
    draggingTask: null
}

export const boardViewSlice = createSlice({
    name: "boardViewSlice",
    initialState,
    reducers: {
        setColumns: (state, action: PayloadAction<Group[]>) => {
            state.columns = action.payload
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },
        setDraggingColumn: (state, action: PayloadAction<Group | null>) => {
            state.draggingColumn = action.payload
        },
        setDraggingTask: (state, action: PayloadAction<Task | null>) => {
            state.draggingTask = action.payload
        }
    }
})

export const { setColumns, setTasks, setDraggingColumn, setDraggingTask } = boardViewSlice.actions
export default boardViewSlice.reducer