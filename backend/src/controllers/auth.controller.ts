import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import CreateUserDto from "../dto/auth/create-user.dto";
import UserService from "../services/user.service";

const userService: UserService = new UserService()
const authService: AuthService = new AuthService(userService)

export const refreshToken = async (req: Request, res: Response) => {
    const { user_id } = req
    try {
        const result = await authService.refreshToken(user_id)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const registerEmailPassword = async (req: Request, res: Response) => {
    const data: CreateUserDto = req.body
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
    try {
        const result = await authService.loginEmailPassword(email, password)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}