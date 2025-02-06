import { createApi } from "@reduxjs/toolkit/query/react";
import { AddGroupData, AddTaskData, Board, CreateBoardData, Group, Task, TaskComment, UpdateBoardData, UpdateGroupData, UpdateTaskData } from "../../types/board-type";
import { baseQueryWithReauth } from "./base-query-with-reauth";

const getArchivedItemsUrl = ({ board_id, type }: { board_id: number, type: string }): string => {
    console.log(`get archive link: ${type}`)
    switch (type) {
        case "cards":
            return `board/${board_id}/archived-cards`
        case "lists":
            return `board/${board_id}/archived-lists`
        default:
            return ""
    }
}

export const boardApi = createApi({
    reducerPath: 'boardApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['board', 'columns', 'tasks', 'comments'],
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], void>({
            query: () => `/board`,
            providesTags: ['board']
        }),
        getBoard: builder.query<Board, number>({
            query: (data) => `/board/${data}`
        }),
        createBoard: builder.mutation<Board, CreateBoardData>({
            query: data => ({
                url: '/board',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['board']
        }),
        updateBoard: builder.mutation<Board, { board_id: number, data: UpdateBoardData }>({
            query: data => ({
                url: `/board/${data.board_id}`,
                body: data.data,
                method: 'POSt'
            }),
            invalidatesTags: ['board']
        }),
        getColumns: builder.query<Group[], number>({
            query: (data) => `/board/${data}/groups`,
            providesTags: ['columns']
        }),
        getTasks: builder.query<Task[], number>({
            query: (data) => `/board/${data}/tasks`,
            providesTags: ['tasks']
        }),
        addColumns: builder.mutation<Group, AddGroupData>({
            query: data => ({
                url: `/board/${data.board_id}/groups`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['columns']
        }),
        deleteColumn: builder.mutation<void, { board_id: number, column_id: number }>({
            query: data => ({
                url: `/board/${data.board_id}/groups/${data.column_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['columns']
        }),
        addTasks: builder.mutation<Group, AddTaskData>({
            query: data => ({
                url: `/board/${data.board_id}/groups/${data.group_id}/task`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['tasks']
        }),
        deleteTask: builder.mutation<void, { board_id: number, task_id: number }>({
            query: data => ({
                url: `/board/${data.board_id}/tasks/${data.task_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['tasks']
        }),
        updateTask: builder.mutation<Task, UpdateTaskData>({
            query: data => ({
                url: `/board/${data.board_id}/tasks/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['tasks']
        }),
        updateColumn: builder.mutation<Group, UpdateGroupData>({
            query: data => ({
                url: `/board/${data.board_id}/groups/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['columns']
        }),
        archiveOrUnarchiveTask: builder.mutation<Task, { board_id: number, group_id: number, task_id: number }>({
            query: data => ({
                url: `/board/${data.board_id}/${data.group_id}/tasks/${data.task_id}/archive-or-unarchive`,
                method: 'POST'
            }),
            invalidatesTags: ['tasks']
        }),
        archiveOrUnarchiveColumn: builder.mutation<Group, { board_id: number, column_id: number }>({
            query: data => ({
                url: `/board/${data.board_id}/groups/${data.column_id}/archive-or-unarchive`,
                method: 'POST'
            }),
            invalidatesTags: ['columns']
        }),
        archiveAllTasksInColumn: builder.mutation<Task[], { board_id: number, column_id: number, action: boolean }>({
            query: data => ({
                url: `/board/${data.board_id}/groups/${data.column_id}/archive-or-unarchive-all-task`,
                body: { action: data.action },
                method: 'POST'
            }),
            invalidatesTags: ['tasks']
        }),
        commentTask: builder.mutation<TaskComment, { board_id: number, column_id: number, task_id: number, content: string }>(
            {
                query: data => ({
                    url: `/board/${data.board_id}/${data.column_id}/tasks/${data.task_id}/comment`,
                    body: { content: data.content },
                    method: 'POST'
                }),
                invalidatesTags: ['comments']
            }
        ),
        getTaskComments: builder.query<TaskComment[], { board_id: number, column_id: number, task_id: number }>({
            query: data => `/board/${data.board_id}/${data.column_id}/tasks/${data.task_id}/comments`,
            providesTags: ['comments']
        }),
        postChangeTheme: builder.mutation<Board, { board_id: number, theme_id: number }>({
            query: (data) => ({
                url: `/board-theme/${data.board_id}/change`,
                body: { theme_id: data.theme_id },
                method: 'POST'
            }),
            invalidatesTags: ['board']
        }),
        getArchivedItems: builder.query<Task[] | Group[], { board_id: number, type: string }>({
            query: data => getArchivedItemsUrl(data),
            providesTags: ['tasks', 'columns']
        }),
        getArchivedTasks: builder.query<Task[], number>({
            query: board_id => `board/${board_id}/archived-cards`,
            providesTags: ['tasks']
        }),
        getArchivedColumns: builder.query<Group[], number>({
            query: board_id => `board/${board_id}/archived-lists`,
            providesTags: ['columns']
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
    useArchiveOrUnarchiveColumnMutation,
    useCommentTaskMutation,
    useGetTaskCommentsQuery,
    usePostChangeThemeMutation,
    useUpdateBoardMutation,
    useGetArchivedItemsQuery,
    useGetArchivedColumnsQuery,
    useGetArchivedTasksQuery
} = boardApi