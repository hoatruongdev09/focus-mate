import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TaskPriority {
    Low, Medium, High
}

export interface TaskItem {
    id: number
    title: string
    description: string
    priority: number
    estimate: number
    createDate: number
}

export interface CreateTaskData {
    title: string
    description: string
    priority: number
    estimate: number
}

export interface TasksData {
    tasks: TaskItem[]
}

const initialState: TasksData = {
    tasks: []
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<CreateTaskData>) => {
            const newTask: TaskItem = {
                id: Date.now(),
                ...action.payload,
                createDate: Date.now()
            }
            state.tasks.push(newTask)
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks.splice(state.tasks.findIndex(t => t.id === action.payload), 1)
        },
        updateTask: (state, action: PayloadAction<TaskItem>) => {
            state.tasks.splice(state.tasks.findIndex(t => t.id === action.payload.id), 1)
            state.tasks = [...state.tasks, action.payload]
        }
    }
})

export const getTaskPriority = (task: TaskItem): TaskPriority => {
    switch (task.priority) {
        case 1: return TaskPriority.Medium
        case 2: return TaskPriority.High
        default: return TaskPriority.Low
    }
}

export const { addTask, deleteTask, updateTask } = taskSlice.actions

export default taskSlice.reducer