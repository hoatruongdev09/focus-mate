import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Card } from "./card.entity";
import Board from "./board.entity";
import BoardAction from "./board-activity.entity";
import UserComment from "./user-comment.entity";

@Entity()
export class List {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    board_id: number

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

    @OneToMany(() => Card, (card) => card.list, { cascade: true })
    cards: Card[]

    @ManyToOne(() => Board, (board) => board.lists)
    @JoinColumn({ name: "board_id" })
    board: Board

    @OneToMany(() => BoardAction, action => action.list, { cascade: true })
    activities: BoardAction[]

    @OneToMany(() => UserComment, comment => comment.list, { cascade: true })
    comments: UserComment[]
}