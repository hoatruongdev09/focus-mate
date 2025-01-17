import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BasicUserData } from "../../types/auth-type"

interface UserSliceData {
    token?: string | null
    refresh_token?: string | null
    userData?: BasicUserData | undefined
}

const storeTokenKey = "token"
const storeRefreshTokenKey = "refresh_token"

const initialState: UserSliceData = {
    token: localStorage.getItem(storeTokenKey),
    refresh_token: localStorage.getItem(storeRefreshTokenKey),
    userData: undefined
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ token: string, refresh_token: string, userData: BasicUserData }>) => {
            const { token, refresh_token, userData } = action.payload
            state.refresh_token = refresh_token
            state.token = token
            state.userData = userData
            localStorage.setItem(storeTokenKey, token)
            localStorage.setItem(storeRefreshTokenKey, refresh_token)
        },
        removeAuthData: (state) => {
            state.refresh_token = null
            state.token = null
            state.userData = undefined
            localStorage.removeItem(storeTokenKey)
            localStorage.removeItem(storeRefreshTokenKey)
        }
    }
})