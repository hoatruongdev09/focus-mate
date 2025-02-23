import { createSlice } from "@reduxjs/toolkit";
import { userApi } from '../services/user-service'
import { UserData } from "../../types/user-data";
interface UserState {
    data?: UserData | undefined
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