import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    password: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ default: 0 })
    role: number
}