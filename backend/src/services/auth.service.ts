import Customer from "../entities/customer.entity";
import CreateCustomerDto from "../dto/auth/create-user.dto";
import { compare, hash } from "../utils/password-hash";
import jwt from 'jsonwebtoken'
import { CustomerService, customerService } from "./user.service";
import { workspaceService, WorkspaceService } from "./workspace.service";

const tokenSecret = process.env.JWT_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET

export class AuthService {
    customerService: CustomerService
    workspaceService: WorkspaceService

    constructor(customerService: CustomerService, workspaceService: WorkspaceService) {
        this.customerService = customerService
        this.workspaceService = workspaceService
    }

    async refreshToken(user_id: string) {
        const user = await this.customerService.getData(user_id)
        const accessToken = this.generateToken(user.id, user.role, tokenSecret, '24h')
        const refreshToken = this.generateToken(user.id, user.role, refreshTokenSecret, 60 * 60 * 24 * 30)

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user
        }
    }

    async loginEmailPassword(email: string, password: string) {
        const user = await this.customerService.findUserByEmail(email, true)
        if (!user || !await compare(password, user.password)) {
            throw new Error("email or password not match")
        }

        const accessToken = this.generateToken(user.id, user.role, tokenSecret, '24h')
        const refreshToken = this.generateToken(user.id, user.role, refreshTokenSecret, 60 * 60 * 24 * 30)

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user
        }
    }

    async registerEmailPassword(data: CreateCustomerDto) {
        const { email } = data
        const existedUser = await this.customerService.findUserByEmail(email, false)
        if (existedUser) {
            throw new Error("user is exist")
        }
        const user: Customer = await this.customerService.createNewUser(data)
        await this.workspaceService.createWorkspace(user.id, user.username, `${user.username}'s workspace`, '')

        const accessToken = this.generateToken(user.id, user.role, tokenSecret, '24h')
        const refreshToken = this.generateToken(user.id, user.role, refreshTokenSecret, 60 * 60 * 24 * 30)

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user
        }
    }



    generateToken = (id: string, role: number, secret: string, expire: string | number) => {
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

export const authService: AuthService = new AuthService(customerService, workspaceService)