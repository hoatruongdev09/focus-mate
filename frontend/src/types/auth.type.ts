import { UserData } from "./user-data"

export type AuthResult = {
    access_token: string
    refresh_token: string
    user: UserData
}
