import { BaseQueryApi, BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { AuthResult, BasicUserData } from "../../types/auth-type";
import { AppRootState } from "../store";
import { removeAuthData, setAuthData } from "../slices/auth-slice";

const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:3000`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as AppRootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth: typeof baseQuery = async (agrs, api, extraOptions) => {
    let result = await baseQuery(agrs, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const state = api.getState() as AppRootState;
        const refreshToken = state.auth.refresh_token;
        if (!refreshToken) {
            api.dispatch(removeAuthData())
            return result
        }

        const refreshResult = await baseQuery({
            url: '/auth/refresh-token',
            method: 'POST',
            body: {
                token: refreshToken
            }
        }, api, extraOptions)

        if (refreshResult.data) {
            const { access_token, refresh_token, user } = refreshResult.data as AuthResult
            api.dispatch(setAuthData({ token: access_token, refresh_token, userData: user }))
            result = await baseQuery(agrs, api, extraOptions)
        } else {
            api.dispatch(removeAuthData())
        }
    }
    return result
}

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