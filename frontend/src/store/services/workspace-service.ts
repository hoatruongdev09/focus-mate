import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./base-query-with-reauth";
import { Workspace } from "../../types/workspace.type";
import { UpdateWorkspaceData } from "../../types/update-workspace-data.type";
import { ServerResponse } from "../../types/server-response.type";

export const workspaceApi = createApi({
    reducerPath: 'workspaceApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['workspace'],
    endpoints: (builder) => ({
        getWorkspaces: builder.query<ServerResponse<Workspace[]>, void>({
            query: () => `/workspace`,
            providesTags: ["workspace"]
        }),
        getWorkspace: builder.query<ServerResponse<Workspace>, string>({
            query: (workspace_id) => `/workspace/${workspace_id}`,
            providesTags: ["workspace"]
        }),
        getWorkspaceByShortName: builder.query<ServerResponse<Workspace>, string>({
            query: (short_name) => `/workspace/short-name/${short_name}`,
            providesTags: ['workspace']
        }),
        updateWorkspace: builder.mutation<ServerResponse<Workspace>, { workspace_id: string, data: UpdateWorkspaceData }>({
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