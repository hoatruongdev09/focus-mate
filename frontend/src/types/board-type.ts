export type AddGroupData = {
    name: string,
    description: string
}

export type AddTaskData = {
    title: string
    description: string
    priority: number
    estimate: number
    group_id: number
}

export type Group = {
    id: number
    name: string
    description: string
    rank: string
}

export type Task = {
    id: number
    title: string
    rank: string
    description: string
    priority: number
    estimate: number
    group_id: number
}

export type UpdateTaskData = {
    id: number
    title: string
    description: string | null
    priority: number
    estimate: number
    group_id: number

    front_id?: number | null
    behind_id?: number | null
}

export type UpdateGroupData = {
    id: number
    name: string
    description: string

    front_id: number | null
    behind_id: number | null
}