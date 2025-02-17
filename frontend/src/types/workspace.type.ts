import { UserData } from "./auth.type"

export enum WorkspaceRole {
    Guest = 0,
    Member = 1,
    Admin = 2,
    Owner = 3,
}

export type Workspace = {
    id: string
    name: string
    description: string
    short_name: string
    members: WorkspaceMember[]
}

export type WorkspaceMember = {
    workspace_id: string
    user_id: string
    role: WorkspaceRole
    user: UserData
}