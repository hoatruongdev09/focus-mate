import { Router } from "express";
import { auth } from "../middlewares/authenticate.middleware";
import * as boardThemeController from "../controllers/board-theme.controller";

const boardThemeRoute = Router()

boardThemeRoute.get('/', auth, boardThemeController.getAllThemes)
boardThemeRoute.post('/:board_id/change', auth, boardThemeController.changeBoardTheme)

export default boardThemeRoute