import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Board from "./board.entity";
import BoardActivity from "./board-activity.entity";
import UserComment from "./user-comment.entity";
import WorkspaceMember from "./workspace-member.entity";
import Workspace from "./workspace.entity";
import { removeDashes } from "../utils/uuid-transformer";

@Entity()
export default class Customer {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        nullable: false
    })
    username: string

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @Column({ nullable: true })
    avatar_url: string

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

    @OneToMany(() => BoardActivity, action => action.actor, { cascade: true })
    activities: BoardActivity[]

    @OneToMany(() => UserComment, comment => comment.customer, { cascade: true })
    comments: UserComment[]

    @OneToMany(() => WorkspaceMember, member => member.user)
    workspaces: Workspace[]
}