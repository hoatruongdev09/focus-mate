import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AppState {
    showLoadingScreen: boolean
    createBoardModal: CreateBoardModelState
}

interface CreateBoardModelState {
    show: boolean
}

const initialState: AppState = {
    showLoadingScreen: false,
    createBoardModal: {
        show: false
    }
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
        showCreateBoardModal: (state) => {
            state.createBoardModal.show = true
        },
        hideCreateBoardModal: (state) => {
            state.createBoardModal.show = false
        }
    }
})

export const {
    showLoadingScreen,
    hideLoadingScreen,
    showCreateBoardModal,
    hideCreateBoardModal
} = appViewSlice.actions

export default appViewSlice.reducer