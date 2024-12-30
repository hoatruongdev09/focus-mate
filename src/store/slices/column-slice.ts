import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ColumnData {
    id: number,
    name: string
    order_by: number
    description: string
}


export interface ColumnSliceData {
    columns: ColumnData[],
    editingColumn: ColumnData | null
}

const initialState: ColumnSliceData = {
    columns: [
        {
            id: 0,
            name: "To Do",
            order_by: 0,
            description: ""
        },
        {
            id: 1,
            name: "Doing",
            order_by: 1,
            description: ""
        },
        {
            id: 2,
            name: "Done",
            order_by: 2,
            description: ""
        },
    ],
    editingColumn: null
}

export const columnSlice = createSlice({
    name: 'column',
    initialState: initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<ColumnData>) => {
            state.columns.push({
                ...action.payload,
                id: Date.now()
            })
        },
        setEditingColumn: (state, action: PayloadAction<ColumnData>) => {
            state.editingColumn = action.payload
        },
        clearEditingColumn: (state) => {
            state.editingColumn = null
        },
        updateColumn: (state, action: PayloadAction<ColumnData>) => {
            if (action.payload == null) { return }
            state.columns.splice(state.columns.findIndex(c => c.id === action.payload.id), 1)
            state.columns = [...state.columns, action.payload]
        }
    }
})

export const { addColumn, setEditingColumn, clearEditingColumn, updateColumn } = columnSlice.actions

export default columnSlice.reducer