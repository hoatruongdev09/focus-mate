import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddGroupData, AddTaskData, Group, Task, UpdateGroupData, UpdateTaskData } from "../../types/board-type";

export const boardApi = createApi({
    reducerPath: 'boardApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/board' }),
    tagTypes: ['columns', 'tasks'],
    endpoints: (builder) => ({
        getColumns: builder.query<Group[], void>({
            query: () => '/groups',
            providesTags: ['columns']
        }),
        getTasks: builder.query<Task[], void>({
            query: () => '/tasks',
            providesTags: ['tasks']
        }),
        addColumns: builder.mutation<Group, AddGroupData>({
            query: data => ({
                url: `/groups`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['columns']
        }),
        deleteColumn: builder.mutation<void, number>({
            query: data => ({
                url: `/groups/${data}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['columns']
        }),
        addTasks: builder.mutation<Group, AddTaskData>({
            query: data => ({
                url: `/groups/${data.group_id}/task`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['tasks']
        }),
        deleteTask: builder.mutation<void, number>({
            query: data => ({
                url: `/tasks/${data}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['tasks']
        }),
        updateTask: builder.mutation<Task, UpdateTaskData>({
            query: data => ({
                url: `/tasks/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['tasks']
        }),
        updateColumn: builder.mutation<Group, UpdateGroupData>({
            query: data => ({
                url: `/groups/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['columns']
        })
    })
})

export const { useGetTasksQuery,
    useGetColumnsQuery,
    useAddColumnsMutation,
    useAddTasksMutation,
    useDeleteColumnMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useUpdateColumnMutation
} = boardApi