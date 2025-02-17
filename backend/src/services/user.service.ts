import { Repository } from "typeorm";
import Customer from "../entities/customer.entity";
import dataSource from "../db/data-source";
import CreateCustomerDto from "../dto/auth/create-user.dto";
import { hash } from "../utils/password-hash";

export class CustomerService {
    userRepository: Repository<Customer>

    constructor() {
        this.userRepository = dataSource.getRepository(Customer)
    }

    generateUsername(firstName: string, lastName: string): string {
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
        const variations = [
            `${firstName}${lastName}${randomNum}`,
            `${firstName}_${lastName}_${randomNum}`,
            `${lastName}${firstName}${randomNum}`,
            `${firstName[0]}${lastName}${randomNum}`,
            `${firstName}${lastName[0]}${randomNum}`,
            `${firstName}${randomNum}`,
            `${lastName}${randomNum}`
        ];
        return variations[Math.floor(Math.random() * variations.length)];
    }

    async createNewUser(data: CreateCustomerDto) {
        const { email, password, firstName: first_name, lastName: last_name } = data
        let success = false
        let user: Customer = null
        while (!success) {
            try {
                await this.userRepository.createQueryBuilder()
                    .insert()
                    .into(Customer)
                    .values({
                        email,
                        password: await hash(password),
                        first_name,
                        last_name,
                        username: this.generateUsername(first_name, last_name)
                    }).execute()
                success = true
                user = await this.findUserByEmail(email, false)
            } catch (error) {

            }
        }
        return user
    }

    async findUserByEmail(email: string, includePassword: boolean) {
        const queryBuilder = this.userRepository.createQueryBuilder("customer")
            .where("customer.email = :email", { email })
        if (includePassword) {
            queryBuilder.addSelect("customer.password")
        }
        return await queryBuilder.getOne()
    }


    async getData(id: string) {
        const customer = await this.userRepository.findOne({
            where: { id }
        })
        if (!customer) {
            throw new Error("customer not found")
        }

        return customer

    }
}

export const customerService = new CustomerService()