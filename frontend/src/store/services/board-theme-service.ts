import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-query-with-reauth";
import { BoardTheme } from "../../types/board.type";

export const boardThemeApi = createApi({
    reducerPath: 'boardThemeApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['theme'],
    endpoints: (builder) => ({
        getThemes: builder.query<BoardTheme[], void>({
            query: () => `/board-theme`
        })
    })
})

export const {
    useGetThemesQuery
} = boardThemeApi