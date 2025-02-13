import { Request, Response } from "express";
import { workspaceService } from "../services/workspace.service";

export const getWorkspace = async (req: Request, res: Response) => {
    const { workspace_id } = req.params
    const { customer_id } = req
    try {
        const workspaces = await workspaceService.getWorkspace(+workspace_id)
        res.status(200).json(workspaces)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const getWorkspaces = async (req: Request, res: Response) => {
    const { customer_id } = req
    try {
        const workspaces = await workspaceService.getWorkspaces(customer_id)
        res.status(200).json(workspaces)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const getBoards = async (req: Request, res: Response) => {
    const { workspace_id } = req.params
    const { customer_id } = req
    try {
        const boards = await workspaceService.getBoardsInWorkspace(+workspace_id, customer_id)
        res.status(200).json(boards)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const addBoard = async (req: Request, res: Response) => {
    const { workspace_id } = req.params
    const { customer_id } = req

    try {
        const board = await workspaceService.addBoard(customer_id, +workspace_id, req.body)
        res.status(200).json(board)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }

}