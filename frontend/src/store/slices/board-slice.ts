import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, List, Card } from "../../types/board.type";

interface BoardTaskData {
    task: Card
    nextTimeUpdate: number
}

interface BoardViewSliceData {
    board: Board | null,
    columns: List[]
    tasks: BoardTaskData[]
    draggingColumn: List | null
    draggingTask: Card | null
    viewingTask: Card | null
}

const initialState: BoardViewSliceData = {
    board: null,
    columns: [],
    tasks: [],
    draggingColumn: null,
    draggingTask: null,
    viewingTask: null
}

export const boardViewSlice = createSlice({
    name: "boardViewSlice",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<Board | null>) => {
            state.board = action.payload
        },
        setColumns: (state, action: PayloadAction<List[]>) => {
            state.columns = action.payload
        },
        setTasks: (state, action: PayloadAction<BoardTaskData[]>) => {
            state.tasks = action.payload
        },
        setDraggingColumn: (state, action: PayloadAction<List | null>) => {
            state.draggingColumn = action.payload
        },
        setDraggingTask: (state, action: PayloadAction<Card | null>) => {
            state.draggingTask = action.payload
        },
        setViewingTask: (state, action: PayloadAction<Card | null>) => {
            state.viewingTask = action.payload
        },
        changeTaskGroup: (state, action: PayloadAction<{ id: number, groupId: number }>) => {
            const index = state.tasks.findIndex(t => t.task.id === action.payload.id)
            if (index == -1) { return }
            if (state.tasks[index].nextTimeUpdate > Date.now()) { return }
            state.tasks[index].task.list_id = action.payload.groupId
            state.tasks[index].nextTimeUpdate = Date.now() + 500
        },
    }
})

export const {
    setBoard,
    setColumns,
    setTasks,
    setDraggingColumn,
    setDraggingTask,
    setViewingTask,
    changeTaskGroup
} = boardViewSlice.actions
export default boardViewSlice.reducer