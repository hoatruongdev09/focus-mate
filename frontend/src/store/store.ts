import { configureStore } from "@reduxjs/toolkit";
import { boardViewSlice } from "./slices/board-slice";
import { boardApi } from "./services/board-service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth-service";
import { authSlice } from "./slices/auth-slice";
import { appViewSlice } from "./slices/app-slice";
import { userSlice } from "./slices/user-slice";
import { userApi } from "./services/user-service";
import { boardThemeApi } from "./services/board-theme-service";
import { workspaceApi } from "./services/workspace-service";
import { workspaceViewSlice } from "./slices/workspace-slice";

export const store = configureStore({
    reducer: {
        app: appViewSlice.reducer,
        boardView: boardViewSlice.reducer,
        auth: authSlice.reducer,
        user: userSlice.reducer,
        workspaceView: workspaceViewSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [boardApi.reducerPath]: boardApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [boardThemeApi.reducerPath]: boardThemeApi.reducer,
        [workspaceApi.reducerPath]: workspaceApi.reducer
    },
    middleware: (getDefaultConfig) => getDefaultConfig()
        .concat(boardApi.middleware)
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(boardThemeApi.middleware)
        .concat(workspaceApi.middleware)
})

setupListeners(store.dispatch)

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch