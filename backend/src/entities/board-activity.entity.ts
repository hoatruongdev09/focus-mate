import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import { Task } from "./task.entity";
import { Group } from "./column.entity";
import Board from "./board.entity";

@Entity({ name: "board_activity" })
export default class BoardActivity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    board_id: number

    @Column()
    user_id: number

    @Column({ nullable: true })
    task_id?: number | null

    @Column({ nullable: true })
    group_id?: number | null

    @Column()
    action: number

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => Board, board => board.activities)
    @JoinColumn({ name: "board_id" })
    board: Board

    @ManyToOne(() => User, user => user.activities)
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Task, task => task.activities)
    @JoinColumn({ name: "task_id" })
    task?: Task

    @ManyToOne(() => Group, group => group.activities)
    @JoinColumn({ name: "group_id" })
    group?: Group
}