import { Router } from "express";
import { auth } from "../middlewares/authenticate.middleware";
import * as UserController from "../controllers/user.controller";

const route = Router()

route.get('/my-info', auth, UserController.getUserInfo)

export default route