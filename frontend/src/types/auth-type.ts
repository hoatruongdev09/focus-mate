export type AuthResult = {
    access_token: string
    refresh_token: string
    user: BasicUserData
}

export type BasicUserData = {
    id: number
    email: string
    first_name: string
    last_name: string
    role: string
}