import { Router } from "express";
import * as authController from '../controllers/auth.controller'

const authRoute = Router()

authRoute.post('/refresh-token', authController.refreshToken)
authRoute.post('/register-email-password', authController.registerEmailPassword)
authRoute.post('/login-email-password', authController.loginEmailPassword)
authRoute.post('/validate-email', authController.validateEmail)

export default authRoute