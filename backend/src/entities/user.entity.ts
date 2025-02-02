import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Board from "./board.entity";
import BoardActivities from "./board-action.entity";
import UserComment from "./user-comment.entity";

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

    @OneToMany(() => Board, (board) => board.owner, { cascade: true })
    boards: Board[]

    @OneToMany(() => BoardActivities, action => action.user, { cascade: true })
    activities: BoardActivities[]

    @OneToMany(() => UserComment, comment => comment.user, { cascade: true })
    comments: UserComment[]
}