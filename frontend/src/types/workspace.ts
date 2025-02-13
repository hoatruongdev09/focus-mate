import { UserData } from "./auth-type"

export enum WorkspaceRole {
    Guest = 0,
    Member = 1,
    Admin = 2,
    Owner = 3,
}

export type Workspace = {
    id: number
    name: string
    description: string
    members: WorkspaceMember[]
}

export type WorkspaceMember = {
    workspace_id: number
    user_id: number
    role: WorkspaceRole
    user: UserData
}