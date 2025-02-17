import { NextFunction, Request, Response } from "express";
import { boardThemeService } from "../services/board-theme.service";

export const getAllThemes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await boardThemeService.getAllThemes()
        res.locals.data = data
    } catch (error) {
        console.error(error)
        res.locals.error = error
    }
    next()
}

export const changeBoardTheme = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id } = req.params
        const { theme_id } = req.body
        const data = await boardThemeService.changeBoardTheme(board_id, +theme_id)
        res.locals.data = data
    } catch (error) {
        console.error(error)
        res.locals.error = error
    }
    next()
}
