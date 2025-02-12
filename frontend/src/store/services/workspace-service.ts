import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./base-query-with-reauth";
import { Workspace } from "../../types/workspace";

export const workspaceApi = createApi({
    reducerPath: 'workspaceApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['workspace'],
    endpoints: (builder) => ({
        getWorkspaces: builder.query<Workspace[], void>({
            query: () => `/workspace`,
            providesTags: ["workspace"]
        })
    })
})

export const {
    useGetWorkspacesQuery
} = workspaceApi