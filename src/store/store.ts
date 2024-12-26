import { configureStore } from "@reduxjs/toolkit";
import { clockSlice } from "./slices/clock-slices";

export const store = configureStore({
    reducer: {
        clock: clockSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch