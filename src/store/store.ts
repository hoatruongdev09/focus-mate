import { configureStore } from "@reduxjs/toolkit";
import { clockSlice } from "./slices/clock-slices";
import { taskSlice } from "./slices/task-slices";
import { taskViewSlice } from "./slices/task-view-slice";
import { columnSlice } from "./slices/column-slice";

export const store = configureStore({
    reducer: {
        clock: clockSlice.reducer,
        tasks: taskSlice.reducer,
        taskView: taskViewSlice.reducer,
        columns: columnSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch