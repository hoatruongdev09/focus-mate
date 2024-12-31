import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ColumnData } from "../types/board-type";


export interface CreateColumnData {
    name: string
    description: string
}

export const columnApi = createApi({
    reducerPath: 'boardApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/board' }),
    tagTypes: ['Column'],
    endpoints: (builder) => ({
        getColumns: builder.query<ColumnData[], void>({
            query: () => '/groups',
            providesTags: ['Column']
        }),
        addColumn: builder.mutation<ColumnData, CreateColumnData>({
            query: (data) => ({
                url: '/groups',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Column']
        }),
        updateColumn: builder.mutation<ColumnData, ColumnData>({
            query: (data) => ({
                url: `/groups/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Column']
        })
    })
})

export const { useGetColumnsQuery, useAddColumnMutation, useUpdateColumnMutation } = columnApi

