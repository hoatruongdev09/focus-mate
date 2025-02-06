import { NextFunction, Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken'
import { authService } from "../services/auth.service";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).json({ error: "unauthorized" })
        return
    }

    const [tag, token] = authorization.split(" ")

    if (tag !== 'Bearer') {
        res.status(401).json({ error: "unauthorized" })
        return
    }

    try {
        const { id, role } = authService.verifyToken(token) as JwtPayload
        req.customer_id = id
        req.customer_role = role
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json(error)
    }
}