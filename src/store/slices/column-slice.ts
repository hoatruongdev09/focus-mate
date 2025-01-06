import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ColumnData {
    id: number
    name: string
    description: string
}

export interface ColumnsData {
    columns: ColumnData[]
}

const initialState: ColumnsData = {
    columns: []
}

export const columnSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<ColumnData>) => {
            const data: ColumnData = {
                ...action.payload,
                id: Date.now(),
            }
            state.columns.push(action.payload)
        },
        updateColum: (state, action)
    }
})

