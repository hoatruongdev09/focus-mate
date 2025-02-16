import { Request, Response } from "express";
import CreateCustomerDto from "../dto/auth/create-user.dto";
import { JwtPayload } from "jsonwebtoken";
import { authService } from "../services/auth.service";
import { customerService } from "../services/user.service";


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
    try {
        const result = await authService.registerEmailPassword(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const loginEmailPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const result = await authService.loginEmailPassword(email, password)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const validateEmail = async (req: Request, res: Response) => {
    const { email } = req.body
    try {
        const user = await customerService.findUserByEmail(email, false)
        if (user) {
            throw new Error("Email is existed")
        }
        setTimeout(() => {
            res.status(200).json({ isValid: user == null })
        }, 3000);
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}