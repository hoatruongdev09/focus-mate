import { NextFunction, Request, Response } from "express";

export const mountWorkspaceById = async (req: Request, res: Response, next: NextFunction) => {
    const { workspace_id } = req.params
    next()
}

export const mountWorkspaceByShortName = async (req: Request, res: Response, next: NextFunction) => {
    next()
}

export const workspaceAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    next()
}
