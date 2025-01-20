import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BasicUserData } from "../../types/auth-type";
import { AppRootState } from "../store";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/user`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as AppRootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getMyInfo: builder.query<BasicUserData, void>({
            query: () => `/my-info`
        })
    })
})

export const { useGetMyInfoQuery } = userApi