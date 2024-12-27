import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TaskPriority {
    Low = 0, Medium = 1, High = 2
}

export interface TaskItem {
    id: number
    title: string
    category: string
    description: string
    priority: TaskPriority
    estimate: number
    createdAt: number
}

export interface CreateTaskData {
    title: string
    description: string
    priority: TaskPriority
    category: string
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
                createdAt: Date.now()
            }
            state.tasks.push(newTask)
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks.splice(state.tasks.findIndex(t => t.id === action.payload), 1)
        },
        updateTask: (state, action: PayloadAction<TaskItem>) => {
            console.log(action.payload)
            state.tasks.splice(state.tasks.findIndex(t => t.id === action.payload.id), 1)
            state.tasks = [...state.tasks, action.payload]
        }
    }
})

export const { addTask, deleteTask, updateTask } = taskSlice.actions

export default taskSlice.reducer