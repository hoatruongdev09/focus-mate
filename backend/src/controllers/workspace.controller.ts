import { Request, Response } from "express";
import { workspaceService } from "../services/workspace.service";

export const getWorkspaces = async (req: Request, res: Response) => {
    const { customer_id } = req
    try {
        const workspaces = await workspaceService.getJoinedWorkspaces(customer_id)
        res.status(200).json(workspaces)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const getBoards = async (req: Request, res: Response) => {
    const { workspace_id } = req.params

    try {
        const boards = await workspaceService.getBoardsInWorkspace(+workspace_id)
        res.status(200).json(boards)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}