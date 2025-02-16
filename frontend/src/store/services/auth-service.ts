import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResult } from "../../types/auth.type";
import { ServerResponse } from "../../types/server-response.type";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth' }),
    endpoints: (builder) => ({
        loginEmailPassword: builder.mutation<ServerResponse<AuthResult>, { email: string, password: string }>({
            query: data => ({
                url: `/login-email-password`,
                method: 'POST',
                body: data
            })
        }),
        refreshToken: builder.mutation<ServerResponse<AuthResult>, { refresh_token: string }>({
            query: data => ({
                url: `/refresh_token`,
                method: 'POST',
                headers: {
                    "authorization": `Refresh ${data}`
                }
            })
        }),
        validateEmail: builder.mutation<ServerResponse<boolean>, string>({
            query: (email) => ({
                url: `/validate-email`,
                method: 'POST',
                body: { email }
            })
        }),
        registerEmailPassword: builder.mutation<ServerResponse<AuthResult>, { email: string, password: string, firstName: string, lastName: string }>({
            query: data => ({
                url: '/register-email-password',
                method: 'POST',
                body: data
            })
        })
    })
})



export const {
    useLoginEmailPasswordMutation,
    useRefreshTokenMutation,
    useValidateEmailMutation,
    useRegisterEmailPasswordMutation
} = authApi    