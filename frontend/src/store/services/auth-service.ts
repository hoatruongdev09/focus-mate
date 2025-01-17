import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResult } from "../../types/auth-type";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth' }),
    endpoints: (builder) => ({
        loginEmailPassword: builder.mutation<AuthResult, { email: string, password: string }>({
            query: data => ({
                url: `/login-email-password`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useLoginEmailPasswordMutation } = authApi    