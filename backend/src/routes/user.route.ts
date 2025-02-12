import { Router } from "express";
import { auth } from "../middlewares/authenticate.middleware";
import * as customerController from "../controllers/user.controller";

const userRoute = Router()

userRoute.get('/my-info', auth, customerController.getCustomerInfo)

export default userRoute