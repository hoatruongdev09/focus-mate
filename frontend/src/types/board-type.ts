export enum CoverType {
    None = 0,
    SolidColor = 1,
    Gradient = 2
}

export enum TaskLayoutType {
    Normal = 0,
    Large = 1
}

export type Board = {
    id: number
    name: string
    description: string
    cover_type: CoverType
    cover_value: string
}

export type CreateBoardData = {
    title: string,
    description: string
}

export type AddGroupData = {
    board_id: number
    name: string
    description: string
}

export type AddTaskData = {
    title: string
    description: string
    priority: number
    estimate: number
    group_id: number
    board_id: number
}

export type Group = {
    id: number
    name: string
    description: string
    rank: string
    archived: boolean
    board_id: number
}

export type Task = {
    id: number
    title: string
    rank: string
    description: string
    priority: number
    estimate: number
    group_id: number
    archived: boolean
    cover_type: CoverType
    cover_value: string
    layout_type: TaskLayoutType
}

export type UpdateTaskData = {
    id: number
    title: string
    description: string | null
    cover_type: CoverType
    cover_value: string
    layout_type: number
    priority: number
    estimate: number
    group_id: number
    board_id: number

    front_id?: number | null
    behind_id?: number | null
}

export type UpdateGroupData = {
    id: number
    board_id: number
    name: string
    description: string

    front_id: number | null
    behind_id: number | null
}

export type TaskComment = {
    id: number
    user_id: number
    board_id: number
    group_id: number
    task_id: number
    content: string
    created_at: Date
    updated_at: Date
    user: {
        id: number
        first_name: number
        last_name: number
    }
}

