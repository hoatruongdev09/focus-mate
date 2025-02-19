import { NextFunction, Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken'
import { authService } from "../services/auth.service";
import resultResponse from "./result-response.middleware";

export const authenticationGuard = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
        req.isError = true
        res.locals.message = "unauthorized"
        res.locals.status = false
        res.statusCode = 401
        resultResponse(req, res)
        return
    }

    const [tag, token] = authorization.split(" ")

    if (tag !== 'Bearer') {
        req.isError = true
        res.locals.message = "unauthorized"
        res.locals.status = false
        res.statusCode = 401
        resultResponse(req, res)
        return
    }

    try {
        const { id, role } = authService.verifyToken(token) as JwtPayload
        req.customer_id = id
        req.customer_role = role
        next()
    } catch (error) {
        req.isError = true
        res.locals.message = "unauthorized"
        res.locals.status = false
        res.statusCode = 401
        resultResponse(req, res)
    }
}