import { configureStore } from "@reduxjs/toolkit";
import { boardViewSlice } from "./slices/board-slice";
import { boardApi } from "./services/board-service";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        boardView: boardViewSlice.reducer,
        [boardApi.reducerPath]: boardApi.reducer
    },
    middleware: (getDefaultConfig) => getDefaultConfig().concat(boardApi.middleware),
})

setupListeners(store.dispatch)

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch