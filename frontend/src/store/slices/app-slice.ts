import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AppState {
    showLoadingScreen: boolean
    showCreateBoardModal: boolean
}

const initialState: AppState = {
    showLoadingScreen: false,
    showCreateBoardModal: false
}

export const appViewSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        showLoadingScreen: (state) => {
            state.showLoadingScreen = true
        },
        hideLoadingScreen: (state) => {
            state.showLoadingScreen = false
        },
        setShowCreateBoardModal: (state, action: PayloadAction<boolean>) => {
            state.showCreateBoardModal = action.payload
        }
    }
})

export const {
    showLoadingScreen,
    hideLoadingScreen,
    setShowCreateBoardModal
} = appViewSlice.actions

export default appViewSlice.reducer