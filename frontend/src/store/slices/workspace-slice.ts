import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace } from "../../types/workspace";

interface WorkspaceViewSliceData {
    currentWorkspace: Workspace | null
    workspaces: Workspace[]
}

const initialState: WorkspaceViewSliceData = {
    currentWorkspace: null,
    workspaces: []
}

export const workspaceViewSlice = createSlice({
    name: "workspaceViewSlice",
    initialState,
    reducers: {
        setCurrentWorkspace: (state, action: PayloadAction<Workspace | null>) => {
            state.currentWorkspace = action.payload
        },
        setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
            state.workspaces = action.payload
        }
    }
})

export const {
    setCurrentWorkspace,
    setWorkspaces
} = workspaceViewSlice.actions

export default workspaceViewSlice.reducer