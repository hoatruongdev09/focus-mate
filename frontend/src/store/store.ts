import { configureStore } from "@reduxjs/toolkit";
import { boardViewSlice } from "./slices/board-slice";
import { boardApi } from "./services/board-service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth-service";

export const store = configureStore({
    reducer: {
        boardView: boardViewSlice.reducer,
        [boardApi.reducerPath]: boardApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultConfig) => getDefaultConfig()
        .concat(boardApi.middleware)
        .concat(authApi.middleware),
})

setupListeners(store.dispatch)

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch