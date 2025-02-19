import { Router } from "express";
import { authenticationGuard } from "../middlewares/authentication-guard.middleware";
import * as boardThemeController from "../controllers/board-theme.controller";

const boardThemeRoute = Router()

boardThemeRoute.get('/', authenticationGuard, boardThemeController.getAllThemes)
boardThemeRoute.post('/:board_id/change', authenticationGuard, boardThemeController.changeBoardTheme)

export default boardThemeRoute