import { Router } from "express";
import * as authController from '../controllers/auth.controller'
import { refresh as refreshTokenMiddleware } from "../middlewares/refresh-token.middleware";

const route = Router()

route.post('/refresh-token', authController.refreshToken)
route.post('/register-email-password', authController.registerEmailPassword)
route.post('/login-email-password', authController.loginEmailPassword)


export default route