import { createApi } from "@reduxjs/toolkit/query/react";
import { BasicUserData } from "../../types/auth-type";
import { baseQueryWithReauth } from "./base-query-with-reauth";


export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ['user'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getMyInfo: builder.query<BasicUserData, void>({
            query: () => `/user/my-info`,
            providesTags: ['user']
        })
    })
})

export const { useGetMyInfoQuery } = userApi