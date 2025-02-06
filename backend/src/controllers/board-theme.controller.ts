import { Request, Response } from "express";
import { boardThemeService } from "../services/board-theme.service";

export const getAllThemes = async (req: Request, res: Response) => {
    try {
        const data = await boardThemeService.getAllThemes()
        res.status(200).json(data)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}

export const changeBoardTheme = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params
        const { theme_id } = req.body
        const data = await boardThemeService.changeBoardTheme(+board_id, +theme_id)
        res.status(200).json(data)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
}
