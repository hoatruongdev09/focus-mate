import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { JwtPayload } from "jsonwebtoken";

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
        next()
        return
    }
    const [tag, token] = authorization.split(" ")
    if (tag !== 'Bearer') {
        next()
        return
    }
    try {
        const { id, role } = authService.verifyToken(token) as JwtPayload
        req.customer_id = id
        req.customer_role = role
    } catch (error) {
        console.error(error)
    }
    next()
}