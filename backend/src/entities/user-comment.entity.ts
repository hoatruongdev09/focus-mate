import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "./customer.entity";
import Board from "./board.entity";
import { List } from "./list.entity";
import { Card } from "./card.entity";

@Entity({ name: "user_comment" })
export default class UserComment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customer_id: string

    @Column()
    board_id: string

    @Column()
    list_id: string

    @Column()
    card_id: string

    @Column({ type: "text" })
    content: string

    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => Customer, user => user.comments)
    @JoinColumn({ name: "customer_id" })
    customer: Customer

    @ManyToOne(() => Board, board => board.comments)
    @JoinColumn({ name: "board_id" })
    board: Board

    @ManyToOne(() => List, list => list.comments)
    @JoinColumn({ name: "list_id" })
    list: List

    @ManyToOne(() => Card, card => card.comments)
    @JoinColumn({ name: "card_id" })
    card: Card
}