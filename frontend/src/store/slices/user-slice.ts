import { createSlice } from "@reduxjs/toolkit";
import { BasicUserData } from "../../types/auth-type";
import { userApi } from '../services/user-service'
interface UserState {
    data?: BasicUserData | undefined
}

const initialState: UserState = {
    data: undefined
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.getMyInfo.matchFulfilled, (state, { payload }) => {
                state.data = payload
            }
        )
    }
})