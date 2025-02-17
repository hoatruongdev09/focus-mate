import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { authService } from "../services/auth.service";


export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(403).json({ error: "unauthorized" })
        return
    }

    const [tag, token] = authorization.split(" ")

    if (tag !== 'Refresh') {
        res.status(403).json({ error: "unauthorized" })
        return
    }

    try {
        const { id, role } = authService.verifyRefreshToken(token) as JwtPayload
        req.customer_id = id
        req.customer_role = role
        next()
    } catch (error) {
        console.error(`refresh error: `, error)
        res.status(500).json(error)
    }
}