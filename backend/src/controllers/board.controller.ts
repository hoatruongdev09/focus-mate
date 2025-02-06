import { Request, Response } from 'express'
import BoardService from '../services/board.service'
import UpdateGroupDto from '../dto/board/update-group.dto'
import CreateGroupDto from '../dto/board/create-group.dto'
import CreateTaskDto from '../dto/board/create-task.dto'
import UpdateTaskDto from '../dto/board/update-task.dto'
import BoardActivityService from '../services/board-activity.service'
import { ActivityType } from '../enums/activity-type'
import BoardThemeService from '../services/board-theme.service'
import UpdateBoardDto from '../dto/board/update-board.dto'

const boardService = new BoardService()
const boardActivityService = new BoardActivityService()


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
        boardActivityService.createNewActivity(req.user_id, board.id, ActivityType.CREATE_BOARD)
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
        const { board_id } = req.params
        const group = await boardService.createGroup(+board_id, req.body)
        boardActivityService.createNewActivity(req.user_id, +board_id, ActivityType.CREATE_GROUP, null, group.id)
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
        boardActivityService.createNewActivity(req.user_id, +board_id, ActivityType.CREATE_TASK, newTask.id)
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
        const { board_id, group_id, task_id } = req.params
        const task = await boardService.getTask(+board_id, +group_id, +task_id)
        if (task.archived) {
            await boardActivityService.createNewActivity(req.user_id, +board_id, ActivityType.UNARCHIVE_TASK, +task_id, +group_id);
            res.status(200).json(await boardService.unarchiveTask(+board_id, +group_id, +task_id))
        }
        else {
            await boardActivityService.createNewActivity(req.user_id, +board_id, ActivityType.ARCHIVE_TASK, +task_id, +group_id);
            res.status(200).json(await boardService.archiveTask(+board_id, +group_id, +task_id))
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}


export const archiveOrUnarchiveColumn = async (req: Request, res: Response) => {
    try {
        const { board_id, id } = req.params
        console.log(`archive column ${board_id} ${id}`)
        const column = await boardService.getGroup(+board_id, +id);
        if (!column.archived) {
            await boardActivityService.createNewActivity(req.user_id, + board_id, ActivityType.ARCHIVE_COLUMN, null, +id)
            res.status(200).json(await boardService.archiveColumn(+board_id, +id))
        }
        else {
            await boardActivityService.createNewActivity(req.user_id, + board_id, ActivityType.UNARCHIVE_COLUMN, null, +id)
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