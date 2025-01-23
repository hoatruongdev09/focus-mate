import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddGroupData, AddTaskData, Board, CreateBoardData, Group, Task, UpdateGroupData, UpdateTaskData } from "../../types/board-type";
import { AppRootState } from "../store";

export const boardApi = createApi({
    reducerPath: 'boardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/board',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as AppRootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['board', 'columns', 'tasks'],
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], void>({
            query: () => `/`,
            providesTags: ['board']
        }),
        getBoard: builder.query<Board, number>({
            query: (data) => `/${data}`
        }),
        createBoard: builder.mutation<Board, CreateBoardData>({
            query: data => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['board']
        }),
        getColumns: builder.query<Group[], number>({
            query: (data) => `/${data}/groups`,
            providesTags: ['columns']
        }),
        getTasks: builder.query<Task[], number>({
            query: (data) => `/${data}/tasks`,
            providesTags: ['tasks']
        }),
        addColumns: builder.mutation<Group, AddGroupData>({
            query: data => ({
                url: `${data.board_id}/groups`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['columns']
        }),
        deleteColumn: builder.mutation<void, { board_id: number, column_id: number }>({
            query: data => ({
                url: `/${data.board_id}/groups/${data.column_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['columns']
        }),
        addTasks: builder.mutation<Group, AddTaskData>({
            query: data => ({
                url: `/${data.board_id}/groups/${data.group_id}/task`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['tasks']
        }),
        deleteTask: builder.mutation<void, { board_id: number, task_id: number }>({
            query: data => ({
                url: `/${data.board_id}/tasks/${data.task_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['tasks']
        }),
        updateTask: builder.mutation<Task, UpdateTaskData>({
            query: data => ({
                url: `/${data.board_id}/tasks/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['tasks']
        }),
        updateColumn: builder.mutation<Group, UpdateGroupData>({
            query: data => ({
                url: `/${data.board_id}/groups/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['columns']
        }),
        archiveOrUnarchiveTask: builder.mutation<Task, { board_id: number, task_id: number }>({
            query: data => ({
                url: `${data.board_id}/tasks/${data.task_id}/archive-or-unarchive`,
                method: 'POST'
            }),
            invalidatesTags: ['tasks']
        }),
        archiveOrUnarchiveColumn: builder.mutation<Group, { board_id: number, column_id: number }>({
            query: data => ({
                url: `/${data.board_id}/groups/${data.column_id}/archive-or-unarchive`,
                method: 'POST'
            }),
            invalidatesTags: ['columns']
        }),
        archiveAllTasksInColumn: builder.mutation<Task[], { board_id: number, column_id: number, action: boolean }>({
            query: data => ({
                url: `${data.board_id}/groups/${data.column_id}/archive-or-unarchive-all-task`,
                body: { action: data.action },
                method: 'POST'
            }),
            invalidatesTags: ['tasks']
        })
    })
})

export const {
    useGetBoardsQuery,
    useCreateBoardMutation,
    useGetBoardQuery,
    useGetTasksQuery,
    useGetColumnsQuery,
    useAddColumnsMutation,
    useAddTasksMutation,
    useDeleteColumnMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useUpdateColumnMutation,
    useArchiveOrUnarchiveTaskMutation,
    useArchiveAllTasksInColumnMutation,
    useArchiveOrUnarchiveColumnMutation
} = boardApi