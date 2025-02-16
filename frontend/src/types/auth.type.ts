export type AuthResult = {
    access_token: string
    refresh_token: string
    user: UserData
}

export type UserData = {
    id: number
    email: string
    first_name: string
    last_name: string
    username: string
    role: string
}