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

    async createNewUser(data: CreateCustomerDto) {
        const { email, password, first_name, last_name } = data
        const customer: Customer = new Customer()
        customer.email = email
        customer.password = await hash(password)
        customer.first_name = first_name
        customer.last_name = last_name

        return await this.userRepository.save(customer)
    }

    async findUserByEmail(email: string, includePassword: boolean) {
        const queryBuilder = this.userRepository.createQueryBuilder("customer")
            .where("customer.email = :email", { email })
        if (includePassword) {
            queryBuilder.addSelect("customer.password")
        }
        return await queryBuilder.getOne()
    }


    async getData(id: number) {
        const customer = await this.userRepository.findOne({
            where: { id }
        })
        if (!customer) {
            throw new Error("customer not found")
        }

        return this.extractUserData(customer)

    }

    extractUserData = (user: Customer) => {
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

export const customerService = new CustomerService()