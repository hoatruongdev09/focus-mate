import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Customer from "./customer.entity";
import { Card } from "./card.entity";
import { List } from "./list.entity";
import Board from "./board.entity";

@Entity({ name: "board_activity" })
export default class BoardActivity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    board_id: number

    @Column()
    owner_id: number

    @Column({ nullable: true })
    card_id?: number | null

    @Column({ nullable: true })
    list_id?: number | null

    @Column()
    action: number

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => Board, board => board.activities)
    @JoinColumn({ name: "board_id" })
    board: Board

    @ManyToOne(() => Customer, customer_id => customer_id.activities)
    @JoinColumn({ name: "owner_id" })
    actor: Customer

    @ManyToOne(() => Card, card => card.activities)
    @JoinColumn({ name: "card_id" })
    card?: Card

    @ManyToOne(() => List, list => list.activities)
    @JoinColumn({ name: "list_id" })
    list?: List
}