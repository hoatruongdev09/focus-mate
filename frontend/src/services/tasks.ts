import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskItem, TaskPriority } from "../types/board-type";
import { UpdateTaskData } from "../store/slices/task-view-slice";


export interface CreateTaskData {
    title: string
    description: string
    priority: TaskPriority
    estimate: number
}

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/board' }),
    endpoints: (builder) => ({
        getTasks: builder.query<TaskItem[], number>({
            query: (columnId) => `/groups/${columnId}/tasks`
        }),
        addTask: builder.mutation<TaskItem, { columnId: number, data: CreateTaskData }>({
            query: (param) => ({
                url: `/groups/${param.columnId}/task`,
                method: 'POST',
                body: param.data
            })
        }),
        updateTask: builder.mutation<TaskItem, { taskId: number, data: UpdateTaskData }>({
            query: (param) => ({
                url: `/tasks/${param.taskId}`,
                method: 'PUT',
                body: param.data
            })
        })
    })
})

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation } = taskApi