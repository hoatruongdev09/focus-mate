import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import { JwtPayload } from "jsonwebtoken";
import UserService from "../services/user.service";

const userService: UserService = new UserService()
const authService: AuthService = new AuthService(userService)

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(403).json({ error: "unauthorized" })
        return
    }

    const [tag, token] = authorization.split(" ")
    console.log(`tag: ${tag}, token: ${token}`)

    if (tag !== 'Refresh') {
        console.log("tag wtf")
        res.status(403).json({ error: "unauthorized" })
        return
    }

    try {
        const { id, role } = authService.verifyRefreshToken(token) as JwtPayload
        req.user_id = id
        req.user_role = role
        next()
    } catch (error) {
        console.error(`refresh error: `, error)
        res.status(500).json(error)
    }
}