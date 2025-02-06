import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Board from "./board.entity";
import BoardActivity from "./board-activity.entity";
import UserComment from "./user-comment.entity";

@Entity()
export default class Customer {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        nullable: false,
        select: false
    })
    password: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ default: 0 })
    role: number

    @OneToMany(() => Board, (board) => board.owner, { cascade: true })
    boards: Board[]

    @OneToMany(() => BoardActivity, action => action.customer, { cascade: true })
    activities: BoardActivity[]

    @OneToMany(() => UserComment, comment => comment.customer, { cascade: true })
    comments: UserComment[]
}