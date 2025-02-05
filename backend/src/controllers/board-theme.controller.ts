import { Request, Response } from "express";
import BoardThemeService from "../services/board-theme.service";

const boardThemeService = new BoardThemeService()

export const getAllThemes = async (req: Request, res: Response) => {
    try {
        const data = await boardThemeService.getAllThemes()
        res.status(200).json(data)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }

}
