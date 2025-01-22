import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";
import Board from "./board.entity";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({
        nullable: false
    })
    rank: string

    @Column({ default: false })
    archived: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @OneToMany(() => Task, (task) => task.group, { cascade: true })
    tasks: Task[]

    @ManyToOne(() => Board, (board) => board.groups)
    @JoinColumn({ name: "board_id" })
    board: Board
}