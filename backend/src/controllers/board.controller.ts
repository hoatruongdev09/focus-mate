import { Request, Response } from 'express'
import BoardService from '../services/board.service'
import UpdateGroupDto from '../dto/board/update-group.dto'
import CreateGroupDto from '../dto/board/create-group.dto'
import CreateTaskDto from '../dto/board/create-task.dto'
import UpdateTaskDto from '../dto/board/update-task.dto'

const boardService = new BoardService()

export const getBoards = async (req: Request, res: Response) => {
    const { user_id } = req
    try {
        const boards = await boardService.getBoards(user_id)
        res.status(200).json(boards)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const createBoard = async (req: Request, res: Response) => {
    const { user_id } = req
    try {
        const board = await boardService.createBoard(user_id, req.body)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const getBoard = async (req: Request, res: Response) => {
    const { user_id } = req
    const { board_id } = req.params

    try {
        const board = await boardService.getBoard(+board_id)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}


export const addGroup = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const group = await boardService.createGroup(+board_id, req.body)
        res.status(200).json(group)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const updateGroup = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const data: UpdateGroupDto = req.body
        const group = await boardService.updateGroup(+board_id, +id, data)
        res.status(200).json(group)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const getGroups = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const data = await boardService.getGroups(+board_id)
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json(e)
    }
}

export const deleteGroup = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        await boardService.deleteGroup(+board_id, +id)
        res.status(200).json("ok")
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const data: CreateTaskDto = req.body
        const newTask = await boardService.addTask(+board_id, +id, data)
        res.status(200).json(newTask)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const tasks = await boardService.getTasks(+board_id)
        res.status(200).json(tasks)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const data: UpdateTaskDto = req.body
        const updatedTask = await boardService.updateTask(+board_id, +id, data)
        res.status(200).json(updatedTask)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        await boardService.deleteTask(+board_id, +id)
        res.status(200).json("oke")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const fetchBoard = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const board = await boardService.getBoardColumnsAndTasks(+board_id)
        res.status(200).json(board)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getTaskInColumn = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const tasks = await boardService.getTasksInColumn(+board_id, +id)
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
        const { id } = req.params
        const task = await boardService.archiveOrUnarchiveTask(+id)
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const archiveOrUnarchiveColumn = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const task = await boardService.archiveOrUnarchiveColumn(+board_id, +id)
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const archiveOrUnarchiveTasksInColumn = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        const { action } = req.body
        await boardService.archiveOrUnarchiveTasksInColumn(+board_id, +id, action)
        res.status(200).json({ message: "oke" })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}