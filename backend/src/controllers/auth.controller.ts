import { Request, Response } from "express";
import CreateCustomerDto from "../dto/auth/create-user.dto";
import { JwtPayload } from "jsonwebtoken";
import { authService } from "../services/auth.service";


export const refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body
    try {
        const { id } = authService.verifyRefreshToken(token) as JwtPayload
        const result = await authService.refreshToken(id)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const registerEmailPassword = async (req: Request, res: Response) => {
    const data: CreateCustomerDto = req.body
    try {
        const result = await authService.registerEmailPassword(data)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const loginEmailPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(`${email} ${password}`)
    try {
        const result = await authService.loginEmailPassword(email, password)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}