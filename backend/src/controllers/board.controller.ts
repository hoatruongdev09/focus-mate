import { Request, Response } from 'express'
import BoardService from '../services/board.service'
import UpdateGroupDto from '../dto/board/update-group.dto'
import CreateTaskDto from '../dto/board/create-task.dto'
import UpdateTaskDto from '../dto/board/update-task.dto'
import UpdateBoardDto from '../dto/board/update-board.dto'
import { AchieveGroupEventData, AchieveTaskEventData, AddGroupEventData, AddTaskEventData, BoardActivityEvent, CreateBoardEventData } from '../defines/board-activity-type'
import { defaultObserver } from '../utils/observer'

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
        const eventData: CreateBoardEventData = {
            user_id, board
        }
        defaultObserver.publish(BoardActivityEvent.CreateBoard, eventData)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
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

export const getBoard = async (req: Request, res: Response) => {
    const { user_id } = req
    const { board_id } = req.params

    try {
        const board = await boardService.getBoard(+board_id, +user_id)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const updateBoard = async (req: Request, res: Response) => {
    const { user_id } = req
    const { board_id } = req.params
    const data: UpdateBoardDto = req.body
    try {
        const board = await boardService.updateBoard(+board_id, +user_id, data)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}


export const addGroup = async (req: Request, res: Response) => {
    try {
        const { user_id } = req
        const { board_id } = req.params
        const group = await boardService.createGroup(+board_id, req.body)
        const eventData: AddGroupEventData = {
            user_id,
            group
        }
        defaultObserver.publish(BoardActivityEvent.AddList, eventData)
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
        const { user_id } = req
        const { board_id, id } = req.params
        const data: CreateTaskDto = req.body
        const task = await boardService.addTask(+board_id, +id, data)
        const eventData: AddTaskEventData = {
            user_id,
            task
        }
        defaultObserver.publish(BoardActivityEvent.AddTask, eventData)
        res.status(200).json(task)
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
        console.log(`delete task: ${board_id} ${id}`)
        await boardService.deleteTask(+board_id, +id)
        res.status(200).json("oke")
    } catch (error) {
        console.error(error)
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
        const { user_id } = req
        const { board_id, group_id, task_id } = req.params
        const task = await boardService.getTask(+board_id, +group_id, +task_id)
        const eventData: AchieveTaskEventData = {
            user_id,
            board_id: +board_id,
            task_id: +task_id,
            group_id: +group_id,
        }
        if (task.archived) {
            defaultObserver.publish(BoardActivityEvent.UnarchiveTask, eventData)
            res.status(200).json(await boardService.unarchiveTask(+board_id, +group_id, +task_id))
        }
        else {
            defaultObserver.publish(BoardActivityEvent.ArchiveTask, eventData)
            res.status(200).json(await boardService.archiveTask(+board_id, +group_id, +task_id))
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}


export const archiveOrUnarchiveColumn = async (req: Request, res: Response) => {
    try {
        const { user_id } = req
        const { board_id, id } = req.params
        const column = await boardService.getGroup(+board_id, +id);
        const eventData: AchieveGroupEventData = {
            user_id,
            board_id: +board_id,
            group_id: +id
        }
        if (!column.archived) {
            defaultObserver.publish(BoardActivityEvent.ArchiveColumn, eventData)
            res.status(200).json(await boardService.archiveColumn(+board_id, +id))
        }
        else {
            defaultObserver.publish(BoardActivityEvent.UnarchiveColumn, eventData)
            res.status(200).json(await boardService.unarchiveColumn(+board_id, +id))
        }
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

export const userCommentTask = async (req: Request, res: Response) => {
    try {
        const { board_id, group_id, task_id } = req.params
        const { content } = req.body
        const comment = await boardService.postComment(+board_id, +group_id, +task_id, req.user_id, content)
        res.status(200).json(comment)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getTaskComments = async (req: Request, res: Response) => {
    try {
        const { board_id, group_id, task_id } = req.params
        const comments = await boardService.getComments(+board_id, +group_id, +task_id)
        res.status(200).json(comments)
    }
    catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getArchivedCards = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const cards = await boardService.getArchivedCards(+board_id)
        res.status(200).json(cards)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getArchivedLists = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const cards = await boardService.getArchivedLists(+board_id)
        res.status(200).json(cards)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}