export interface ColumnData {
    id: number,
    name: string
    order_by: number
    description: string
}

export enum TaskPriority {
    Low = 0, Medium = 1, High = 2
}

export interface TaskItem {
    id: number
    title: string
    description: string
    priority: TaskPriority
    order_by: number
    estimate: number
    created_at: Date
    updated_at: Date
    group: ColumnData
}


export interface Board {
    tasks: TaskItem[]
    columns: ColumnData[]
}