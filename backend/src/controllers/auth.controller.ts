import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { authService } from "../services/auth.service";
import { customerService } from "../services/user.service";
import { ResponseData } from "../middlewares/result-response.middleware";


export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body
    try {
        const { id } = authService.verifyRefreshToken(token) as JwtPayload
        const result = await authService.refreshToken(id)
        res.locals.data = result
    } catch (error) {
        res.locals.error = error
        res.locals.message = "internal server error"
        res.statusCode = 500
    }
    next()
}

export const registerEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.registerEmailPassword(req.body)
        res.locals = {
            data: result,
        }
    } catch (error) {
        res.locals = {
            error,
            message: "Internal server error"
        }
        res.statusCode = 500
    }
    next()
}

export const loginEmailPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    try {
        const result = await authService.loginEmailPassword(email, password)
        res.locals.data = result
    } catch (error) {
        res.locals.error = error
        res.locals.message = "internal server error"
        res.statusCode = 500
    }
    next()
}

export const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    try {
        const user = await customerService.findUserByEmail(email, false)

        res.locals = {
            responseCode: 1,
            data: user == null,
            message: user == null ? "ok" : "Email is existed",
            status: user == null ? true : false
        }
    } catch (error) {
        res.locals = {
            error,
            message: "Internal server error"
        }
        res.statusCode = 500
    }
    next()
}