import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./base-query-with-reauth";
import { Workspace } from "../../types/workspace";
import { UpdateWorkspaceData } from "../../types/update-workspace-data";

export const workspaceApi = createApi({
    reducerPath: 'workspaceApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['workspace'],
    endpoints: (builder) => ({
        getWorkspaces: builder.query<Workspace[], void>({
            query: () => `/workspace`,
            providesTags: ["workspace"]
        }),
        getWorkspace: builder.query<Workspace, number>({
            query: (workspace_id) => `/workspace/${workspace_id}`,
            providesTags: ["workspace"]
        }),
        getWorkspaceByShortName: builder.query<Workspace, string>({
            query: (short_name) => `/workspace/short-name/${short_name}`,
            providesTags: ['workspace']
        }),
        updateWorkspace: builder.mutation<Workspace, { workspace_id: number, data: UpdateWorkspaceData }>({
            query: (data) => ({
                url: `/workspace/${data.workspace_id}`,
                body: data.data,
                method: 'POST'
            }),
            invalidatesTags: ["workspace"]
        })
    })
})

export const {
    useGetWorkspacesQuery,
    useGetWorkspaceByShortNameQuery,
    useGetWorkspaceQuery,
    useUpdateWorkspaceMutation,
} = workspaceApi