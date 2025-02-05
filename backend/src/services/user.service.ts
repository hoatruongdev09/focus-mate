import { Repository } from "typeorm";
import User from "../entities/user.entity";
import dataSource from "../db/data-source";
import CreateUserDto from "../dto/auth/create-user.dto";
import { hash } from "../utils/password-hash";

export default class UserService {
    userRepository: Repository<User>

    constructor() {
        this.userRepository = dataSource.getRepository(User)
    }

    async createNewUser(data: CreateUserDto) {
        const { email, password, first_name, last_name } = data
        const user: User = new User()
        user.email = email
        user.password = await hash(password)
        user.first_name = first_name
        user.last_name = last_name

        return await this.userRepository.save(user)
    }

    async findUserByEmail(email: string, includePassword: boolean) {
        const queryBuilder = this.userRepository.createQueryBuilder("user")
            .where("user.email = :email", { email })
        if (includePassword) {
            queryBuilder.addSelect("user.password")
        }
        return await queryBuilder.getOne()
    }


    async getUserData(id: number) {
        const user = await this.userRepository.findOne({
            where: { id }
        })
        if (!user) {
            throw new Error("user not found")
        }

        return this.extractUserData(user)

    }

    extractUserData = (user: User) => {
        const { id, email, first_name, last_name, role } = user
        return {
            id,
            email,
            first_name,
            last_name,
            role
        }
    }
}