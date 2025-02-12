import { UserData } from "./auth-type"

export type Workspace = {
    id: string
    name: string
    description: string
    members: WorkspaceMember[]
}

export type WorkspaceMember = {
    workspace_id: number
    user_id: number
    role: number
    user: UserData
}