import { Router } from "express";
import { auth } from "../middlewares/authenticate.middleware";
import { getAllThemes } from "../controllers/board-theme.controller";

const route = Router()

route.get('/', auth, getAllThemes)

export default route