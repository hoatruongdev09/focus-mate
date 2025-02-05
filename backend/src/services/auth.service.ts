import { Repository } from "typeorm";
import User from "../entities/user.entity";
import dataSource from "../db/data-source";
import CreateUserDto from "../dto/auth/create-user.dto";
import { compare, hash } from "../utils/password-hash";
import jwt from 'jsonwebtoken'
import UserService from "./user.service";

const tokenSecret = process.env.JWT_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET

export default class AuthService {
    userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    async refreshToken(user_id: number) {
        const user = await this.userService.getUserData(user_id)
        const accessToken = this.generateToken(user.id, user.role, tokenSecret, '24h')
        const refreshToken = this.generateToken(user.id, user.role, refreshTokenSecret, 60 * 60 * 24 * 30)

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user
        }
    }

    async loginEmailPassword(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email, true)
        if (!user || !await compare(password, user.password)) {
            throw new Error("email or password not match")
        }

        const userData = this.userService.extractUserData(user)
        const accessToken = this.generateToken(user.id, user.role, tokenSecret, '24h')
        const refreshToken = this.generateToken(user.id, user.role, refreshTokenSecret, 60 * 60 * 24 * 30)

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: userData
        }
    }

    async registerEmailPassword(data: CreateUserDto) {
        const { email } = data
        const existedUser = await this.userService.findUserByEmail(email, false)
        if (existedUser) {
            throw new Error("user is exist")
        }
        const user: User = await this.userService.createNewUser(data)

        const userData = this.userService.extractUserData(user)
        const accessToken = this.generateToken(user.id, user.role, tokenSecret, '24h')
        const refreshToken = this.generateToken(user.id, user.role, refreshTokenSecret, 60 * 60 * 24 * 30)

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: userData
        }
    }



    generateToken = (id: number, role: number, secret: string, expire: string | number) => {
        const payload = { id, role }
        return jwt.sign(payload, secret, { expiresIn: expire })
    }

    verifyToken = (token: string) => {
        return jwt.verify(token, tokenSecret)
    }

    verifyRefreshToken = (token: string) => {
        return jwt.verify(token, refreshTokenSecret)
    }

}
