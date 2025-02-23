import { Request, Response } from "express";
import { workspaceService } from "../services/workspace.service";
import { NextFunction } from "express-serve-static-core";

export const getWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    const { customer_id } = req
    try {
        res.locals.data = await workspaceService.getById(workspace_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getWorkspaces = async (req: Request, res: Response, next: NextFunction) => {
    const { customer_id } = req
    try {
        res.locals.data = await workspaceService.getWorkspaces(customer_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getBoardsInWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    const { customer_id } = req
    try {
        res.locals.data = await workspaceService.getBoardsInWorkspace(workspace_id, customer_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const addBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    const { customer_id } = req

    try {
        res.locals.data = await workspaceService.addBoard(customer_id, workspace_id, req.body)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const updateWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    const { customer_id } = req

    try {
        res.locals.data = await workspaceService.updateWorkspace(workspace_id, req.body)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getWorkspaceByShortName = async (req: Request, res: Response, next: NextFunction) => {
    const { short_name } = req.params
    const { customer_id } = req

    try {
        res.locals.data = await workspaceService.getByShortName(short_name)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getBoardsInWorkspaceByShortname = async (req: Request, res: Response, next: NextFunction) => {
    const { short_name } = req.params
    const { customer_id } = req
    try {
        res.locals.data = await workspaceService.getBoardsInWorkspaceByShortname(short_name, customer_id)
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const getWorkspaceBoardByName = async (req: Request, res: Response, next: NextFunction) => {
    const { short_name, board_name } = req.params
    try {
        const board = await workspaceService.getBoardByName(short_name, board_name)
        res.locals = {
            status: board != null,
            data: board,
            message: board == null ? "Board not found" : "ok"
        }
        res.statusCode = board == null ? 404 : 200
    } catch (error) {
        res.locals.error = error
    }

    next()
}

export const getMembers = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    try {
        const members = await workspaceService.getWorkspaceMember(workspace_id)
        res.locals = {
            status: true,
            data: members,
        }
    }
    catch (error) {
        console.error(error)
        res.locals.error = error
    }
    next()
}

export const createInviteLink = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    try {
        const workspace = await workspaceService.createInviteLink(workspace_id)
        res.locals.status = true
        res.locals.data = workspace
    } catch (error) {
        console.error(error)
        res.locals.error = error
    }
    next()
}

export const disableInviteLink = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    try {
        const workspace = await workspaceService.disableInviteLink(workspace_id)
        res.locals.status = true
        res.locals.data = workspace
    } catch (error) {
        res.locals.error = error
    }
    next()
}

export const inviteByLink = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    const { customer_id } = req
    const { invite_id } = req.body
    if (!workspace_id || !invite_id) {
        res.statusCode = 403
        res.locals.message("invite link is not valid")
        next()
        return
    }
    try {
        await workspaceService.inviteByLink(workspace_id, invite_id, customer_id)
        const workspace = await workspaceService.getById(workspace_id)
        res.locals.data = workspace
    } catch (error) {
        console.error(error)
        res.locals.error = error
    }
    next()
}