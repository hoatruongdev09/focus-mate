import { configureStore } from "@reduxjs/toolkit";
import { clockSlice } from "./slices/clock-slices";
import { taskSlice } from "./slices/task-slices";

export const store = configureStore({
    reducer: {
        clock: clockSlice.reducer,
        tasks: taskSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch