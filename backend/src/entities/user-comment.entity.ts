import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./user.entity";
import Board from "./board.entity";
import { Group } from "./column.entity";
import { Task } from "./task.entity";

@Entity({ name: "user_comment" })
export default class UserComment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    board_id: number

    @Column()
    group_id: number

    @Column()
    task_id: number

    @Column({ type: "text" })
    content: string

    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Board, board => board.comments)
    @JoinColumn({ name: "board_id" })
    board: Board

    @ManyToOne(() => Group, group => group.comments)
    @JoinColumn({ name: "group_id" })
    group: Group

    @ManyToOne(() => Task, task => task.comments)
    @JoinColumn({ name: "task_id" })
    task: Task
}