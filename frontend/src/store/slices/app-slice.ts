import { createSlice } from "@reduxjs/toolkit"

interface AppState {
    showLoadingScreen: boolean
}

const initialState: AppState = {
    showLoadingScreen: false
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
        }
    }
})

export const {
    showLoadingScreen,
    hideLoadingScreen
} = appViewSlice.actions

export default appViewSlice.reducer