import { Router } from "express";
import { auth } from "../middlewares/authenticate.middleware";
import * as boardThemeController from "../controllers/board-theme.controller";

const route = Router()

route.get('/', auth, boardThemeController.getAllThemes)
route.post('/:board_id/change', auth, boardThemeController.changeBoardTheme)

export default route