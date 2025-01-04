import { configureStore } from "@reduxjs/toolkit";
import { clockSlice } from "./slices/clock-slices";
import { taskViewSlice } from "./slices/task-view-slice";
import { columnSlice } from "./slices/column-slice";
import { columnApi } from "../services/columns";
import { setupListeners } from "@reduxjs/toolkit/query";
import { taskApi } from "../services/tasks";
import { boardViewSlice } from "./slices/boardViewSlice";

export const store = configureStore({
    reducer: {
        clock: clockSlice.reducer,
        taskView: taskViewSlice.reducer,
        columns: columnSlice.reducer,
        boardView: boardViewSlice.reducer,
        [columnApi.reducerPath]: columnApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(columnApi.middleware)
        .concat(taskApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch