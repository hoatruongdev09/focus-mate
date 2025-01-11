import e, { Request, Response } from 'express'
import BoardService from '../services/board.service'
import UpdateGroupDto from '../dto/board/update-group.dto'
import CreateGroupDto from '../dto/board/create-group.dto'
import CreateTaskDto from '../dto/board/create-task.dto'
import UpdateTaskDto from '../dto/board/update-task.dto'

const boardService = new BoardService()

export const addGroup = async (req: Request, res: Response) => {
    try {
        const data: CreateGroupDto = req.body
        const group = await boardService.createGroup(data)
        res.status(200).json(group)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const updateGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data: UpdateGroupDto = req.body
        const group = await boardService.updateGroup(+id, data)
        res.status(200).json(group)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const getGroups = async (req: Request, res: Response) => {
    try {
        const data = await boardService.getGroups()
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await boardService.deleteGroup(+id)
        res.status(200).json("ok")
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data: CreateTaskDto = req.body
        const newTask = await boardService.addTask(+id, data)
        res.status(200).json(newTask)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await boardService.getTasks()
        res.status(200).json(tasks)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data: UpdateTaskDto = req.body
        const updatedTask = await boardService.updateTask(+id, data)
        res.status(200).json(updatedTask)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await boardService.deleteTask(+id)
        res.status(200).json("oke")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const fetchBoard = async (req: Request, res: Response) => {
    try {
        const board = await boardService.getBoard()
        res.status(200).json(board)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getTaskInColumn = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const tasks = await boardService.getTasksInColumn(+id)
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const reorderGroup = async (req: Request, res: Response) => {
    try {
        const { targetId, frontId, behindId }:
            {
                targetId: number
                frontId: number | null
                behindId: number | null
            } = req.body
        const task = await boardService.reorderGroup(targetId, frontId, behindId)
        res.status(200).json(task)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const archiveOrUnarchiveTask = async (req: Request, res: Response) => {
    try {
        const { task_id } = req.params
        console.log(`receive task urchive`)
        const task = await boardService.archiveOrUnarchiveTask(+task_id)
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}