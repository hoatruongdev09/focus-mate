import Board from "../entities/board.entity"
import { Group } from "../entities/column.entity"
import { Task } from "../entities/task.entity"

export enum BoardActivityEvent {
    CreateBoard = "CreateBoard",
    AddList = "AddList",
    AddTask = "AddTask",
    ArchiveTask = "ArchiveTask",
    UnarchiveTask = "UnarchiveTask",
    ArchiveColumn = "ArchiveColumn",
    UnarchiveColumn = "UnarchiveColumn",
    DeleteTask = "DeleteTask",
    DeleteGroup = "DeleteGroup"
}

export type CreateBoardEventData = {
    user_id: number
    board: Board
}

export type AddGroupEventData = {
    user_id: number
    group: Group
}

export type RemoveGroupEventData = {
    user_id: number
    group_id: number
}

export type AddTaskEventData = {
    user_id: number
    task: Task
}

export type RemoveTaskEventData = {
    user_id: number
    group_id: number
    task_id: number
}

export type AchieveTaskEventData = {
    user_id: number
    group_id: number
    board_id: number
    task_id: number
}

export type AchieveGroupEventData = {
    user_id: number
    board_id: number
    group_id: number
}