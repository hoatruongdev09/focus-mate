import { NextFunction, Request, Response } from "express";
import { workspaceService } from "../services/workspace.service";
import resultResponse from "./result-response.middleware";
import WorkspaceRole from "../enums/workspace-role";



export const mountWorkspaceById = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    if (!workspace_id) {
        res.locals.message = "Workspace is not found"
        res.locals.status = false
        res.statusCode = 404
        resultResponse(req, res)
    }
    const workspace = await workspaceService.getById(workspace_id)
    if (!workspace) {
        res.locals.message = "Workspace is not found"
        res.locals.status = false
        res.statusCode = 404
        resultResponse(req, res)
    }
    else {
        req.workspace = workspace
        next()
    }
}

export const mountWorkspaceByShortName = async (req: Request, res: Response, next: NextFunction) => {
    const { short_name } = req.params
    if (!short_name) {
        res.locals.message = "Workspace is not found"
        res.locals.status = false
        res.statusCode = 404
        resultResponse(req, res)
    }
    const workspace = await workspaceService.getByShortName(short_name)
    if (!workspace) {
        res.locals.message = "Workspace is not found"
        res.locals.status = false
        res.statusCode = 404
        resultResponse(req, res)
    }
    else {
        req.workspace = workspace
        next()
    }
}

export const workspaceAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace, customer_id } = req
    try {
        const memberRole = await workspaceService.getMemberRoleInWorkspace(customer_id, workspace.id)
        if (!memberRole) {
            res.locals.message = "unauthorized"
            res.locals.status = false
            res.statusCode = 403
            resultResponse(req, res)
        }
        else {
            next()
        }
    } catch (error) {
        res.locals.error = error
        resultResponse(req, res)
    }
}

export const workspaceAdminAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace, customer_id } = req
    try {
        const memberRole = await workspaceService.getMemberRoleInWorkspace(customer_id, workspace.id)
        if (!memberRole || ![WorkspaceRole.Admin, WorkspaceRole.Owner].includes(memberRole.role)) {
            res.locals.message = "unauthorized"
            res.locals.status = false
            res.statusCode = 403
            resultResponse(req, res)
        }
        else {
            next()
        }
    } catch (error) {
        res.locals.error = error
        resultResponse(req, res)
    }
}
