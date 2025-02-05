import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserData } from "../../types/auth-type"
import { authApi } from "../services/auth-service"

interface AuthState {
    token?: string | null
    refresh_token?: string | null
}

const storeTokenKey = "token"
const storeRefreshTokenKey = "refresh_token"

const initialState: AuthState = {
    token: localStorage.getItem(storeTokenKey),
    refresh_token: localStorage.getItem(storeRefreshTokenKey),
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ token: string, refresh_token: string, userData: UserData }>) => {
            const { token, refresh_token } = action.payload
            state.refresh_token = refresh_token
            state.token = token
            localStorage.setItem(storeTokenKey, token)
            localStorage.setItem(storeRefreshTokenKey, refresh_token)
        },
        removeAuthData: (state) => {
            state.refresh_token = null
            state.token = null
            localStorage.removeItem(storeTokenKey)
            localStorage.removeItem(storeRefreshTokenKey)
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.loginEmailPassword.matchFulfilled, (state, { payload }) => {
                const { access_token, refresh_token } = payload
                state.token = access_token
                state.refresh_token = refresh_token

                localStorage.setItem(storeTokenKey, access_token)
                localStorage.setItem(storeRefreshTokenKey, refresh_token)
            }
        ).addMatcher(
            authApi.endpoints.refreshToken.matchFulfilled, (state, { payload }) => {
                const { access_token, refresh_token } = payload
                state.token = access_token
                state.refresh_token = refresh_token

                localStorage.setItem(storeTokenKey, access_token)
                localStorage.setItem(storeRefreshTokenKey, refresh_token)
            }
        )
    }
})

export const {
    removeAuthData,
    setAuthData
} = authSlice.actions

export default authSlice.reducer