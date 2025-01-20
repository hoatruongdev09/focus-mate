import { Request, Response } from "express";
import UserService from "../services/user.service";

const userService: UserService = new UserService()

export const getUserInfo = async (req: Request, res: Response) => {
    try {

        const { user_id } = req
        const userData = await userService.getUserData(user_id)
        res.status(200).json(userData)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }

}