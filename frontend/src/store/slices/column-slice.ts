import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnData } from "../../types/board-type";



export interface ColumnSliceData {
    showAddingColumn: boolean,
    columns: ColumnData[],
    editingColumn: ColumnData | null
}

const initialState: ColumnSliceData = {
    showAddingColumn: false,
    columns: [],
    editingColumn: null
}

export const columnSlice = createSlice({
    name: 'column',
    initialState: initialState,
    reducers: {
        setEditingColumn: (state, action: PayloadAction<ColumnData>) => {
            state.editingColumn = action.payload
        },
        clearEditingColumn: (state) => {
            state.editingColumn = null
        },
        setShowAddingColumn: (state, action: PayloadAction<boolean>) => {
            state.showAddingColumn = action.payload
        }
    }
})

export const { setEditingColumn, clearEditingColumn, setShowAddingColumn } = columnSlice.actions

export default columnSlice.reducer