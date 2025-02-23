import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace } from "../../types/workspace.type";
import { Board } from "../../types/board.type";

interface WorkspaceViewSliceData {
    currentWorkspace: Workspace | null
    workspaces: Workspace[]
    currentWorkspaceBoards: Board[]
}

const initialState: WorkspaceViewSliceData = {
    currentWorkspace: null,
    workspaces: [],
    currentWorkspaceBoards: []
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
        },
        setCurrentWorkspaceBoards: (state, action: PayloadAction<Board[]>) => {
            state.currentWorkspaceBoards = action.payload
        }
    }
})

export const {
    setCurrentWorkspace,
    setWorkspaces,
    setCurrentWorkspaceBoards

} = workspaceViewSlice.actions

export default workspaceViewSlice.reducer