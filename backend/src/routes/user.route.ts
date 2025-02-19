import { Router } from "express";
import { authenticationGuard } from "../middlewares/authentication-guard.middleware";
import * as customerController from "../controllers/user.controller";

const userRoute = Router()

userRoute.get('/my-info', authenticationGuard, customerController.getCustomerInfo)

export default userRoute